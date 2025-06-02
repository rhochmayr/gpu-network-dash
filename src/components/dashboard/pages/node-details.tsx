import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import type { Node } from '@/types/node';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const performanceData = [
  { time: '00:00', gpu: 65, memory: 45, temp: 72 },
  { time: '04:00', gpu: 78, memory: 52, temp: 75 },
  { time: '08:00', gpu: 92, memory: 68, temp: 79 },
  { time: '12:00', gpu: 84, memory: 60, temp: 76 },
  { time: '16:00', gpu: 76, memory: 55, temp: 74 },
  { time: '20:00', gpu: 88, memory: 63, temp: 77 },
];

type NodeDetailsProps = {
  nodeId: string;
};

export function NodeDetails({ nodeId }: NodeDetailsProps) {
  const [node, setNode] = useState<Node | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/nodes.json')
      .then((res) => res.json())
      .then((data) => {
        const foundNode = data.find((n: Node) => n.ID === nodeId);
        setNode(foundNode || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading node details:', error);
        setLoading(false);
      });
  }, [nodeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!node) {
    return <div>Node not found</div>;
  }

  const ramGb = (node.RAM / 1024 / 1024 / 1024).toFixed(2);
  const cpuGhz = (node.CPU / 1000).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Node Details</h2>
          <p className="text-muted-foreground">{node.City}, {node.CountryCode}</p>
        </div>
        <Badge variant={node.Online ? 'default' : 'secondary'}>
          {node.Online ? 'Online' : 'Offline'}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GPU Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{node.GPU}</div>
            <Progress value={(node.GPU / 8) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cpuGhz} GHz</div>
            <Progress value={(node.CPU / 10000) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RAM</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ramGb} GB</div>
            <Progress value={(node.RAM / (64 * 1024 * 1024 * 1024)) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {node.Online ? 
                Math.floor((Date.now() - node.ConnectedSince) / (1000 * 60 * 60)) + 'h' : 
                '0h'}
            </div>
            <Progress value={node.Online ? 100 : 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="settings">Node Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Last 24 hours of node activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="gpu"
                      name="GPU Usage"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="memory"
                      name="Memory Usage"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      name="Temperature"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Currently running workloads</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No active jobs</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Node Settings</CardTitle>
              <CardDescription>Configure node parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Node ID</h4>
                  <p className="text-sm text-muted-foreground">{node.ID}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">
                    {node.City}, {node.Region}, {node.CountryCode}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Coordinates</h4>
                  <p className="text-sm text-muted-foreground">
                    {node.Latitude}, {node.Longitude}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}