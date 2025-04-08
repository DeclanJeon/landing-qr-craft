
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BasicInfoTab from '@/components/profile/BasicInfoTab';
import PeermallManagementTab from '@/components/profile/PeermallManagementTab';
import MessagesTab from '@/components/profile/MessagesTab';
import { toast } from '@/hooks/use-toast';

const UserProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('peermall-user-authenticated') === 'true';
    setIsAuthenticated(auth);
    
    if (!auth) {
      toast({
        title: "로그인이 필요합니다",
        description: "프로필 페이지에 접근하려면 로그인이 필요합니다.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('peermall-user-authenticated');
    localStorage.removeItem('peermall-user-nickname');
    toast({ title: "로그아웃 되었습니다" });
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">내 정보 관리</h1>
              <p className="text-gray-400">계정 정보를 관리하고 피어몰 및 쪽지함을 확인하세요.</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="mt-4 md:mt-0"
            >
              로그아웃
            </Button>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden">
            <Tabs defaultValue="basic-info" className="w-full">
              <div className="border-b border-gray-700">
                <div className="px-4">
                  <TabsList className="h-14 bg-transparent">
                    <TabsTrigger 
                      value="basic-info"
                      className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-blue-400 text-gray-400"
                    >
                      기본 정보 관리
                    </TabsTrigger>
                    <TabsTrigger 
                      value="peermall-management"
                      className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-blue-400 text-gray-400"
                    >
                      피어몰 관리
                    </TabsTrigger>
                    <TabsTrigger 
                      value="messages"
                      className="data-[state=active]:bg-gray-700/50 data-[state=active]:text-blue-400 text-gray-400"
                    >
                      쪽지함
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-6">
                <TabsContent value="basic-info" className="mt-0 space-y-4">
                  <BasicInfoTab />
                </TabsContent>
                
                <TabsContent value="peermall-management" className="mt-0 space-y-4">
                  <PeermallManagementTab />
                </TabsContent>
                
                <TabsContent value="messages" className="mt-0 space-y-4">
                  <MessagesTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
