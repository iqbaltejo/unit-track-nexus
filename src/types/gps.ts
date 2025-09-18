export interface GPSUnit {
  id: string;
  unitCode: string;
  vehicleType: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'offline' | 'maintenance' | 'inactive';
  lastGPSActive: Date;
  driver?: string;
  maintenanceInfo?: {
    downCode: string;
    offDate: Date;
    repairType: string;
    repairStartDate: Date;
    assignedTechnician: string;
    location: string;
  };
  alerts: Alert[];
}

export interface Alert {
  id: string;
  unitId: string;
  type: 'gps_offline' | 'maintenance_due' | 'emergency' | 'route_deviation';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface DashboardStats {
  totalUnits: number;
  activeUnits: number;
  offlineUnits: number;
  maintenanceUnits: number;
  alertsCount: number;
}

export type StatusFilter = 'all' | 'active' | 'offline' | 'maintenance' | 'inactive';