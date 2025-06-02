# GPU Network Dashboard

A modern, feature-rich dashboard template for managing distributed GPU networks, built with React, TypeScript, and Tailwind CSS.

![preview](https://github.com/user-attachments/assets/d5f038ea-5a53-409e-87f9-a13b5a92d3bc)

## Features

- 📊 **Real-time Analytics** - Monitor network performance, job distribution, and node status
- 🌍 **Interactive Node Map** - Global visualization of node distribution with detailed metrics
- 📈 **Advanced Charts** - Beautiful data visualization using Recharts
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference support
- 📱 **Responsive Design** - Optimized for all screen sizes
- 🔐 **Node Management** - Add, remove, and monitor individual nodes
- 📊 **Performance Tracking** - Track GPU, CPU, and memory usage
- 💼 **Job Management** - Monitor and manage distributed computing tasks
- 🏆 **Leaderboard System** - Track top performers and network contributors
- 🛍️ **Marketplace Integration** - Built-in system for job distribution
- ⚡ **InventiveNet Calculator** - Reward projections and network analysis

## Tech Stack

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 📊 Recharts
- 🗺️ React Leaflet
- 🎭 Radix UI
- 🎯 Lucide Icons
- 🏗️ Vite

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/gpu-network-dash.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

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
│   └── ui/        # Reusable UI components
├── context/       # React context providers
├── data/         # Static data and types
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
└── types/        # TypeScript type definitions
```

## Customization

The dashboard is built with customization in mind:

- **Theme**: Modify `src/index.css` for color schemes
- **Components**: Extend `src/components/ui` for custom elements
- **Data**: Update `src/data` files for your network structure
- **Charts**: Customize visualizations in respective components
- **Docker**: Modify `Dockerfile` and `nginx.conf` for deployment needs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]
