import { useCountUp } from "../../hooks/useCountUp";

export default function StatCard({ value, suffix = "", label, inView }) {
  const count = useCountUp(value, 1600, inView);

  return (
    <div className="flex flex-col items-center text-center py-6 px-4">
      <span className="font-display text-stat text-brand-green font-semibold tracking-heading leading-none">
        {count.toLocaleString()}{suffix}
      </span>
      <div className="w-6 h-px bg-brand-gold my-2.5 mx-auto" />
      <span className="font-sans text-eyebrow uppercase text-brand-clay tracking-label font-medium">
        {label}
      </span>
    </div>
  );
}
