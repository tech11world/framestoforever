import logo from "@/assets/logo.asset.json";

export function Logo({ className = "h-14 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Frames to Forever — Photography by Fraz Saifi"
      className={`shrink-0 object-contain ${className}`}
      width={230}
      height={160}
    />
  );
}
