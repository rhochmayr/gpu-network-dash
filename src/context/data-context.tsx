import { createContext, useContext, useEffect, useState } from 'react';
import type { Node } from '@/types/node';

interface Metrics {
  TotalJobs: number;
  TotalNodes: number;
  TotalModules: number;
  TotalHashrate: number;
  JobsCompleted: Array<{
    Year: number;
    Month: number;
    Day: number;
    Count: number;
  }>;
  Nodes: Array<{
    Year: number;
    Month: number;
    Day: number;
    Count: number;
  }>;
  Hashrates: any[];
}

interface LeaderboardEntry {
  Rank: string;
  Wallet: string;
  Energy: number;
  Points: string;
  TotalOnlineHours: number;
  ConsecutiveDaysOnline: number;
}

interface DataContextType {
  nodes: Node[];
  metrics: Metrics | null;
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  nodes: [],
  metrics: null,
  leaderboard: [],
  loading: true,
  error: null,
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(import.meta.env.BASE_URL + 'data/nodes.json'),
      fetch(import.meta.env.BASE_URL + 'data/metrics.json'),
      fetch(import.meta.env.BASE_URL + 'data/leaderboard.json'),
    ])
      .then(async ([nodesRes, metricsRes, leaderboardRes]) => {
        const [nodesData, metricsData, leaderboardData] = await Promise.all([
          nodesRes.json(),
          metricsRes.json(),
          leaderboardRes.json(),
        ]);

        setNodes(nodesData);
        setMetrics(metricsData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider
      value={{
        nodes,
        metrics,
        leaderboard,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};