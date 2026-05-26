import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { contactApi } from "../../services/api";

const CONTACT_EMAIL = "itsauwalalabira@gmail.com";

const ENQUIRY_TYPES = [
  "Distributor / Wholesaler",
  "Retailer / Supermarket",
  "Restaurant / Food Service",
  "Export Partner",
  "Investor",
  "Media / Press",
  "General Enquiry",
];

/* Reusable underline field wrapper with animated focus line */
function Field({ label, htmlFor, error, children }) {
  return (
    <div className="relative group/f mb-9">
      <label
        htmlFor={htmlFor}
        className="block font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-brand-clay mb-2.5 transition-colors duration-200 group-focus-within/f:text-brand-forest"
      >
        {label}
      </label>
      <div className="relative border-b border-brand-ink/18 group-focus-within/f:border-transparent transition-colors duration-300">
        {children}
        {/* Animated green underline */}
        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-brand-forest transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within/f:w-full" />
      </div>
      {error && (
        <p className="font-sans text-red-500 text-[11px] mt-1.5">{error}</p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-transparent font-sans text-[15.5px] font-light text-brand-ink placeholder:text-brand-ink/25 py-2.5 pb-3 outline-none appearance-none";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.website) return;
    setStatus("loading");
    try {
      await contactApi.submit({
        name: data.name,
        email: data.email,
        message: `[${data.enquiry || "General Enquiry"}] ${data.message}`,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 py-10 text-brand-forest">
        <CheckCircle2 size={22} strokeWidth={1.5} />
        <p className="font-sans text-[15px] font-light">
          Message sent. We'll respond within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot */}
      <input type="text" {...register("website")} className="hidden" tabIndex={-1} aria-hidden="true" />

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        <Field label="Full Name" htmlFor="c-name" error={errors.name?.message}>
          <input
            id="c-name"
            type="text"
            placeholder="e.g. Amina Okafor"
            className={inputClass}
            disabled={status === "loading"}
            {...register("name", { required: "Name is required" })}
          />
        </Field>

        <Field label="Email Address" htmlFor="c-email" error={errors.email?.message}>
          <input
            id="c-email"
            type="email"
            placeholder="you@company.com"
            className={inputClass}
            disabled={status === "loading"}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
        </Field>
      </div>

      {/* Enquiry type */}
      <Field label="I am a…" htmlFor="c-enquiry">
        <select
          id="c-enquiry"
          className={`${inputClass} cursor-pointer`}
          disabled={status === "loading"}
          {...register("enquiry")}
        >
          <option value="" disabled>Select your enquiry type</option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>

      {/* Message */}
      <Field label="Your Message" htmlFor="c-message" error={errors.message?.message}>
        <textarea
          id="c-message"
          rows={5}
          placeholder="Tell us what you have in mind…"
          className={`${inputClass} resize-none leading-[1.65]`}
          disabled={status === "loading"}
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "At least 10 characters" },
          })}
        />
        <span className="block font-sans text-[11px] text-brand-clay/65 mt-1.5">
          We typically respond within 1–2 business days.
        </span>
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2.5 font-sans font-medium text-[14px] tracking-[0.05em] bg-brand-forest text-white px-9 py-4 rounded-[3px] shadow-[0_4px_18px_rgba(46,107,62,0.14)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-brand-green hover:shadow-[0_8px_28px_rgba(46,107,62,0.22)] focus:outline-none focus:ring-2 focus:ring-brand-green disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 size={15} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={14} /> Send Message</>
        )}
      </button>

      {status === "error" && (
        <p className="font-sans text-sm text-red-500 mt-4">
          Something went wrong. Email us directly:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-brand-forest">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}
    </form>
  );
}
