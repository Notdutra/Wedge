import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Reservations from "@/pages/Reservations";
import Floorplan from "@/pages/Floorplan";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Policy from "@/pages/Policy";
import { AuthProvider } from "@/context/AuthContext.tsx";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/floorplan" element={<Floorplan />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
