import { useState } from 'react';
import { Sidebar } from './sidebar';
import { NetworkOverview } from './pages/network-overview';
import { NodeList } from './pages/node-list';
import { NodeDetails } from './pages/node-details';
import { NodeMap } from './pages/node-map';
import { Jobs } from './pages/jobs';
import { Marketplace } from './pages/marketplace';
import { Analytics } from './pages/analytics';
import { Leaderboard } from './pages/leaderboard';
import { InventiveNet } from './pages/inventivenet';
import { Settings } from './pages/settings';
import { useData } from '@/context/data-context';

type Page = 
  | 'overview' 
  | 'nodes' 
  | 'node-details' 
  | 'node-map'
  | 'jobs'
  | 'marketplace' 
  | 'analytics' 
  | 'leaderboard'
  | 'inventivenet'
  | 'settings';

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { loading, error } = useData();

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setCurrentPage('node-details');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-6">
        {currentPage === 'overview' && <NetworkOverview />}
        {currentPage === 'nodes' && <NodeList onNodeSelect={handleNodeSelect} />}
        {currentPage === 'node-details' && <NodeDetails nodeId={selectedNodeId!} />}
        {currentPage === 'node-map' && <NodeMap />}
        {currentPage === 'jobs' && <Jobs />}
        {currentPage === 'marketplace' && <Marketplace />}
        {currentPage === 'analytics' && <Analytics />}
        {currentPage === 'leaderboard' && <Leaderboard />}
        {currentPage === 'inventivenet' && <InventiveNet />}
        {currentPage === 'settings' && <Settings />}
      </main>
    </div>
  );
}