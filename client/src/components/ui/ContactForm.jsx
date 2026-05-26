import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { contactApi } from "../../services/api";

const CONTACT_EMAIL = "itsauwalalabira@gmail.com";
const WHATSAPP_NUMBER = "2348032665647";

function IconWhatsApp({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
    trigger,
    getValues,
    formState: { errors },
  } = useForm();

  const handleWhatsApp = async () => {
    const valid = await trigger(["name", "email", "message"]);
    if (!valid) return;
    const { name, email, enquiry, message } = getValues();
    const text = [
      `Hello Alabira Global Farm! 👋`,
      ``,
      `*New Enquiry via Website*`,
      ``,
      `*Name:* ${name}`,
      `*Email:* ${email}`,
      enquiry ? `*Enquiry Type:* ${enquiry}` : null,
      ``,
      `*Message:*`,
      message,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

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

      {/* Submit row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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

        <span className="hidden sm:block font-sans text-[11px] text-brand-ink/25 select-none">or</span>

        <button
          type="button"
          disabled={status === "loading"}
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2.5 font-sans font-medium text-[14px] tracking-[0.05em] bg-whatsapp text-white px-7 py-4 rounded-[3px] shadow-[0_4px_18px_rgba(37,211,102,0.18)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_8px_28px_rgba(37,211,102,0.28)] focus:outline-none focus:ring-2 focus:ring-whatsapp disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconWhatsApp size={15} />
          Send via WhatsApp
        </button>
      </div>

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
