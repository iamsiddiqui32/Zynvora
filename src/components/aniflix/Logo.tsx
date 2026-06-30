import zynvora from "@/assets/zynvora.png.asset.json";

export function Logo({
  size = 36,
  withWordmark = true,
  className = "",
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={zynvora.url}
        alt="Zynvora"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        className="rounded-md object-contain drop-shadow-[0_0_18px_var(--gold-soft)]"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className="font-display text-2xl font-bold tracking-tight">
          <span className="text-gold">Zyn</span>
          <span>vora</span>
        </span>
      )}
    </span>
  );
}