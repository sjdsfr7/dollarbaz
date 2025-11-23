'use client';

import { useEffect, useRef } from 'react';

interface TurnstileProps {
  onVerify: (token: string) => void;
}

export default function TurnstileWidget({ onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the Turnstile script is loaded
    const scriptId = 'cloudflare-turnstile-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      document.head.appendChild(script);
    }

    const renderWidget = () => {
      if (window.turnstile && containerRef.current) {
        window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!,
          callback: (token: string) => onVerify(token),
          theme: 'auto', // Adapts to your Dark/Light mode automatically
          appearance: 'interaction-only', // Less intrusive
        });
      } else {
        setTimeout(renderWidget, 100);
      }
    };

    renderWidget();
  }, [onVerify]);

  return <div ref={containerRef} className="my-4 flex justify-center" />;
}
