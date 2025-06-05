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

## Screenshots

<details><summary>Network Overview</summary>
![network-overview](https://github.com/user-attachments/assets/2826c8fa-22c5-4639-8ef5-d9bd7338a569)
</details>
<details><summary>My Nodes</summary>![my-nodes](https://github.com/user-attachments/assets/a7242723-59ef-492f-8566-a83ed6d3fe4a)
</details>
<details><summary>Node Details</summary>![node-details](https://github.com/user-attachments/assets/5d9cdaa8-0e6f-49d3-ba75-4724b5a541f1)
</details>
<details><summary>Node Map</summary>![node-map](https://github.com/user-attachments/assets/983fd128-485a-494c-a14f-92b67e936b92)
</details>
<details><summary>Jobs</summary>![jobs](https://github.com/user-attachments/assets/fd080244-87cf-498a-822f-4e7512fdcfc4)
</details>
<details><summary>Marketplace</summary>![marketplace](https://github.com/user-attachments/assets/ee3ac8c0-5709-47f5-9cec-8301f2976689)
</details>
<details><summary>Analytics</summary>![analytics](https://github.com/user-attachments/assets/ca2ae908-ce14-45aa-9671-a20690f22b9e)
</details>
<details><summary>Leaderboard</summary>![leaderboard-2](https://github.com/user-attachments/assets/b5a28808-d485-4092-979d-787fb925e636)
</details>
<details><summary>InventiveNet Calculator</summary>![incentive-net](https://github.com/user-attachments/assets/0f823d66-54d6-4981-8318-ffe346c112c7)
</details>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
