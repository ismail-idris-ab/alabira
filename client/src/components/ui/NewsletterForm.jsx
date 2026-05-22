import { useState } from "react";
import { useForm } from "react-hook-form";
import { newsletterApi } from "../../services/api";

export default function NewsletterForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | duplicate
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async ({ email }) => {
    setStatus("loading");
    try {
      await newsletterApi.subscribe(email);
      setStatus("success");
      reset();
    } catch (err) {
      const code = err.response?.status;
      setStatus(code === 409 ? "duplicate" : "error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-sans text-green-400 text-sm text-center">
        ✓ You're subscribed! Welcome to the Alabira community.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="font-sans text-brand-cream/70 text-sm mb-4 italic">
        Get seasonal recipes and farm updates in your inbox.
      </p>
      <div className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-sans text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all"
            disabled={status === "loading"}
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-brand-green text-white font-sans font-medium text-sm px-6 py-3 rounded-xl hover:bg-[#1F4D2C] transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-green whitespace-nowrap"
        >
          {status === "loading" ? "…" : "Join"}
        </button>
      </div>
      {errors.email && (
        <p className="font-sans text-red-400 text-xs mt-2">Enter a valid email.</p>
      )}
      {status === "duplicate" && (
        <p className="font-sans text-brand-gold text-xs mt-2">You're already subscribed!</p>
      )}
      {status === "error" && (
        <p className="font-sans text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
