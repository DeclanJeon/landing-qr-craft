
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import LoungeAdmin from "./pages/LoungeAdmin";
import PersonalLounge from "./pages/PersonalLounge";
import PeermallList from "./pages/PeermallList";
import CustomerService from "./pages/CustomerService";
import Community from "./pages/Community";
import SiteIntegration from "./pages/SiteIntegration";
import ShopPage from "./pages/ShopPage";
import QRCodeGenerator from "./pages/QRCodeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lounge-admin" element={<LoungeAdmin />} />
            <Route path="/personal-lounge" element={<PersonalLounge />} />
            <Route path="/qr-generator" element={<QRCodeGenerator />} />
            <Route path="/peermall-list" element={<PeermallList />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/forum" element={<Community />} />
            <Route path="/community/groupchat" element={<Community />} />
            <Route path="/community/voicechat" element={<Community />} />
            <Route path="/community/videochat" element={<Community />} />
            <Route path="/site-integration" element={<SiteIntegration />} />
            
            {/* Shop routes with new URL structure */}
            <Route path="/shop/:shopUrl/home" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/products" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/qrcodes" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/community" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/support" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/new" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/category/:categoryId" element={<ShopPage />} />
            <Route path="/shop/:shopUrl/about" element={<ShopPage />} />
            
            {/* Redirect old shop routes to new structure */}
            <Route path="/shop/:shopUrl" element={<Navigate to="/shop/:shopUrl/home" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
