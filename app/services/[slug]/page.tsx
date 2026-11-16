import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data/services";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, CalendarCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Metadata } from "next";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) {
    return { title: "Service Not Found | At Home Kenya" };
  }
  return {
    title: `${service.name} | At Home Kenya`,
    description: service.longDescription.substring(0, 160) + "...",
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const whatsappMessage = encodeURIComponent(
    `Hello At.home, I would like to inquire about your ${service.name} service.`
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#1c1130] via-[#23153d] to-[#3b0b3c] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-sans text-sm font-medium transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to all services
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-terracotta/20 border border-terracotta/30 backdrop-blur-sm">
              <Icon className="h-7 w-7 text-terracotta" />
            </div>
            {service.priceFrom && (
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm font-sans font-semibold tracking-wide backdrop-blur-sm">
                From {service.priceFrom}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            {service.name}
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl text-near-black mb-4">Service Overview</h2>
              <p className="font-sans text-muted leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
                {service.longDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <h2 className="font-display text-2xl text-near-black mb-6">Key Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-terracotta shrink-0" />
                    <span className="font-sans text-near-black leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="font-display text-2xl text-near-black mb-6">What to Expect</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sage-light before:to-transparent">
                {service.whatToExpect.map((step, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-ivory bg-sage text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <span className="font-sans font-bold text-sm">{index + 1}</span>
                    </div>
                    {/* Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-border shadow-sm">
                      <h3 className="font-sans font-bold text-near-black mb-1">{step.title}</h3>
                      <p className="font-sans text-muted text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-near-black mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-border">
                      <h4 className="font-sans font-bold text-near-black mb-2">{faq.question}</h4>
                      <p className="font-sans text-muted text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-card-white border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-xl text-near-black mb-4">Ready to arrange care?</h3>
              <p className="font-sans text-muted text-sm leading-relaxed mb-6">
                Our care coordinators are available to answer any questions and arrange an initial assessment.
              </p>
              
              <div className="space-y-3">
                <a
                  href={`https://wa.me/254705320618?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-semibold rounded-btn transition-colors shadow-sm tap-target"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Book via WhatsApp
                </a>
                
                <a
                  href="tel:+254705320618"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white border border-border hover:bg-sage-light hover:border-sage/30 text-near-black font-sans font-semibold rounded-btn transition-colors tap-target"
                >
                  <Phone className="h-5 w-5 text-muted" /> Call us directly
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-start gap-3">
                <CalendarCheck className="h-5 w-5 text-sage shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-muted leading-relaxed">
                  Care can usually be arranged within 24-48 hours depending on availability and location within Nairobi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
