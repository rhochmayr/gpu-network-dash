import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Node } from '@/types/node';

type NodeListProps = {
  onNodeSelect: (nodeId: string) => void;
};

export function NodeList({ onNodeSelect }: NodeListProps) {
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [myNodes, setMyNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  useEffect(() => {
    // Load all nodes
    fetch('/src/data/nodes.json')
      .then((res) => res.json())
      .then((data) => {
        setAllNodes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading nodes:', error);
        setLoading(false);
      });

    // Load selected nodes from localStorage
    const savedNodes = localStorage.getItem('selectedNodes');
    if (savedNodes) {
      setSelectedNodes(JSON.parse(savedNodes));
    }
  }, []);

  useEffect(() => {
    // Update myNodes whenever allNodes or selectedNodes change
    const filteredNodes = allNodes.filter(node => selectedNodes.includes(node.ID));
    setMyNodes(filteredNodes);
  }, [allNodes, selectedNodes]);

  const handleNodeToggle = (nodeId: string) => {
    const updatedSelection = selectedNodes.includes(nodeId)
      ? selectedNodes.filter(id => id !== nodeId)
      : [...selectedNodes, nodeId];
    
    setSelectedNodes(updatedSelection);
    localStorage.setItem('selectedNodes', JSON.stringify(updatedSelection));
  };

  const handleRemoveNode = (nodeId: string) => {
    const updatedSelection = selectedNodes.filter(id => id !== nodeId);
    setSelectedNodes(updatedSelection);
    localStorage.setItem('selectedNodes', JSON.stringify(updatedSelection));
  };

  const filteredNodes = allNodes.filter(node => 
    node.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.CountryCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    node.ID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Nodes</h2>
          <p className="text-muted-foreground">
            Showing {myNodes.length} selected nodes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Node</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add Nodes</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nodes by location or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>GPUs</TableHead>
                    <TableHead>RAM</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNodes.map((node) => (
                    <TableRow key={node.ID}>
                      <TableCell>
                        <Checkbox
                          checked={selectedNodes.includes(node.ID)}
                          onCheckedChange={() => handleNodeToggle(node.ID)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {node.City}, {node.CountryCode}
                      </TableCell>
                      <TableCell>
                        <Badge variant={node.Online ? 'default' : 'secondary'}>
                          {node.Online ? 'online' : 'offline'}
                        </Badge>
                      </TableCell>
                      <TableCell>{node.GPU}</TableCell>
                      <TableCell>
                        {(node.RAM / 1024 / 1024 / 1024).toFixed(2)} GB
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>GPUs</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myNodes.map((node) => (
            <TableRow key={node.ID}>
              <TableCell className="font-medium">
                {node.City}, {node.CountryCode}
              </TableCell>
              <TableCell>
                <Badge variant={node.Online ? 'default' : 'secondary'}>
                  {node.Online ? 'online' : 'offline'}
                </Badge>
              </TableCell>
              <TableCell>{node.GPU}</TableCell>
              <TableCell>{(node.RAM / 1024 / 1024 / 1024).toFixed(2)} GB</TableCell>
              <TableCell>{node.CPU} MHz</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" onClick={() => onNodeSelect(node.ID)}>
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveNode(node.ID)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {myNodes.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No nodes selected. Click "Add Node" to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}