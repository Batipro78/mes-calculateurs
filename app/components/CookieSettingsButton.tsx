"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("open-cookie-banner"));
        }
      }}
      className="hover:text-slate-600 transition-colors text-left cursor-pointer"
    >
      Gerer les cookies
    </button>
  );
}
