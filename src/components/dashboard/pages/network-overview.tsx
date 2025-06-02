import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useData } from '@/context/data-context';

// Process jobs data for the chart
const processActivityData = (metrics: any) => {
  // Get the last 24 entries from both Jobs and Nodes data
  const jobsData = metrics.JobsCompleted.slice(-24);
  const nodesData = metrics.Nodes.slice(-24);

  // Combine the data
  return jobsData.map((job: any, index: number) => ({
    name: `${job.Month}/${job.Day}`,
    jobs: job.Count,
    nodes: nodesData[index]?.Count || 0,
  }));
};

export function NetworkOverview() {
  const { metrics } = useData();

  if (!metrics) return null;

  const activityData = processActivityData(metrics);
  const totalNodes = metrics.TotalNodes;
  const totalJobs = metrics.TotalJobs;
  
  // Calculate network load based on recent job counts
  const recentJobsLoad = Math.min(
    Math.round((activityData[activityData.length - 1]?.jobs || 0) / totalNodes * 100),
    100
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNodes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.TotalModules} Total Modules
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentJobsLoad}%</div>
            <Progress value={recentJobsLoad} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all nodes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activityData[activityData.length - 1]?.jobs || 0}
            </div>
            <p className="text-xs text-muted-foreground">Current jobs in progress</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Network Activity</CardTitle>
          <CardDescription>Jobs and nodes over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="jobs"
                  name="Jobs"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="nodes"
                  name="Nodes"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}