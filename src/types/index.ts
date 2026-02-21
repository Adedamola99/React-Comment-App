export type PaymentStatus = "Paid" | "Late" | "Pending";
export type VehicleStatus = "Active" | "Maintenance" | "Inactive";
export type DriverStatus = "Active" | "Suspended" | "Inactive";

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  vehicleId: string;
  weeklyPayment: number;
  status: DriverStatus;
  performanceScore: number;
  riskScore: number;
  joinDate: string;
  totalPaid: number;
  outstandingBalance: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  driverId: string | null;
  weeklyTarget: number;
  status: VehicleStatus;
  totalRevenue: number;
  mileage: number;
  lastService: string;
  nextService: string;
  color: string;
}

export interface Payment {
  id: string;
  driverId: string;
  vehicleId: string;
  amount: number;
  weekEnding: string;
  status: PaymentStatus;
  paidAt: string | null;
  note: string;
}

export interface Activity {
  id: string;
  type: "payment" | "driver" | "vehicle" | "maintenance";
  message: string;
  timestamp: string;
  meta?: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  target: number;
  collections: number;
}

export interface DriverPerformance {
  name: string;
  score: number;
  payments: number;
  onTime: number;
}
