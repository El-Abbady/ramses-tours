"use client";

import Script from "next/script";

export default function GTranslateWidget() {
  return (
    <>
      <div className="gtranslate_wrapper" />
      <Script id="gtranslate-settings" strategy="afterInteractive">
        {`
          window.gtranslateSettings = {
            "default_language": "en",
            "languages": ["en", "es", "fr"],
            "wrapper_selector": ".gtranslate_wrapper",
            "switcher_horizontal_position": "left",
            "switcher_vertical_position": "bottom",
            "float_switcher_open_direction": "top"
          };
        `}
      </Script>
      <Script
        src="https://cdn.gtranslate.net/widgets/latest/float.js"
        strategy="afterInteractive"
      />
    </>
  );
}
