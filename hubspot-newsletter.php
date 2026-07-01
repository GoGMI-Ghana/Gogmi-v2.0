<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Same token as hubspot-blog.php — paste it directly here on the server
define('HUBSPOT_TOKEN', getenv('HUBSPOT_TOKEN') ?: '');
define('HUBSPOT_API', 'https://api.hubapi.com');

$action = $_GET['action'] ?? 'list';

try {

    // ── LIST ─────────────────────────────────────────────────────────────
    if ($action === 'list') {
        $limit  = min((int)($_GET['limit'] ?? 12), 50);
        $offset = (int)($_GET['offset'] ?? 0);

        $url  = HUBSPOT_API . "/marketing/v3/emails?limit={$limit}&offset={$offset}&state=PUBLISHED";
        $data = hubspotRequest($url);

        $newsletters = [];
        foreach ($data['results'] ?? [] as $email) {
            $newsletters[] = formatNewsletter($email);
        }
        $total = $data['total'] ?? count($newsletters);

        echo json_encode(['success' => true, 'data' => [
            'newsletters' => $newsletters,
            'total'       => $total,
            'offset'      => $offset,
            'limit'       => $limit,
            'hasMore'     => $total > ($offset + $limit),
        ]]);

    // ── SINGLE ───────────────────────────────────────────────────────────
    } elseif ($action === 'single') {
        $id = $_GET['id'] ?? '';
        if (!$id) throw new Exception('ID is required');

        $email   = hubspotRequest(HUBSPOT_API . "/marketing/v3/emails/{$id}");
        $content = $email['content'] ?? [];
        $widgets = $content['widgets'] ?? [];
        $flexAreas = $content['flexAreas']['main']['sections'] ?? [];
        $styleSettings = $content['styleSettings'] ?? [];

        $html = '';

        if (!empty($flexAreas) && !empty($widgets)) {
            // Walk sections in order → columns → widget IDs → render each widget
            foreach ($flexAreas as $section) {
                $bgColor = $section['style']['backgroundColor'] ?? '';
                $sectionHtml = '';

                foreach ($section['columns'] ?? [] as $column) {
                    foreach ($column['widgets'] ?? [] as $widgetId) {
                        $widget = $widgets[$widgetId] ?? null;
                        if (!$widget) continue;

                        $body = $widget['body'] ?? [];
                        $path = $body['path'] ?? '';

                        // Rich text / HTML module
                        if (str_contains($path, 'rich_text') || isset($body['html'])) {
                            $innerHtml = $body['html'] ?? '';
                            if ($innerHtml) {
                                $padding = $body['hs_wrapper_css'] ?? [];
                                $pt = $padding['padding-top'] ?? '10px';
                                $pb = $padding['padding-bottom'] ?? '10px';
                                $pl = $padding['padding-left'] ?? '20px';
                                $pr = $padding['padding-right'] ?? '20px';
                                $sectionHtml .= "<div style=\"padding:{$pt} {$pr} {$pb} {$pl};\">{$innerHtml}</div>";
                            }
                        }

                        // Image module
                        if (str_contains($path, 'image_email') || isset($body['img'])) {
                            $img = $body['img'] ?? [];
                            $src = $img['src'] ?? '';
                            $alt = $img['alt'] ?? '';
                            if ($src) {
                                $align = $body['style']['alignment'] ?? 'center';
                                $sectionHtml .= "<div style=\"text-align:{$align};padding:10px 20px;\"><img src=\"".htmlspecialchars($src)."\" alt=\"".htmlspecialchars($alt)."\" style=\"max-width:100%;height:auto;\"></div>";
                            }
                        }

                        // Button module
                        if (str_contains($path, 'button') || isset($body['button'])) {
                            $btn = $body['button'] ?? [];
                            $btnUrl  = $btn['url']['href'] ?? ($body['link_url'] ?? '#');
                            $btnText = $btn['text'] ?? ($body['button_text'] ?? 'Learn More');
                            $btnColor = $styleSettings['buttonStyleSettings']['backgroundColor'] ?? '#c13a3a';
                            $btnFontColor = $styleSettings['buttonStyleSettings']['fontStyle']['color'] ?? '#ffffff';
                            $sectionHtml .= "<div style=\"text-align:center;padding:15px 20px;\"><a href=\"".htmlspecialchars($btnUrl)."\" target=\"_blank\" style=\"display:inline-block;background-color:{$btnColor};color:{$btnFontColor};padding:12px 28px;text-decoration:none;font-weight:bold;border-radius:4px;\">{$btnText}</a></div>";
                        }

                        // Divider module
                        if (str_contains($path, 'divider')) {
                            $divColor = $styleSettings['dividerStyleSettings']['color']['color'] ?? '#dddddd';
                            $sectionHtml .= "<div style=\"padding:5px 20px;\"><hr style=\"border:none;border-top:1px solid {$divColor};margin:0;\"></div>";
                        }
                    }
                }

                if ($sectionHtml) {
                    $bgStyle = $bgColor ? "background-color:{$bgColor};" : '';
                    $html .= "<div style=\"{$bgStyle}\">{$sectionHtml}</div>";
                }
            }
        }

        // Fallback: try fetching the public web version
        if (!$html && !empty($email['absoluteUrl'])) {
            $ch = curl_init($email['absoluteUrl']);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_MAXREDIRS      => 5,
                CURLOPT_TIMEOUT        => 20,
                CURLOPT_USERAGENT      => 'Mozilla/5.0 GoGMI-Website/1.0',
            ]);
            $fetched = curl_exec($ch);
            $code    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($code === 200 && $fetched) {
                if (preg_match('/<body[^>]*>(.*?)<\/body>/si', $fetched, $m)) {
                    $html = $m[1];
                } else {
                    $html = $fetched;
                }
            }
        }

        echo json_encode(['success' => true, 'data' => array_merge(
            formatNewsletter($email),
            ['html' => $html, 'absoluteUrl' => $email['absoluteUrl'] ?? null]
        )]);

    // ── DEBUG (remove in production) ─────────────────────────────────────
    } elseif ($action === 'debug') {
        $id = $_GET['id'] ?? '';
        if (!$id) throw new Exception('ID is required');
        $email = hubspotRequest(HUBSPOT_API . "/marketing/v3/emails/{$id}");
        echo json_encode(['success' => true, 'data' => $email]);

    } else {
        throw new Exception('Unknown action: ' . $action);
    }

} catch (Exception $e) {
    error_log('HubSpot Newsletter API Error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

function formatNewsletter(array $email): array {
    return [
        'id'          => $email['id'],
        'subject'     => $email['subject'] ?? ($email['name'] ?? 'Newsletter'),
        'name'        => $email['name'] ?? '',
        'previewText' => $email['previewText'] ?? '',
        'publishDate' => $email['publishDate'] ?? ($email['updatedAt'] ?? ''),
        'thumbnail'   => $email['thumbnail'] ?? null,
        'absoluteUrl' => $email['absoluteUrl'] ?? null,
    ];
}

function hubspotRequest(string $url): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . HUBSPOT_TOKEN,
            'Content-Type: application/json',
        ],
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr) throw new Exception('Connection error: ' . $curlErr);
    if ($httpCode >= 400) {
        $errorData = json_decode($response, true);
        throw new Exception($errorData['message'] ?? "HubSpot API error (HTTP $httpCode)");
    }
    return json_decode($response, true) ?? [];
}
