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
import { useData } from '@/context/data-context';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Leaderboard() {
  const { leaderboard, loading } = useData();
  const [pageSize, setPageSize] = useState<string>("10");
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(leaderboard.length / parseInt(pageSize));
  const startIndex = (currentPage - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  const paginatedLeaderboard = leaderboard.slice(startIndex, endIndex);

  // Calculate total network stats
  const totalEnergy = leaderboard.reduce((sum, entry) => sum + entry.Energy, 0);
  const totalPoints = leaderboard.reduce((sum, entry) => {
    // Remove any non-numeric characters except decimal points and parse
    const points = parseFloat(entry.Points.replace(/[^\d.-]/g, ''));
    return sum + (isNaN(points) ? 0 : points);
  }, 0);
  const averageUptime = leaderboard.reduce((sum, entry) => sum + entry.TotalOnlineHours, 0) / leaderboard.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Network Leaderboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEnergy.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Network-wide energy consumption</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Cumulative network points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageUptime)} hours</div>
            <p className="text-xs text-muted-foreground">Per operator</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaderboard.length}</div>
            <p className="text-xs text-muted-foreground">Total participants</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Node Operators</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>Ranked by points and performance</CardDescription>
            <div className="flex items-center space-x-2">
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 rows</SelectItem>
                  <SelectItem value="25">25 rows</SelectItem>
                  <SelectItem value="50">50 rows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Energy</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeaderboard.map((operator) => (
                <TableRow key={operator.Rank}>
                  <TableCell className="font-medium">#{operator.Rank}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {operator.Wallet.slice(0, 6)}...{operator.Wallet.slice(-4)}
                  </TableCell>
                  <TableCell>{operator.Energy.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                  <TableCell>{parseFloat(operator.Points.replace(/[^\d.-]/g, '')).toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                  <TableCell>{operator.TotalOnlineHours.toLocaleString()} hrs</TableCell>
                  <TableCell>
                    <Badge variant={operator.ConsecutiveDaysOnline > 7 ? 'default' : 'secondary'}>
                      {operator.ConsecutiveDaysOnline} days
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, leaderboard.length)} of {leaderboard.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest point earners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.slice(0, 3).map((operator, index) => (
                <div key={operator.Rank}>
                  <h4 className="text-sm font-medium text-muted-foreground">#{index + 1} Ranked Operator</h4>
                  <p className="text-lg font-semibold font-mono">
                    {operator.Wallet.slice(0, 6)}...{operator.Wallet.slice(-4)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {parseFloat(operator.Points.replace(/[^\d.-]/g, '')).toLocaleString(undefined, { maximumFractionDigits: 2 })} points
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Longest Streaks</CardTitle>
            <CardDescription>Most consecutive days online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...leaderboard]
                .sort((a, b) => b.ConsecutiveDaysOnline - a.ConsecutiveDaysOnline)
                .slice(0, 3)
                .map((operator, index) => (
                  <div key={operator.Rank}>
                    <h4 className="text-sm font-medium text-muted-foreground">#{index + 1} Streak</h4>
                    <p className="text-lg font-semibold font-mono">
                      {operator.Wallet.slice(0, 6)}...{operator.Wallet.slice(-4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {operator.ConsecutiveDaysOnline} days online
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Leaders</CardTitle>
            <CardDescription>Highest energy contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...leaderboard]
                .sort((a, b) => b.Energy - a.Energy)
                .slice(0, 3)
                .map((operator, index) => (
                  <div key={operator.Rank}>
                    <h4 className="text-sm font-medium text-muted-foreground">#{index + 1} Energy Provider</h4>
                    <p className="text-lg font-semibold font-mono">
                      {operator.Wallet.slice(0, 6)}...{operator.Wallet.slice(-4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {operator.Energy.toLocaleString(undefined, { maximumFractionDigits: 2 })} energy
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}