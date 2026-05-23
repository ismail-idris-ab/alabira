import { useCountUp } from "../../hooks/useCountUp";

export default function StatCard({ value, suffix = "", label, inView }) {
  const count = useCountUp(value, 1600, inView);

  return (
    <div className="flex flex-col items-center text-center py-6 px-4">
      <span
        className="font-display text-brand-green"
        style={{ fontSize: "clamp(2.25rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {count.toLocaleString()}{suffix}
      </span>
      <div style={{ width: "24px", height: "1px", backgroundColor: "#B8912A", margin: "10px auto" }} />
      <span className="font-sans uppercase text-brand-clay" style={{ fontSize: "11px", letterSpacing: "0.16em", fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}
