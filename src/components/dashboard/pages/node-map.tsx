import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useData } from '@/context/data-context';

// Create custom markers for online and offline nodes
const onlineIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div class="w-3 h-3 rounded-full bg-primary border-2 border-background"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const offlineIcon = new L.DivIcon({
  className: 'custom-marker',
  html: '<div class="w-3 h-3 rounded-full bg-muted-foreground border-2 border-background"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export function NodeMap() {
  const { nodes, loading } = useData();

  // Calculate region statistics
  const regionStats = nodes.reduce((acc, node) => {
    const region = node.CountryCode;
    if (!acc[region]) {
      acc[region] = { total: 0, online: 0 };
    }
    acc[region].total++;
    if (node.Online) acc[region].online++;
    return acc;
  }, {} as Record<string, { total: number; online: number }>);

  const regionList = Object.entries(regionStats)
    .sort(([, a], [, b]) => b.total - a.total)
    .slice(0, 6);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Global Node Distribution</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Node Distribution Map</CardTitle>
          <CardDescription>Geographic distribution of network nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {nodes.map((node) => (
                <Marker
                  key={node.ID}
                  position={[node.Latitude, node.Longitude]}
                  icon={node.Online ? onlineIcon : offlineIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{node.City}, {node.CountryCode}</h3>
                      <p className="text-sm">Status: {node.Online ? 'Online' : 'Offline'}</p>
                      <p className="text-sm">GPUs: {node.GPU}</p>
                      <p className="text-sm">RAM: {(node.RAM / 1024 / 1024 / 1024).toFixed(2)} GB</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Node count by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionList.map(([code, stats]) => (
                <div key={code} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{code}</span>
                    <span className="font-medium">
                      {stats.online} / {stats.total} nodes online
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(stats.online / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Coverage</CardTitle>
            <CardDescription>Active nodes and coverage metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">{nodes.length}</div>
                <p className="text-sm text-muted-foreground">Total Nodes</p>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {nodes.filter(n => n.Online).length}
                </div>
                <p className="text-sm text-muted-foreground">Online Nodes</p>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {new Set(nodes.map(n => n.CountryCode)).size}
                </div>
                <p className="text-sm text-muted-foreground">Countries Covered</p>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {new Set(nodes.map(n => n.City)).size}
                </div>
                <p className="text-sm text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}