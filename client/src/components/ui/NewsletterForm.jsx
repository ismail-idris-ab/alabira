import { useState } from "react";
import { useForm } from "react-hook-form";
import { newsletterApi } from "../../services/api";

export default function NewsletterForm() {
  const [status, setStatus] = useState("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async ({ email }) => {
    setStatus("loading");
    try {
      await newsletterApi.subscribe(email);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus(err.response?.status === 409 ? "duplicate" : "error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-sans text-brand-sage text-sm" style={{ lineHeight: 1.6 }}>
        ✓ You're subscribed. Welcome to the Alabira community.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="font-sans text-white/45 text-sm italic mb-5" style={{ lineHeight: 1.65 }}>
        Seasonal recipes and farm updates in your inbox.
      </p>
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            className="w-full font-sans text-white placeholder:text-white/30 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-brand-sage"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: "14px",
              padding: "10px 14px",
              borderRadius: "2px",
            }}
            disabled={status === "loading"}
            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-sans font-medium text-white transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-brand-sage whitespace-nowrap hover:bg-brand-forest"
          style={{
            backgroundColor: "#1B3A2D",
            border: "1px solid rgba(127,176,138,0.3)",
            fontSize: "13px",
            padding: "10px 20px",
            borderRadius: "2px",
            letterSpacing: "0.02em",
          }}
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {errors.email && (
        <p className="font-sans text-red-400 text-xs mt-2">Enter a valid email.</p>
      )}
      {status === "duplicate" && (
        <p className="font-sans text-brand-gold text-xs mt-2">You're already subscribed.</p>
      )}
      {status === "error" && (
        <p className="font-sans text-red-400 text-xs mt-2">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
