import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { useData } from '@/context/data-context';

const PROJECTION_METHODS = [
  { value: 'conservative', label: 'Conservative (7% Rewards)' },
  { value: 'average', label: 'Average (8.5% Rewards)' },
  { value: 'optimistic', label: 'Optimistic (10% Rewards)' },
];

const COMPARATIVE_PROJECTS = [
  { name: 'AKT', marketCap: 600000000 },
  { name: 'IOTX', marketCap: 350000000 },
  { name: 'GLM', marketCap: 320000000 },
  { name: 'ATH', marketCap: 270000000 },
  { name: 'IO', marketCap: 250000000 },
  { name: 'FLUX', marketCap: 245000000 },
  { name: 'NOS', marketCap: 190000000 },
];

const REWARD_PERCENTAGES = {
  conservative: 0.07,
  average: 0.085,
  optimistic: 0.10,
};

export function InventiveNet() {
  const { nodes, leaderboard } = useData();
  const [projectionMethod, setProjectionMethod] = useState('average');
  const [projectedMC, setProjectedMC] = useState(470000000);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // Load selected nodes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedNodes');
    if (saved) {
      setSelectedNodes(JSON.parse(saved));
    }
  }, []);

  // Calculate total points from all nodes in the leaderboard
  const totalNetworkPoints = leaderboard.reduce((sum, entry) => {
    const points = parseFloat(entry.Points.replace(/[^\d.-]/g, ''));
    return sum + (isNaN(points) ? 0 : points);
  }, 0);

  // Calculate points for selected nodes
  const selectedNodesPoints = selectedNodes.reduce((sum, nodeId) => {
    const node = nodes.find(n => n.ID === nodeId);
    if (!node) return sum;
    
    // Find the node's wallet in the leaderboard
    const leaderboardEntry = leaderboard.find(entry => 
      entry.Wallet.toLowerCase() === node.ID.toLowerCase()
    );
    
    if (!leaderboardEntry) return sum;
    
    const points = parseFloat(leaderboardEntry.Points.replace(/[^\d.-]/g, ''));
    return sum + (isNaN(points) ? 0 : points);
  }, 0);

  // Calculate percentage of total points
  const pointsPercentage = (selectedNodesPoints / totalNetworkPoints) * 100;

  // Calculate rewards based on projection method
  const calculateReward = (marketCap: number, method: keyof typeof REWARD_PERCENTAGES) => {
    const rewardPool = marketCap * REWARD_PERCENTAGES[method];
    return (rewardPool * (pointsPercentage / 100));
  };

  // Calculate market cap projections
  const marketCapProjections = {
    conservative: projectedMC * 0.4,
    average: projectedMC,
    optimistic: projectedMC * 1.3,
  };

  // Selected nodes statistics
  const selectedNodesData = nodes.filter(node => selectedNodes.includes(node.ID));
  const totalGPUs = selectedNodesData.reduce((sum, node) => sum + node.GPU, 0);
  const totalRAM = selectedNodesData.reduce((sum, node) => sum + node.RAM, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">InventiveNet Rewards Calculator</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Projection Settings</CardTitle>
            <CardDescription>Configure your reward projections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Projection Method</label>
              <Select
                value={projectionMethod}
                onValueChange={setProjectionMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select projection method" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECTION_METHODS.map(method => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Projected Market Cap</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">$0</span>
                <Slider
                  value={[projectedMC]}
                  max={1000000000}
                  step={1000000}
                  onValueChange={([value]) => setProjectedMC(value)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">$1B</span>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                ${(projectedMC / 1000000).toFixed(1)}M
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Node Statistics</CardTitle>
            <CardDescription>Based on your selected nodes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Total GPUs</label>
                <p className="text-2xl font-bold">{totalGPUs}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Total RAM</label>
                <p className="text-2xl font-bold">
                  {(totalRAM / 1024 / 1024 / 1024).toFixed(1)} GB
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Total Points</label>
                <p className="text-2xl font-bold">{selectedNodesPoints.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Network Share</label>
                <p className="text-2xl font-bold">{pointsPercentage.toFixed(2)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Cap Projections</CardTitle>
          <CardDescription>Comparative analysis with similar projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Projection</TableHead>
                <TableHead>Your Reward Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARATIVE_PROJECTS.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>${(project.marketCap / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>
                    {project.marketCap > marketCapProjections[projectionMethod as keyof typeof marketCapProjections] ? 'Higher' : 'Lower'}
                  </TableCell>
                  <TableCell>
                    ${calculateReward(project.marketCap, projectionMethod as keyof typeof REWARD_PERCENTAGES).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conservative Estimate</CardTitle>
            <CardDescription>7% Reward Pool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateReward(marketCapProjections.conservative, 'conservative').toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on ${(marketCapProjections.conservative / 1000000).toFixed(1)}M market cap
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Estimate</CardTitle>
            <CardDescription>8.5% Reward Pool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateReward(marketCapProjections.average, 'average').toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on ${(marketCapProjections.average / 1000000).toFixed(1)}M market cap
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimistic Estimate</CardTitle>
            <CardDescription>10% Reward Pool</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${calculateReward(marketCapProjections.optimistic, 'optimistic').toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on ${(marketCapProjections.optimistic / 1000000).toFixed(1)}M market cap
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}