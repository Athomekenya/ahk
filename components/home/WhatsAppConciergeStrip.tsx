import React from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppConciergStrip() {
  const message = encodeURIComponent(
    "Hello At Home Kenya, I'm not sure which service I need. Could you help me understand my options?"
  );

  return (
    <section
      className="bg-terracotta py-16 px-4 sm:px-6 lg:px-8"
      aria-labelledby="whatsapp-strip-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <WhatsAppIcon className="h-12 w-12 text-white/60 mx-auto mb-6" />
        <h2
          id="whatsapp-strip-heading"
          className="font-display text-white mb-4"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Not sure where to start?
        </h2>
        <p className="text-white/80 font-sans mb-8 max-w-xl mx-auto" style={{ fontSize: "var(--text-body)" }}>
          Our care coordinators are available Monday to Saturday, 8am–8pm EAT.
          Send us a message and we&apos;ll help you figure out exactly what your loved one needs.
        </p>
        {/* Real wa.me link — reachable without JavaScript */}
        <a
          href={`https://wa.me/254705320618?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-terracotta hover:bg-ivory font-sans font-bold rounded-btn transition-colors shadow-md text-base tap-target"
        >
          <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
          Chat with a care coordinator
        </a>
      </div>
    </section>
  );
}
