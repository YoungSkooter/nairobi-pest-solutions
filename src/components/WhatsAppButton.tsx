import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const whatsappNumber = "254700000000"; // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "Hello Killpezts! I'd like to inquire about your pest control services."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 animate-pulse group-hover:animate-none" />
    </a>
  );
};
