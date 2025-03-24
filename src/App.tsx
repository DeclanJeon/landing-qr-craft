
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import LoungeAdmin from "./pages/LoungeAdmin";
import PersonalLounge from "./pages/PersonalLounge";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import QRCodeList from "./pages/QRCodeList";
import PeermallList from "./pages/PeermallList";
import CustomerService from "./pages/CustomerService";
import Community from "./pages/Community";
import SiteIntegration from "./pages/SiteIntegration";
import ShopPage from "./pages/ShopPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lounge-admin" element={<LoungeAdmin />} />
          <Route path="/personal-lounge" element={<PersonalLounge />} />
          <Route path="/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/qr-list" element={<QRCodeList />} />
          <Route path="/peermall-list" element={<PeermallList />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/community" element={<Community />} />
          <Route path="/site-integration" element={<SiteIntegration />} />
          <Route path="/shop/:shopUrl/:page" element={<ShopPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
