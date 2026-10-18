<?php
$services = require __DIR__ . '/_service-data.php';
if (!isset($serviceSlug, $services[$serviceSlug])) {
  http_response_code(404);
  exit('Service not found');
}
$service = $services[$serviceSlug];
$isSecurity = str_starts_with($service['id'], 'S');
$category = $isSecurity ? 'Security' : 'Logistics';
$query = http_build_query(['category' => $category, 'service' => $service['title']]);
$siblings = array_filter($services, fn($item) => str_starts_with($item['id'], $isSecurity ? 'S' : 'L'));
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES, 'UTF-8'); }
?><!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="<?= e($service['meta']) ?>">
  <meta name="theme-color" content="#090d0c">
  <title><?= e($service['title']) ?> | Barrush Multilinks</title>
  <link rel="icon" href="../../assets/img/favicons/favicon.ico">
  <link rel="stylesheet" href="../../assets/css/site.css">
  <link rel="stylesheet" href="../service-page.css">
  <script src="../../assets/js/site.js" defer></script>
</head>
<body class="service-page">
  <a class="skip" href="#main">Skip to content</a>
  <header class="header solid" data-header>
    <a class="brand" href="../../index.html"><img src="../../assets/img/barrush-logo.png" alt="Barrush"></a>
    <nav aria-label="Primary navigation"><a href="../../index.html">Home</a><a href="../../about.html">About</a><a class="active" href="../../logistics.html">Logistics</a><a href="../../contact.html">Contact</a></nav>
    <a class="quote" href="../../contact.html?intent=quote">Request a quote ↗</a>
    <button class="menu-btn" data-menu-btn aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>
  </header>
  <div class="mobile-menu" data-menu><nav><a href="../../index.html">Home</a><a href="../../about.html">About</a><a href="../../logistics.html">Logistics</a><a href="../../contact.html">Contact</a></nav><a class="button" href="../../contact.html?intent=quote">Request a quote ↗</a><a href="tel:+2347030572492">+234 703 057 2492</a></div>

  <main id="main">
    <section class="service-hero shell">
      <div class="service-hero-copy">
        <p class="eyebrow"><?= e($service['id']) ?> / <?= e($service['category']) ?></p>
        <h1><?= e($service['title']) ?><span>.</span></h1>
        <p><?= e($service['overview']) ?></p>
        <a class="button" href="../../contact.html?<?= e($query) ?>"><?= e($service['cta']) ?> ↗</a>
      </div>
      <div class="service-photo" role="img" aria-label="Placeholder for <?= e($service['photo']) ?> photography">
        <span>Photography placeholder</span><b><?= e($service['photo']) ?></b>
      </div>
    </section>

    <section class="service-offer section shell">
      <div class="service-section-head"><p class="eyebrow">What we offer</p><h2>Built around<br>the requirement.</h2></div>
      <ol class="offer-list">
        <?php foreach ($service['offers'] as $index => [$name, $description]): ?>
          <li><span><?= str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT) ?></span><div><h3><?= e($name) ?></h3><p><?= e($description) ?></p></div></li>
        <?php endforeach; ?>
      </ol>
    </section>

    <section class="service-why">
      <div class="shell"><p class="eyebrow">Why Barrush</p><h2>Clear planning.<br>Dependable coordination.</h2><p><?= e($service['why']) ?></p></div>
    </section>

    <section class="service-related section shell">
      <p class="eyebrow">Explore related capabilities</p>
      <div class="related-list">
        <?php foreach ($siblings as $slug => $item): if ($slug === $serviceSlug) continue; ?>
          <a href="../<?= e($slug) ?>/"><span><?= e($item['id']) ?></span><?= e($item['title']) ?><i>↗</i></a>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="service-cta section shell"><p class="eyebrow">Start a conversation</p><h2><?= e($service['cta']) ?>.</h2><div><p>Tell us what the operation requires. We’ll help shape the next step.</p><a class="button" href="../../contact.html?<?= e($query) ?>">Request a quote ↗</a></div></section>
  </main>

  <footer class="footer shell"><img src="../../assets/img/barrush-logo.png" alt="Barrush"><p>Dependable logistics and integrated security support for people, cargo and operations.</p><div><a href="../../about.html">About</a><a href="../../logistics.html">Logistics</a><a href="../../contact.html">Contact</a><a href="../../privacy.html">Privacy</a></div><address><a href="tel:+2347030572492">+234 703 057 2492</a><span>No. 12 Old Obasanjo Road,<br>Port Harcourt, Rivers State, Nigeria</span></address><small>© <span data-year></span> Barrush Multilinks. <b>Always Reliable.</b></small></footer>
</body>
</html>
