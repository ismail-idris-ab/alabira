import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { contactApi } from "../../services/api";

const CONTACT_EMAIL = "hello@alabiraglobalfarm.com";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data._hp) return; // honeypot
    setStatus("loading");
    try {
      await contactApi.submit({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-white text-brand-brown font-sans text-base px-4 py-4 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all placeholder:text-brand-clay/60";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        {...register("_hp")}
        style={{ display: "none" }}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Name */}
      <div className="mb-5">
        <label htmlFor="name" className="font-sans text-sm font-medium text-brand-cream/80 block mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className={inputBase}
          disabled={status === "loading"}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="font-sans text-red-400 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="font-sans text-sm font-medium text-brand-cream/80 block mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          className={inputBase}
          disabled={status === "loading"}
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />
        {errors.email && (
          <p className="font-sans text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-8">
        <label htmlFor="message" className="font-sans text-sm font-medium text-brand-cream/80 block mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="How can we help you?"
          className={`${inputBase} resize-none`}
          disabled={status === "loading"}
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Please write at least 10 characters" },
          })}
        />
        {errors.message && (
          <p className="font-sans text-red-400 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-gold text-white font-sans font-semibold text-base py-4 rounded-xl hover:brightness-110 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
      >
        {status === "loading" && <Loader2 size={18} className="animate-spin" />}
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {/* Status feedback */}
      {status === "success" && (
        <p className="mt-4 font-sans text-sm text-green-400 text-center">
          ✓ Message sent! We'll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 font-sans text-sm text-red-400 text-center">
          Something went wrong. Email us directly:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}
    </form>
  );
}
