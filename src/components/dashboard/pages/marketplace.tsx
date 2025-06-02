import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>AI Training</CardTitle>
              <Badge>High Demand</Badge>
            </div>
            <CardDescription>Machine Learning Workloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Price</span>
                <span className="font-medium">$2.50/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Available Jobs</span>
                <span className="font-medium">42</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Rendering</CardTitle>
              <Badge variant="secondary">Moderate</Badge>
            </div>
            <CardDescription>3D & Video Rendering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Price</span>
                <span className="font-medium">$1.75/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Available Jobs</span>
                <span className="font-medium">28</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Scientific</CardTitle>
              <Badge variant="secondary">Low</Badge>
            </div>
            <CardDescription>Research & Simulation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Price</span>
                <span className="font-medium">$1.25/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Available Jobs</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
          <CardDescription>
            Popular workload types and pricing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Market analytics coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}