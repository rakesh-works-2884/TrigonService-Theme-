import { siteConfig } from "@/data/site";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hi Trigon Services, I'd like to know more about your compliance services.");
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.688 4.523 1.875 6.36L4 29l7.86-1.828A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75c-1.937 0-3.744-.552-5.278-1.508l-.379-.232-4.664 1.086 1.11-4.542-.247-.392A9.71 9.71 0 0 1 5.25 15c0-5.937 4.813-10.75 10.751-10.75S26.751 9.063 26.751 15 21.938 24.75 16.001 24.75Zm5.906-8.09c-.324-.163-1.914-.944-2.211-1.052-.297-.109-.514-.163-.73.163-.216.325-.838 1.052-1.028 1.268-.19.216-.379.244-.703.081-.324-.163-1.368-.504-2.606-1.607-.963-.859-1.614-1.921-1.803-2.246-.19-.325-.02-.5.143-.663.146-.146.324-.379.487-.569.163-.19.216-.325.324-.542.108-.216.054-.406-.027-.569-.081-.163-.73-1.758-1-2.408-.263-.632-.53-.547-.73-.557l-.622-.011c-.216 0-.569.081-.867.406-.297.325-1.135 1.108-1.135 2.702s1.162 3.134 1.324 3.35c.163.216 2.288 3.492 5.542 4.897.774.334 1.377.534 1.847.683.776.247 1.482.212 2.041.129.623-.093 1.914-.782 2.184-1.537.27-.756.27-1.403.19-1.538-.081-.135-.298-.216-.622-.379Z" />
      </svg>
    </a>
  );
}
