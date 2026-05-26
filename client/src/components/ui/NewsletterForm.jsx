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

  return (
    <>
      <p className="font-display text-[17px] font-semibold text-brand-forest mb-1.5">
        Join Our Farm Community
      </p>
      <p className="font-sans text-[13px] font-light text-brand-clay leading-[1.6] mb-4">
        Seasonal updates, harvest reports, and recipes — straight from the field.
      </p>

      {status === "success" ? (
        <p className="font-sans text-brand-forest text-sm leading-[1.6]">
          ✓ You're subscribed. Welcome to the Alabira community.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex">
            <div className="flex-1">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input
                id="nl-email"
                type="email"
                placeholder="Your email address"
                className="w-full bg-white border border-brand-ink/18 border-r-0 font-sans text-[13px] font-light text-brand-ink placeholder:text-brand-ink/30 py-[11px] px-3.5 rounded-l-[3px] outline-none transition-colors duration-200 focus:border-brand-forest/40"
                disabled={status === "loading"}
                {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-sans font-medium text-[12.5px] tracking-[0.06em] text-white bg-brand-gold border border-brand-gold px-4 py-[11px] rounded-r-[3px] whitespace-nowrap transition-colors duration-200 hover:bg-brand-forest hover:border-brand-forest disabled:opacity-50"
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </div>

          {errors.email && (
            <p className="font-sans text-red-500 text-[11px] mt-2">Enter a valid email.</p>
          )}
          {status === "duplicate" && (
            <p className="font-sans text-brand-gold text-[11px] mt-2">You're already subscribed.</p>
          )}
          {status === "error" && (
            <p className="font-sans text-red-500 text-[11px] mt-2">Something went wrong. Try again.</p>
          )}
        </form>
      )}
    </>
  );
}
