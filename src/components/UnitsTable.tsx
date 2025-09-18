import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { GPSUnit, StatusFilter } from "@/types/gps";
import { 
  MapPin, 
  User, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UnitsTableProps {
  units: GPSUnit[];
  onUnitSelect: (unit: GPSUnit) => void;
}

export const UnitsTable = ({ units, onUnitSelect }: UnitsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredUnits = units.filter(unit => {
    const matchesSearch = 
      unit.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.driver?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === "all" || unit.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "Baru saja";
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} jam lalu`;
    return format(date, "dd MMM yyyy HH:mm", { locale: id });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            Monitoring Unit GPS
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari unit, driver, lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="offline">GPS Off</SelectItem>
                <SelectItem value="maintenance">Perbaikan</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/50">
                <TableHead className="font-semibold">Kode Unit</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Driver</TableHead>
                <TableHead className="font-semibold">Lokasi</TableHead>
                <TableHead className="font-semibold">GPS Terakhir</TableHead>
                <TableHead className="font-semibold">Alert</TableHead>
                <TableHead className="font-semibold text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit) => (
                <TableRow 
                  key={unit.id} 
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-primary">
                        {unit.unitCode}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {unit.vehicleType}
                      </Badge>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <StatusBadge status={unit.status} />
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{unit.driver || "-"}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-start gap-2 max-w-xs">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {unit.location.address}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className={unit.status === 'active' ? 'text-success' : 'text-muted-foreground'}>
                        {formatLastSeen(unit.lastGPSActive)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {unit.alerts.length > 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        {unit.alerts.length} Alert
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUnitSelect(unit)}
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredUnits.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Tidak ada unit ditemukan</p>
            <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};