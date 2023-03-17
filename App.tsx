import { DataProvider } from './src/context/DataContext';
import { Route } from './src/routes/TabStack';



export default function App() {
  return (
    <DataProvider>
        <Route/>
    </DataProvider>
  );
};
