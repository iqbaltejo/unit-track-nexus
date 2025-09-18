import { GPSUnit, Alert, DashboardStats } from '../types/gps';

export const mockAlerts: Alert[] = [
  {
    id: '1',
    unitId: 'TRK001',
    type: 'gps_offline',
    message: 'GPS signal lost for TRK001 - last seen in Jakarta Selatan',
    timestamp: new Date('2024-01-15T14:30:00'),
    acknowledged: false,
    priority: 'high'
  },
  {
    id: '2', 
    unitId: 'VAN003',
    type: 'maintenance_due',
    message: 'Scheduled maintenance overdue for VAN003',
    timestamp: new Date('2024-01-15T09:15:00'),
    acknowledged: true,
    priority: 'medium'
  },
  {
    id: '3',
    unitId: 'TRK005',
    type: 'emergency',
    message: 'Emergency button activated on TRK005',
    timestamp: new Date('2024-01-15T16:45:00'),
    acknowledged: false,
    priority: 'critical'
  }
];

export const mockGPSUnits: GPSUnit[] = [
  {
    id: '1',
    unitCode: 'TRK001',
    vehicleType: 'Truck',
    location: {
      lat: -6.2088,
      lng: 106.8456,
      address: 'Jl. Thamrin, Jakarta Pusat'
    },
    status: 'offline',
    lastGPSActive: new Date('2024-01-15T14:30:00'),
    driver: 'Ahmad Sutrisno',
    alerts: [mockAlerts[0]]
  },
  {
    id: '2',
    unitCode: 'VAN002',
    vehicleType: 'Van',
    location: {
      lat: -6.1944,
      lng: 106.8229,
      address: 'Jl. Sudirman, Jakarta Selatan'
    },
    status: 'active',
    lastGPSActive: new Date(),
    driver: 'Budi Santoso',
    alerts: []
  },
  {
    id: '3',
    unitCode: 'VAN003',
    vehicleType: 'Van',
    location: {
      lat: -6.2615,
      lng: 106.7810,
      address: 'Jl. Raya Kebayoran, Jakarta Selatan'
    },
    status: 'maintenance',
    lastGPSActive: new Date('2024-01-14T16:20:00'),
    driver: 'Catur Wibowo',
    maintenanceInfo: {
      downCode: 'ENG001',
      offDate: new Date('2024-01-14T08:00:00'),
      repairType: 'Engine Overhaul',
      repairStartDate: new Date('2024-01-15T07:00:00'),
      assignedTechnician: 'Eko Prasetyo',
      location: 'Workshop A, Kemayoran'
    },
    alerts: [mockAlerts[1]]
  },
  {
    id: '4',
    unitCode: 'TRK004',
    vehicleType: 'Truck',
    location: {
      lat: -6.1751,
      lng: 106.8650,
      address: 'Jl. Gatot Subroto, Jakarta Selatan'
    },
    status: 'active',
    lastGPSActive: new Date(),
    driver: 'Dedi Kurniawan',
    alerts: []
  },
  {
    id: '5',
    unitCode: 'TRK005',
    vehicleType: 'Truck',
    location: {
      lat: -6.1588,
      lng: 106.8300,
      address: 'Jl. HR Rasuna Said, Jakarta Selatan'
    },
    status: 'offline',
    lastGPSActive: new Date('2024-01-15T16:45:00'),
    driver: 'Eko Supriyanto',
    alerts: [mockAlerts[2]]
  },
  {
    id: '6',
    unitCode: 'VAN006',
    vehicleType: 'Van',
    location: {
      lat: -6.1200,
      lng: 106.8500,
      address: 'Jl. Pluit Raya, Jakarta Utara'
    },
    status: 'active',
    lastGPSActive: new Date(),
    driver: 'Farid Hasan',
    alerts: []
  },
  {
    id: '7',
    unitCode: 'TRK007',
    vehicleType: 'Truck',
    location: {
      lat: -6.3500,
      lng: 106.8000,
      address: 'Jl. Raya Bogor, Depok'
    },
    status: 'inactive',
    lastGPSActive: new Date('2024-01-12T10:30:00'),
    driver: 'Gilang Ramadan',
    alerts: []
  }
];

export const mockDashboardStats: DashboardStats = {
  totalUnits: mockGPSUnits.length,
  activeUnits: mockGPSUnits.filter(unit => unit.status === 'active').length,
  offlineUnits: mockGPSUnits.filter(unit => unit.status === 'offline').length,
  maintenanceUnits: mockGPSUnits.filter(unit => unit.status === 'maintenance').length,
  alertsCount: mockAlerts.filter(alert => !alert.acknowledged).length
};