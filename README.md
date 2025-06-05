# GPU Network Dashboard

A dashboard prototype for managing distributed GPU networks (October 2024). Built with React, TypeScript, and Tailwind CSS, this template provides a comprehensive interface for monitoring network performance, managing nodes, and analyzing distributed computing workloads.

**Note**: This is a template application that currently operates with synthetic data from local files for demonstration purposes. You can easily integrate it with your own API endpoints and data sources.

![preview](https://github.com/user-attachments/assets/d5f038ea-5a53-409e-87f9-a13b5a92d3bc)

## Features

- [x] **Real-time Analytics** - Monitor network performance, job distribution, and node status
- [x] **Interactive Node Map** - Global visualization of node distribution with detailed metrics
- [x] **Advanced Charts** - Beautiful data visualization using Recharts
- [x] **Dark/Light Mode** - Seamless theme switching with system preference support
- [x] **Responsive Design** - Optimized for all screen sizes
- [x] **Node Management** - Add, remove, and monitor individual nodes
- [x] **Leaderboard System** - Track top performers and network contributors
- [x] **InventiveNet Calculator** - Reward projections and network analysis
- [ ] **Performance Tracking** - Track GPU, CPU, and memory usage
- [ ] **Job Management** - Monitor and manage distributed computing tasks
- [ ] **Marketplace Integration** - Built-in system for job distribution

## Stack

- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Recharts
- Vite

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/gpu-network-dash.git

# Navigate to project directory
cd gpu-network-dash

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will be available at `http://localhost:5173`

## Docker

The project includes a production-ready Docker configuration:

```bash
# Build the image
docker build -t gpu-network-dash .

# Run the container
docker run -p 3000:80 gpu-network-dash
```

The dashboard will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/     # UI components
│   ├── dashboard/  # Dashboard-specific components
│   └── ui/        # Reusable UI components (shadcn/ui)
├── context/       # React context providers
├── data/         # Synthetic data files (JSON)
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
└── types/        # TypeScript type definitions
```

## Data Schema

The application uses synthetic data with the following structure:

### Node Schema
```typescript
interface Node {
  ID: string;
  City: string;
  CountryCode: string;
  GPU: number;
  RAM: number;
  CPU: number;
  Online: boolean;
  ConnectedSince: number;
  Latitude: number;
  Longitude: number;
}
```

### Metrics Schema
```typescript
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
```

### Leaderboard Schema
```typescript
interface LeaderboardEntry {
  Rank: string;
  Wallet: string;
  Energy: number;
  Points: string;
  TotalOnlineHours: number;
  ConsecutiveDaysOnline: number;
}
```

## Data Integration

To integrate with your own data sources:

1. **API Integration**: Replace the data context in `src/context/data-context.tsx` with your API calls
2. **Data Format**: Ensure your API returns data matching the schemas or adjust the types accordingly
3. **Synthetic Data**: For testing, you can modify the JSON files in `src/data` to simulate different scenarios
3. **Real-time Updates**: Implement WebSocket connections or polling for live data
4. **Authentication**: Add authentication layers as needed for your network

## Customization

The dashboard is built with customization in mind:

- **Theme**: Modify `src/index.css` and `tailwind.config.js` for color schemes
- **Components**: Extend `src/components/ui` for custom UI elements
- **Data Sources**: Update `src/data` files or replace with API integration
- **Charts**: Customize visualizations in respective dashboard components
- **Deployment**: Modify `Dockerfile` and `nginx.conf` for production deployment

<details>

<summary>Screenshots</summary>

### Network Overview

### My Nodes

#### Node Details

### Node Map

### Jobs

### Marketplace

### Analytics

### Leaderboard

### InventiveNet Calculator

### Settings

</details>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
