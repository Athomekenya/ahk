"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Briefcase,
  GraduationCap,
  Upload,
  CheckCircle2,
  ClipboardList,
  Heart,
  Shield,
} from "lucide-react";

// ── reCAPTCHA v3 ─────────────────────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

async function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve) => {
    if (!RECAPTCHA_SITE_KEY || typeof window === "undefined" || !window.grecaptcha) {
      resolve("");
      return;
    }
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
        resolve(token);
      } catch {
        resolve("");
      }
    });
  });
}


const perks = [
  {
    icon: Heart,
    title: "Meaningful Work",
    body: "Every shift makes a real difference in someone's life. You'll witness the direct impact of your care.",
  },
  {
    icon: Shield,
    title: "Verified & Supported",
    body: "We verify your credentials, back you with coordinators, and handle scheduling so you can focus on care.",
  },
  {
    icon: Briefcase,
    title: "Competitive Pay",
    body: "Fair, transparent compensation with M-Pesa disbursements and clear rate sheets from day one.",
  },
  {
    icon: ClipboardList,
    title: "Flexible Scheduling",
    body: "Choose assignments that fit your availability — full-time, part-time, or occasional cover shifts.",
  },
];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  residence: string;
  nationalId: string;
  position: string;
  education: string;
  licenseNumber: string;
  experience: string;
  currentEmployer: string;
  availability: string;
  cv: File | null;
  coverLetter: File | null;
  certificates: File | null;
  license: File | null;
  nationalIdCopy: File | null;
  otherDocs: File | null;
  whyAtHome: string;
  relevantExperience: string;
  willingToTravel: string;
  hasTransport: string;
  ref1Name: string;
  ref1Position: string;
  ref1Company: string;
  ref1Phone: string;
  ref2Name: string;
  ref2Position: string;
  ref2Company: string;
  ref2Phone: string;
  declaration: boolean;
}

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
  residence: "",
  nationalId: "",
  position: "",
  education: "",
  licenseNumber: "",
  experience: "",
  currentEmployer: "",
  availability: "",
  cv: null,
  coverLetter: null,
  certificates: null,
  license: null,
  nationalIdCopy: null,
  otherDocs: null,
  whyAtHome: "",
  relevantExperience: "",
  willingToTravel: "",
  hasTransport: "",
  ref1Name: "",
  ref1Position: "",
  ref1Company: "",
  ref1Phone: "",
  ref2Name: "",
  ref2Position: "",
  ref2Company: "",
  ref2Phone: "",
  declaration: false,
};

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sage-light shrink-0">
        <Icon className="h-4 w-4 text-sage" />
      </div>
      <h2 className="font-display text-near-black text-xl">{title}</h2>
    </div>
  );
}

function InputField({
  label,
  id,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  id: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-sans font-medium text-near-black">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-3 rounded-btn border border-border bg-card-white text-near-black font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition placeholder-muted/60"
      />
    </div>
  );
}

function SelectField({
  label,
  id,
  required = false,
  value,
  onChange,
  options,
}: {
  label: string;
  id: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-sans font-medium text-near-black">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-btn border border-border bg-card-white text-near-black font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition appearance-none"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  id,
  required = false,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}: {
  label: string;
  id: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-sans font-medium text-near-black">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="px-4 py-3 rounded-btn border border-border bg-card-white text-near-black font-sans text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition placeholder-muted/60 resize-none"
      />
    </div>
  );
}

function FileUploadField({
  label,
  id,
  required = false,
  onChange,
  currentFile,
}: {
  label: string;
  id: string;
  required?: boolean;
  onChange: (f: File | null) => void;
  currentFile: File | null;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-sans font-medium text-near-black">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      <label
        htmlFor={id}
        className="flex items-center gap-3 px-4 py-3 rounded-btn border border-dashed border-border bg-card-white hover:bg-sage-light/30 cursor-pointer transition group"
      >
        <Upload className="h-4 w-4 text-sage shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-sans text-muted truncate">
          {currentFile ? currentFile.name : "Click to upload file"}
        </span>
        <input
          id={id}
          type="file"
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          required={required && !currentFile}
        />
      </label>
    </div>
  );
}

