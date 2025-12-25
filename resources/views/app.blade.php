<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  {{-- Open Graph / WhatsApp Meta Tags --}}
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:title" content="{{ $title ?? 'Undangan Digital - DatengAja' }}">
  <meta property="og:description"
    content="{{ $description ?? 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang untuk hadir dalam acara kami.' }}">
  <meta property="og:image" content="{{ $ogImage ?? asset('images/logo-datengaja.png') }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="DatengAja">

  {{-- Twitter Card --}}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $title ?? 'Undangan Digital - DatengAja' }}">
  <meta name="twitter:description"
    content="{{ $description ?? 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang untuk hadir dalam acara kami.' }}">
  <meta name="twitter:image" content="{{ $ogImage ?? asset('images/logo-datengaja.png') }}">

  {{-- Inline script to detect system dark mode preference and apply it immediately --}}
  <script>
    (function() {
      const appearance = '{{ $appearance ?? 'system' }}';

      if (appearance === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
          document.documentElement.classList.add('dark');
        }
      }
    })();
  </script>

  {{-- Inline style to set the HTML background color based on our theme in app.css --}}
  <style>
    html {
      background-color: oklch(1 0 0);
    }

    html.dark {
      background-color: oklch(0.145 0 0);
    }
  </style>

  <title inertia>{{ config('app.name', 'Dateng Aja') }}</title>

  <link rel="icon" href="/images/logo.png" sizes="any">
  <link rel="icon" href="/images/logo.png" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/images/logo.png">

  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

  @viteReactRefresh
  @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>
