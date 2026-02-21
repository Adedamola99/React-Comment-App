interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizes = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
};

const colors = [
  "bg-blue-500/20 text-blue-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-violet-500/20 text-violet-400",
  "bg-amber-500/20 text-amber-400",
  "bg-cyan-500/20 text-cyan-400",
  "bg-rose-500/20 text-rose-400",
];

export default function Avatar({ initials, size = "md", color }: AvatarProps) {
  const colorClass = color ?? colors[initials.charCodeAt(0) % colors.length];
  return (
    <div
      className={`${sizes[size]} ${colorClass} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
