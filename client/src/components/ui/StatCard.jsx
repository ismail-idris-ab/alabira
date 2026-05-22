import { useCountUp } from "../../hooks/useCountUp";

export default function StatCard({ icon, value, suffix = "", label, inView }) {
  const count = useCountUp(value, 1500, inView);

  return (
    <div className="bg-white rounded-2xl shadow-sm px-8 py-6 flex flex-col items-center text-center">
      <span className="text-3xl mb-3" role="img" aria-hidden="true">
        {icon}
      </span>
      <span
        className="font-serif font-bold text-brand-green"
        style={{ fontSize: "3rem", lineHeight: 1, letterSpacing: "-0.02em" }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="font-sans text-xs font-medium uppercase tracking-widest text-brand-clay mt-2">
        {label}
      </span>
    </div>
  );
}
