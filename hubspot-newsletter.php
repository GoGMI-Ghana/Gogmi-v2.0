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

        $email         = hubspotRequest(HUBSPOT_API . "/marketing/v3/emails/{$id}");
        $content       = $email['content'] ?? [];
        $widgets       = $content['widgets'] ?? [];
        $sections      = $content['flexAreas']['main']['sections'] ?? [];
        $styleSettings = $content['styleSettings'] ?? [];
        $primaryFont   = $styleSettings['primaryFont'] ?? 'Arial,sans-serif';
        $primaryColor  = $styleSettings['primaryFontColor'] ?? '#333333';
        $primarySize   = $styleSettings['primaryFontSize'] ?? 16;

        $html = '';

        foreach ($sections as $section) {
            $bgColor     = $section['style']['backgroundColor'] ?? '';
            $sectionHtml = '';

            foreach ($section['columns'] ?? [] as $column) {
                foreach ($column['widgets'] ?? [] as $widgetId) {
                    $widget = $widgets[$widgetId] ?? null;
                    if (!$widget) continue;

                    $body = $widget['body'] ?? [];
                    $path = $body['path'] ?? '';

                    // Skip footer/unsubscribe modules — not needed on the website
                    if (strpos($path, 'email_footer') !== false || strpos($path, 'unsubscribe') !== false) {
                        continue;
                    }

                    $padding = $body['hs_wrapper_css'] ?? [];
                    $pt = is_array($padding) ? ($padding['padding-top']    ?? '10px') : '10px';
                    $pb = is_array($padding) ? ($padding['padding-bottom'] ?? '10px') : '10px';
                    $pl = is_array($padding) ? ($padding['padding-left']   ?? '20px') : '20px';
                    $pr = is_array($padding) ? ($padding['padding-right']  ?? '20px') : '20px';
                    $padStyle = "padding:{$pt} {$pr} {$pb} {$pl};";

                    // ── Rich text / HTML module
                    if (strpos($path, 'rich_text') !== false || isset($body['html'])) {
                        $innerHtml = $body['html'] ?? '';
                        if ($innerHtml) {
                            $sectionHtml .= "<div style=\"{$padStyle}font-family:{$primaryFont};color:{$primaryColor};font-size:{$primarySize}px;line-height:1.6;\">{$innerHtml}</div>";
                        }
                    }

                    // ── Image module
                    elseif (strpos($path, 'image_email') !== false || isset($body['img'])) {
                        $img   = $body['img'] ?? [];
                        $src   = $img['src'] ?? '';
                        $alt   = htmlspecialchars($img['alt'] ?? '');
                        $align = $body['style']['alignment'] ?? 'center';
                        if ($src) {
                            $sectionHtml .= "<div style=\"{$padStyle}text-align:{$align};\"><img src=\"" . htmlspecialchars($src) . "\" alt=\"{$alt}\" style=\"max-width:100%;height:auto;display:inline-block;\"></div>";
                        }
                    }

                    // ── Button module
                    elseif (strpos($path, 'button_email') !== false || isset($body['destination'])) {
                        $btnUrl   = htmlspecialchars($body['destination'] ?? '#');
                        $btnText  = htmlspecialchars($body['text'] ?? 'Learn More');
                        $btnBg    = $body['background_color'] ?? ($styleSettings['buttonStyleSettings']['backgroundColor'] ?? '#073763');
                        $btnFg    = $body['font_color'] ?? ($styleSettings['buttonStyleSettings']['fontStyle']['color'] ?? '#ffffff');
                        $btnSize  = $body['font_size'] ?? 16;
                        $iPadV    = $body['inner_vertical_padding'] ?? 12;
                        $iPadH    = $body['inner_horizontal_padding'] ?? 24;
                        $sectionHtml .= "<div style=\"{$padStyle}text-align:center;\"><a href=\"{$btnUrl}\" target=\"_blank\" style=\"display:inline-block;background-color:{$btnBg};color:{$btnFg};font-size:{$btnSize}px;font-family:{$primaryFont};padding:{$iPadV}px {$iPadH}px;text-decoration:none;font-weight:bold;border-radius:4px;\">{$btnText}</a></div>";
                    }

                    // ── Divider module
                    elseif (strpos($path, 'email_divider') !== false || strpos($path, 'divider') !== false) {
                        $divColor = $body['color']['color'] ?? ($styleSettings['dividerStyleSettings']['color']['color'] ?? '#dddddd');
                        $sectionHtml .= "<div style=\"{$padStyle}\"><hr style=\"border:none;border-top:1px solid {$divColor};margin:0;\"></div>";
                    }
                }
            }

            if ($sectionHtml) {
                $bgStyle = $bgColor ? "background-color:{$bgColor};" : '';
                $html .= "<div style=\"{$bgStyle}\">{$sectionHtml}</div>";
            }
        }

        echo json_encode(['success' => true, 'data' => array_merge(
            formatNewsletter($email),
            ['html' => $html ?: null, 'absoluteUrl' => $email['absoluteUrl'] ?? null]
        )]);

    // ── DEBUG ─────────────────────────────────────────────────────────────
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
