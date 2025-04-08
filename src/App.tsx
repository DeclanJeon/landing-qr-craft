
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Navigation from "@/components/Navigation";
import ShopFooter from "@/components/shop/ShopFooter";
import Preloader from "@/components/Preloader";
import PeermallCreateModal from "@/components/PeermallCreateModal";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile"; 
import LoungeAdmin from "./pages/LoungeAdmin";
import PersonalLounge from "./pages/PersonalLounge";
import PeermallList from "./pages/PeermallList";
import CustomerService from "./pages/CustomerService";
import Community from "./pages/Community";
import SiteIntegration from "./pages/SiteIntegration";
import ShopPage from "./pages/ShopPage";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import ProductRegistration from "./pages/ProductRegistration";
import ShopAdmin from "./pages/ShopAdmin";
import ForumPostDetail from "./pages/ForumPostDetail";

const queryClient = new QueryClient();

// Define a layout component, now accepting the modal open handler
interface MainLayoutProps {
  onOpenCreateModal: () => void;
}
const MainLayout: React.FC<MainLayoutProps> = ({ onOpenCreateModal }) => (
  <div className="flex flex-col min-h-screen">
    <Navigation onOpenCreateModal={onOpenCreateModal} />
    <main className="flex-grow">
      <Outlet />
    </main>
    <ShopFooter
      shopName="Peermall"
      shopUrl="/"
      shopData={{
        shopName: "Peermall",
        shopUrl: "/",
        ownerName: "Peermall Team",
        contactNumber: "1-800-PEERMALL",
        email: "contact@peermall.com",
        address: "123 Commerce St, Digital City"
      }}
    />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Modal handlers
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PeermallCreateModal open={isCreateModalOpen} onClose={closeCreateModal} />
            <Routes>
              <Route element={<MainLayout onOpenCreateModal={openCreateModal} />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/qr-generator" element={<QRCodeGenerator />} />
                <Route path="/peermall-list" element={<PeermallList />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/forum" element={<Community />} />
                <Route path="/community/groupchat" element={<Community />} />
                <Route path="/community/voicechat" element={<Community />} />
                <Route path="/community/videochat" element={<Community />} />
                <Route path="/community/post/:postId" element={<ForumPostDetail />} />
                <Route path="/site-integration" element={<SiteIntegration />} />
              </Route>

              {/* Shop routes WITHOUT the global MainLayout */}
              <Route path="/shop/:shopUrl/home" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/products" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/qrcodes" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/community" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/support" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/about" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/service" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/new" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/category/:categoryId" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/product/:productId" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/terms" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/privacy" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/faq" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/contact" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/shipping" element={<ShopPage />} />
              <Route path="/shop/:shopUrl/community/post/:postId" element={<ForumPostDetail />} />
              <Route path="/shop/:shopUrl/admin" element={<ShopAdmin />} />
              <Route path="/shop/:shopUrl" element={<Navigate to="/shop/:shopUrl/home" replace />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
