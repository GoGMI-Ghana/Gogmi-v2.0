<?php
// Membership promo code settings, read by promo.php.
//
// starts_at / expires_at are UTC, format 'YYYY-MM-DD HH:MM:SS'.
// Leave starts_at as null to start the offer the moment this file is uploaded
// to the server; it then runs for duration_hours from that upload.
// Re-uploading this file restarts the clock unless starts_at is set.
// Set expires_at to override duration_hours with a fixed end time.
return [
    'code'             => 'GOGMI50-MZRK7',
    'discount_percent' => 50,
    'duration_hours'   => 72,
    'starts_at'        => '2026-10-12 13:13:16',
    'expires_at'       => null,
    // Plans the code applies to.
    'plans'            => ['student', 'associate', 'professional', 'institution', 'corporate'],
];
