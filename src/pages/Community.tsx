
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageSquare, Mic, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ForumPage from '@/components/community/ForumPage';
import GroupChatPage from '@/components/community/GroupChatPage';

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>("forum");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">피어몰 커뮤니티</h1>
            <p className="mt-2 text-gray-600">
              다양한 사용자들과 소통하고 정보를 공유할 수 있는 공간입니다.
            </p>
          </header>

          <Tabs defaultValue="forum" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="forum" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>포럼 & 게시판</span>
              </TabsTrigger>
              <TabsTrigger value="groupchat" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>그룹 채팅</span>
              </TabsTrigger>
              <TabsTrigger value="voicechat" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>음성 채팅</span>
              </TabsTrigger>
              <TabsTrigger value="videochat" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>화상 채팅</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="forum">
              <ForumPage />
            </TabsContent>

            <TabsContent value="groupchat">
              <GroupChatPage type="text" />
            </TabsContent>

            <TabsContent value="voicechat">
              <GroupChatPage type="voice" />
            </TabsContent>

            <TabsContent value="videochat">
              <GroupChatPage type="video" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Community;
