"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "trigon-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-600 sm:text-left">
          We use cookies to improve your experience on our site. By continuing, you agree to our{" "}
          <a href="/privacy-policy" className="font-medium text-primary underline">
            Privacy Policy
          </a>
          .
        </p>
        <button onClick={accept} className="btn-brand shrink-0">
          Accept
        </button>
      </div>
    </div>
  );
}
