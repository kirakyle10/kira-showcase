const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '992172594774';

export default function WhatsAppCTA() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-pulse-ring" />
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.44c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.17-.3.19-.56.07-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.52.11-.11.26-.3.39-.44.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.41-.8-1.93-.21-.51-.43-.44-.59-.44l-.5-.01c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.19 0 1.29.94 2.53 1.07 2.71.13.17 1.85 2.83 4.49 3.86.63.27 1.11.43 1.49.55.62.2 1.19.17 1.64.1.5-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3z"/>
        <path d="M26.72 5.3A13.36 13.36 0 0016 1.33C8.63 1.33 2.65 7.31 2.65 14.67c0 2.36.62 4.66 1.79 6.68L2.5 28.67l7.5-1.95a13.3 13.3 0 005.99 1.44h.01c7.36 0 13.34-5.98 13.34-13.34 0-3.56-1.39-6.91-3.9-9.52zM16 25.56h-.01a11.03 11.03 0 01-5.63-1.54l-.4-.24-4.45 1.17 1.19-4.34-.26-.42a11.01 11.01 0 01-1.69-5.86c0-6.12 4.97-11.1 11.1-11.1 2.96 0 5.74 1.15 7.84 3.25a11.03 11.03 0 013.25 7.85c0 6.12-4.98 11.1-11.11 11.1z"/>
      </svg>
    </a>
  );
}
