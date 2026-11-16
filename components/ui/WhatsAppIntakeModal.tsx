"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface WhatsAppIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialItemName?: string;
}

const servicesList = [
  "Home Physiotherapy",
  "Chronic Disease Management",
  "Palliative Care",
  "Wound & Post-Surgical Care",
  "Newborn & Postnatal Care",
  "Telemedicine Consultation",
  "Nutrition Consultation",
  "Shop Equipment Purchase",
  "Medical Equipment Lease",
  "General Caregiving Inquiry",
];

export default function WhatsAppIntakeModal({
  isOpen,
  onClose,
  initialService = "Home Physiotherapy",
  initialItemName,
}: WhatsAppIntakeModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialItemName ? `Item: ${initialItemName}` : initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9:00 AM - 12:00 PM)");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleLaunchWhatsApp = () => {
    let text = `*NEW INQUIRY - AT.HOME KENYA*\n\n`;
    text += `*Service/Interest:* ${selectedService}\n`;
    if (name) text += `*Full Name:* ${name}\n`;
    if (phone) text += `*Phone:* ${phone}\n`;
    if (location) text += `*Location:* ${location}\n`;
    if (preferredDate) text += `*Preferred Date:* ${preferredDate}\n`;
    if (preferredTime) text += `*Preferred Time:* ${preferredTime}\n`;
    if (notes) text += `*Additional Details:* ${notes}\n`;
    text += `\nPlease assist me with booking/next steps. Thank you!`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/254705320618?text=${encoded}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card-white border border-border rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden z-10 font-sans"
        >
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-[#1c1130] via-[#23153d] to-[#3b0b3c] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#25D366]/20 rounded-full text-[#25D366]">
                <WhatsAppIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Quick WhatsApp Intake
                </h3>
                <p className="text-xs text-white/70">
                  Fast 1-minute booking — matched within 12–24 hours
                </p>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
              <span className={`px-2.5 py-1 rounded-full ${step === 1 ? "bg-terracotta text-white font-semibold" : "bg-white/10 text-white/60"}`}>
                1. Service
              </span>
              <span className={`px-2.5 py-1 rounded-full ${step === 2 ? "bg-terracotta text-white font-semibold" : "bg-white/10 text-white/60"}`}>
                2. Details
              </span>
              <span className={`px-2.5 py-1 rounded-full ${step === 3 ? "bg-terracotta text-white font-semibold" : "bg-white/10 text-white/60"}`}>
                3. Date &amp; Time
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-near-black">
                  Select the service or item you need:
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
                  {servicesList.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left text-sm transition-all ${
                        selectedService === srv
                          ? "border-terracotta bg-terracotta/5 font-semibold text-terracotta shadow-sm"
                          : "border-border hover:bg-sage-light/30 text-near-black"
                      }`}
                    >
                      <span>{srv}</span>
                      {selectedService === srv && <CheckCircle2 className="h-4 w-4 text-terracotta shrink-0" />}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta hover:bg-[#b014b1] text-white font-semibold text-sm rounded-btn transition-colors shadow-sm"
                  >
                    Next: Patient Details <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-terracotta" /> Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mary Wanjiku"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-terracotta" /> Phone Number (WhatsApp preferred)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-terracotta" /> Location / City (Distributed across Kenya)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Westlands Nairobi, Mombasa, Kisumu, Nakuru..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-terracotta" /> Brief Patient Notes or Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Post-stroke physiotherapy session at home, elderly parent support..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold text-muted hover:text-near-black"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta hover:bg-[#b014b1] text-white font-semibold text-sm rounded-btn transition-colors shadow-sm"
                  >
                    Next: Schedule <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-terracotta" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-terracotta" /> Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-btn border border-border bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-sage"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    <option value="Urgent / Flexible">Urgent / Flexible</option>
                  </select>
                </div>

                <div className="p-4 bg-sage-light/40 rounded-xl border border-sage/20 text-xs text-muted leading-relaxed">
                  <span className="font-bold text-near-black">Next step:</span> Clicking submit will open your WhatsApp with a pre-filled structured inquiry. Our Care Coordinator will reply within 12–24 hours.
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-sm font-semibold text-muted hover:text-near-black"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-btn transition-colors shadow-md"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> Launch WhatsApp Intake
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
