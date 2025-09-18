import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./StatusBadge";
import { GPSUnit } from "@/types/gps";
import { 
  MapPin, 
  User, 
  Clock, 
  Calendar,
  Wrench,
  AlertTriangle,
  Phone,
  Navigation
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UnitDetailModalProps {
  unit: GPSUnit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UnitDetailModal = ({ unit, open, onOpenChange }: UnitDetailModalProps) => {
  if (!unit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            Detail Unit {unit.unitCode}
            <StatusBadge status={unit.status} />
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap unit dan riwayat perbaikan dari sistem SAP
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Unit Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Informasi Unit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Tipe Kendaraan</span>
                <Badge variant="outline">{unit.vehicleType}</Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Driver</span>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{unit.driver || "Tidak ada driver"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Lokasi Terakhir</span>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{unit.location.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {unit.location.lat.toFixed(6)}, {unit.location.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">GPS Terakhir Aktif</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {format(unit.lastGPSActive, "dd MMMM yyyy, HH:mm", { locale: id })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Information */}
          {unit.maintenanceInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Informasi Perbaikan (SAP)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Kode Down</span>
                  <Badge variant="secondary">{unit.maintenanceInfo.downCode}</Badge>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Jenis Perbaikan</span>
                  <p className="font-medium text-warning">{unit.maintenanceInfo.repairType}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Tanggal Unit OFF</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {format(unit.maintenanceInfo.offDate, "dd MMMM yyyy, HH:mm", { locale: id })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Mulai Perbaikan</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {format(unit.maintenanceInfo.repairStartDate, "dd MMMM yyyy, HH:mm", { locale: id })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Teknisi</span>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{unit.maintenanceInfo.assignedTechnician}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Lokasi Perbaikan</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{unit.maintenanceInfo.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alerts Section */}
          {unit.alerts.length > 0 && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alert Aktif ({unit.alerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {unit.alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card"
                    >
                      <div className={`rounded-full p-1 ${
                        alert.priority === 'critical' ? 'bg-danger/20 text-danger' :
                        alert.priority === 'high' ? 'bg-warning/20 text-warning' :
                        alert.priority === 'medium' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={alert.priority === 'critical' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(alert.timestamp, "dd MMM yyyy, HH:mm", { locale: id })}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{alert.message}</p>
                      </div>

                      {!alert.acknowledged && (
                        <Button variant="outline" size="sm">
                          Tandai Dibaca
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Phone className="h-4 w-4 mr-2" />
            Hubungi Driver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};