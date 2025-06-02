import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Dashboard } from '@/components/dashboard/dashboard';
import { DataProvider } from '@/context/data-context';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DataProvider>
        <Dashboard />
        <Toaster />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;