function RadioGroup({
  label,
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-sans font-medium text-near-black">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      <div className="flex gap-6">
        {["Yes", "No"].map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              required={required && !value}
              className="accent-sage h-4 w-4"
            />
            <span className="text-sm font-sans text-near-black">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData) => (value: string | boolean | File | null) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.declaration) {
      setError("Please confirm the declaration before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // Fetch reCAPTCHA v3 token before building FormData
      const recaptchaToken = await getRecaptchaToken("careers_application");

      const body = new FormData();
      (Object.keys(form) as (keyof FormData)[]).forEach((key) => {
        const val = form[key];
        if (val instanceof File) {
          body.append(key, val);
        } else if (typeof val === "boolean") {
          body.append(key, val ? "true" : "false");
        } else if (val !== null) {
          body.append(key, val);
        }
      });

      // Append spam-prevention fields
      body.append("recaptchaToken", recaptchaToken);
      body.append("website", ""); // honeypot — always empty for real users

      const res = await fetch("/api/careers", { method: "POST", body });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again or email us directly at info@athomekenya.com.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly at info@athomekenya.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-sage pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #e07a5f 0%, transparent 60%), radial-gradient(circle at 20% 80%, #6b8c74 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-sage-light/70 mb-4">
            Join our team
          </span>
          <h1 className="font-display text-white mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Careers at AtHome Kenya
          </h1>
          <p className="text-sage-light/80 font-sans leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "var(--text-body)" }}>
            AtHome Kenya is committed to delivering quality home healthcare services across Kenya. We are
            always looking for compassionate, skilled, and dedicated professionals to join our growing team.
            If you&apos;re passionate about making a difference in people&apos;s lives, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-ivory py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card-white border border-border rounded-card p-6 flex flex-col gap-3"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-sage-light">
                  <Icon className="h-5 w-5 text-sage" />
                </div>
                <h3 className="font-display text-near-black" style={{ fontSize: "var(--text-h3)" }}>
                  {p.title}
                </h3>
                <p className="text-muted font-sans text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-ivory py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-3">
              Application Form
            </span>
            <h2 className="font-display text-near-black" style={{ fontSize: "var(--text-h1)" }}>
              Apply Now
            </h2>
            <p className="mt-3 text-muted font-sans text-sm">
              Fields marked with <span className="text-terracotta font-semibold">*</span> are required.
              Applications are sent securely to{" "}
              <a href="mailto:info@athomekenya.com" className="text-sage underline underline-offset-2">
                info@athomekenya.com
              </a>
              .
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card-white border border-border rounded-card p-10 text-center flex flex-col items-center gap-5"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sage-light">
                  <CheckCircle2 className="h-8 w-8 text-sage" />
                </div>
                <h3 className="font-display text-near-black text-2xl">Application Submitted!</h3>
                <p className="text-muted font-sans text-sm leading-relaxed max-w-md">
                  Thank you for your application! We appreciate your interest in joining AtHome Kenya. Our
                  recruitment team will review your application, and if your qualifications match our current
                  opportunities, we will contact you for the next steps.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm); }}
                  className="mt-2 px-6 py-2.5 border-2 border-sage text-sage hover:bg-sage hover:text-white font-sans font-semibold text-sm rounded-btn transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-card-white border border-border rounded-card p-6 sm:p-10 flex flex-col gap-10"
                noValidate
              >
                {/* Load reCAPTCHA v3 script */}
                {RECAPTCHA_SITE_KEY && (
                  <script
                    src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
                    async
                    defer
                  />
                )}

                {/* 1 — Personal Information */}
                <div>
                  <SectionTitle icon={User} title="1. Personal Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Full Name" id="fullName" required value={form.fullName} onChange={set("fullName")} placeholder="Jane Wanjiku" />
                    <InputField label="Phone Number" id="phone" required type="tel" value={form.phone} onChange={set("phone")} placeholder="+254 7XX XXX XXX" />
                    <InputField label="Email Address" id="email" required type="email" value={form.email} onChange={set("email")} placeholder="jane@email.com" />
                    <InputField label="Current Place of Residence" id="residence" required value={form.residence} onChange={set("residence")} placeholder="e.g. Westlands, Nairobi" />
                    <InputField label="National ID / Passport Number" id="nationalId" value={form.nationalId} onChange={set("nationalId")} placeholder="e.g. 12345678" />
                  </div>
                </div>

                {/* 2 — Position */}
                <div>
                  <SectionTitle icon={Briefcase} title="2. Position Applying For" />
                  <InputField
                    label="Position Applying For"
                    id="position"
                    required
                    value={form.position}
                    onChange={set("position")}
                    placeholder="e.g. Registered Nurse, Physiotherapist, Caregiver..."
                  />
                </div>

                {/* 3 — Professional Information */}
                <div>
                  <SectionTitle icon={GraduationCap} title="3. Professional Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectField
                      label="Highest Level of Education"
                      id="education"
                      required
                      value={form.education}
                      onChange={set("education")}
                      options={[
                        "Certificate",
                        "Diploma",
                        "Bachelor's Degree",
                        "Master's Degree",
                        "PhD / Doctorate",
                        "Other",
                      ]}
                    />
                    <InputField label="Professional Registration / License Number" id="licenseNumber" value={form.licenseNumber} onChange={set("licenseNumber")} placeholder="If applicable" />
                    <SelectField
                      label="Years of Experience"
                      id="experience"
                      required
                      value={form.experience}
                      onChange={set("experience")}
                      options={["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "11–15 years", "15+ years"]}
                    />
                    <InputField label="Current Employer" id="currentEmployer" value={form.currentEmployer} onChange={set("currentEmployer")} placeholder="Optional" />
                    <div className="sm:col-span-2">
                      <SelectField
                        label="Availability to Start"
                        id="availability"
                        required
                        value={form.availability}
                        onChange={set("availability")}
                        options={["Immediately", "Within 2 weeks", "Within 1 month", "Within 3 months", "Flexible"]}
                      />
                    </div>
                  </div>
                </div>

                {/* 4 — Documents */}
                <div>
                  <SectionTitle icon={Upload} title="4. Upload Documents" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FileUploadField label="CV / Resume" id="cv" required currentFile={form.cv} onChange={set("cv") as (f: File | null) => void} />
                    <FileUploadField label="Cover Letter" id="coverLetter" currentFile={form.coverLetter} onChange={set("coverLetter") as (f: File | null) => void} />
                    <FileUploadField label="Academic Certificates" id="certificates" currentFile={form.certificates} onChange={set("certificates") as (f: File | null) => void} />
                    <FileUploadField label="Professional License / Practicing Certificate" id="license" currentFile={form.license} onChange={set("license") as (f: File | null) => void} />
                    <FileUploadField label="National ID Copy" id="nationalIdCopy" currentFile={form.nationalIdCopy} onChange={set("nationalIdCopy") as (f: File | null) => void} />
                    <FileUploadField label="Other Supporting Documents" id="otherDocs" currentFile={form.otherDocs} onChange={set("otherDocs") as (f: File | null) => void} />
                  </div>
                </div>

                {/* 5 — Screening Questions */}
                <div>
                  <SectionTitle icon={ClipboardList} title="5. Screening Questions" />
                  <div className="flex flex-col gap-5">
                    <TextareaField
                      label="Why would you like to work at AtHome Kenya?"
                      id="whyAtHome"
                      value={form.whyAtHome}
                      onChange={set("whyAtHome")}
                      placeholder="Tell us what draws you to home-based care and to our team specifically..."
                      rows={4}
                    />
                    <TextareaField
                      label="Describe your most relevant experience"
                      id="relevantExperience"
                      value={form.relevantExperience}
                      onChange={set("relevantExperience")}
                      placeholder="Describe patient types, settings, or specialisations most relevant to this role..."
                      rows={4}
                    />
                    <RadioGroup
                      label="Are you willing to conduct home visits across Nairobi and surrounding areas?"
                      name="willingToTravel"
                      value={form.willingToTravel}
                      onChange={set("willingToTravel")}
                      required
                    />
                    <RadioGroup
                      label="Do you have reliable transport?"
                      name="hasTransport"
                      value={form.hasTransport}
                      onChange={set("hasTransport")}
                      required
                    />
                  </div>
                </div>

                {/* 6 — References */}
                <div>
                  <SectionTitle icon={Phone} title="6. References" />
                  <div className="flex flex-col gap-8">
                    {/* Ref 1 */}
                    <div>
                      <p className="text-xs font-sans font-semibold uppercase tracking-wider text-terracotta mb-4">Reference 1</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="Full Name" id="ref1Name" value={form.ref1Name} onChange={set("ref1Name")} />
                        <InputField label="Position / Title" id="ref1Position" value={form.ref1Position} onChange={set("ref1Position")} />
                        <InputField label="Company / Organisation" id="ref1Company" value={form.ref1Company} onChange={set("ref1Company")} />
                        <InputField label="Phone Number" id="ref1Phone" type="tel" value={form.ref1Phone} onChange={set("ref1Phone")} />
                      </div>
                    </div>
                    {/* Ref 2 */}
                    <div>
                      <p className="text-xs font-sans font-semibold uppercase tracking-wider text-terracotta mb-4">Reference 2</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="Full Name" id="ref2Name" value={form.ref2Name} onChange={set("ref2Name")} />
                        <InputField label="Position / Title" id="ref2Position" value={form.ref2Position} onChange={set("ref2Position")} />
                        <InputField label="Company / Organisation" id="ref2Company" value={form.ref2Company} onChange={set("ref2Company")} />
                        <InputField label="Phone Number" id="ref2Phone" type="tel" value={form.ref2Phone} onChange={set("ref2Phone")} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7 — Declaration */}
                <div className="bg-sage-light/50 rounded-card p-5 border border-border">
                  <SectionTitle icon={Shield} title="7. Declaration" />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="declaration"
                      checked={form.declaration}
                      onChange={(e) => set("declaration")(e.target.checked)}
                      className="accent-sage h-4 w-4 mt-0.5 shrink-0"
                      required
                    />
                    <span className="text-sm font-sans text-near-black leading-relaxed">
                      I certify that the information provided in this application is true, accurate, and complete to the best of my knowledge.
                      I understand that any misrepresentation may result in disqualification or termination of employment.
                    </span>
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-terracotta font-sans bg-terracotta/10 px-4 py-3 rounded-btn border border-terracotta/20">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-sage hover:bg-sage/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-semibold text-base rounded-btn transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
