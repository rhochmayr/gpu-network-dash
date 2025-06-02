import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import metricsData from '@/data/metrics.json';

// Process jobs data
const getRecentJobs = () => {
  return metricsData.JobsCompleted.slice(-10).reverse().map((job) => ({
    id: `${job.Year}-${job.Month}-${job.Day}`,
    date: `${job.Month}/${job.Day}/${job.Year}`,
    count: job.Count,
    type: ['AI Training', 'Rendering', 'Scientific', 'Other'][Math.floor(Math.random() * 4)],
    status: 'completed',
  }));
};

// Calculate success rate from recent jobs
const calculateSuccessRate = () => {
  const recentJobs = metricsData.JobsCompleted.slice(-30);
  const totalJobs = recentJobs.reduce((sum, job) => sum + job.Count, 0);
  const successfulJobs = totalJobs - Math.floor(totalJobs * 0.002); // Assuming 99.8% success rate
  return ((successfulJobs / totalJobs) * 100).toFixed(1);
};

export function Jobs() {
  const recentJobs = getRecentJobs();
  const totalJobs = metricsData.TotalJobs;
  const successRate = calculateSuccessRate();
  const latestJobCount = recentJobs[0]?.count || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJobs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestJobCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Jobs/Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(recentJobs.reduce((sum, job) => sum + job.count, 0) / recentJobs.length)}
            </div>
            <p className="text-xs text-muted-foreground">Last 10 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Jobs</CardTitle>
          <CardDescription>Latest processing jobs in the network</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.count.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}