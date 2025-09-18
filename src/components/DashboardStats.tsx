import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardStats as StatsType } from "@/types/gps";
import { 
  Truck, 
  CheckCircle, 
  XCircle, 
  Wrench, 
  AlertTriangle 
} from "lucide-react";

interface DashboardStatsProps {
  stats: StatsType;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      title: "Total Unit",
      value: stats.totalUnits,
      icon: Truck,
      gradient: "bg-gradient-to-br from-primary to-primary-glow",
      textColor: "text-primary-foreground"
    },
    {
      title: "Unit Aktif",
      value: stats.activeUnits,
      icon: CheckCircle,
      gradient: "bg-gradient-to-br from-success to-success-glow",
      textColor: "text-success-foreground"
    },
    {
      title: "GPS Off",
      value: stats.offlineUnits,
      icon: XCircle,
      gradient: "bg-gradient-to-br from-danger to-danger-glow",
      textColor: "text-danger-foreground"
    },
    {
      title: "Perbaikan",
      value: stats.maintenanceUnits,
      icon: Wrench,
      gradient: "bg-gradient-to-br from-warning to-warning-glow",
      textColor: "text-warning-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden border-0 shadow-lg">
            <CardHeader className={`${stat.gradient} ${stat.textColor} pb-2`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 opacity-75" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Alerts Card */}
      <Card className="overflow-hidden border-0 shadow-lg md:col-span-2 lg:col-span-4">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alert Aktif
            </CardTitle>
            {stats.alertsCount > 0 && (
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
                {stats.alertsCount} Alert Baru
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};