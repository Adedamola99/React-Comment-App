import type { PaymentStatus, VehicleStatus, DriverStatus } from "../../types";

type BadgeVariant = "green" | "red" | "yellow" | "blue" | "gray";

const variantMap: Record<string, BadgeVariant> = {
  Paid: "green",
  Active: "green",
  Late: "red",
  Suspended: "red",
  Inactive: "red",
  Pending: "yellow",
  Maintenance: "yellow",
};

interface BadgeProps {
  status: PaymentStatus | VehicleStatus | DriverStatus | string;
  dot?: boolean;
}

export default function Badge({ status, dot = true }: BadgeProps) {
  const variant = variantMap[status] ?? "gray";
  return (
    <span className={`badge badge-${variant}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      )}
      {status}
    </span>
  );
}
