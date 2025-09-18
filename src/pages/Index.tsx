import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { UnitsTable } from "@/components/UnitsTable";
import { UnitDetailModal } from "@/components/UnitDetailModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import { mockGPSUnits, mockDashboardStats, mockAlerts } from "@/data/mockData";
import { GPSUnit } from "@/types/gps";
import { 
  Bell,
  Settings,
  RefreshCw,
  Activity,
  MapPin
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Index = () => {
  const [selectedUnit, setSelectedUnit] = useState<GPSUnit | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleUnitSelect = (unit: GPSUnit) => {
    setSelectedUnit(unit);
    setIsDetailModalOpen(true);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In real app, this would trigger API calls
  };

  const unacknowledgedAlerts = mockAlerts.filter(alert => !alert.acknowledged);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Pemantauan GPS
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Fleet Management System
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">Terakhir diperbarui</p>
                <p className="text-sm font-medium">
                  {format(lastUpdated, "dd MMM yyyy, HH:mm", { locale: id })}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="relative"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unacknowledgedAlerts.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-danger text-danger-foreground text-xs"
                  >
                    {unacknowledgedAlerts.length}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <DashboardStats stats={mockDashboardStats} />

        {/* Active Alerts */}
        {unacknowledgedAlerts.length > 0 && (
          <Card className="mb-8 border-l-4 border-l-danger shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-danger/10 p-2 rounded-lg">
                  <Bell className="h-5 w-5 text-danger" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    Alert Memerlukan Perhatian ({unacknowledgedAlerts.length})
                  </h3>
                  <div className="space-y-2">
                    {unacknowledgedAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-center gap-3 text-sm">
                        <Badge 
                          variant={alert.priority === 'critical' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {alert.priority.toUpperCase()}
                        </Badge>
                        <span>{alert.message}</span>
                        <span className="text-muted-foreground ml-auto">
                          {format(alert.timestamp, "HH:mm", { locale: id })}
                        </span>
                      </div>
                    ))}
                  </div>
                  {unacknowledgedAlerts.length > 3 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      +{unacknowledgedAlerts.length - 3} alert lainnya
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Units Table */}
        <UnitsTable 
          units={mockGPSUnits} 
          onUnitSelect={handleUnitSelect}
        />

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-card rounded-lg shadow">
            <div className="text-2xl font-bold text-success">{mockDashboardStats.activeUnits}</div>
            <div className="text-sm text-muted-foreground">Unit Aktif Hari Ini</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow">
            <div className="text-2xl font-bold text-danger">{mockDashboardStats.offlineUnits}</div>
            <div className="text-sm text-muted-foreground">GPS Bermasalah</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow">
            <div className="text-2xl font-bold text-warning">{mockDashboardStats.maintenanceUnits}</div>
            <div className="text-sm text-muted-foreground">Dalam Perbaikan</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg shadow">
            <div className="text-2xl font-bold text-primary">98.5%</div>
            <div className="text-sm text-muted-foreground">Uptime GPS</div>
          </div>
        </div>
      </main>

      {/* Unit Detail Modal */}
      <UnitDetailModal
        unit={selectedUnit}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
};

export default Index;
