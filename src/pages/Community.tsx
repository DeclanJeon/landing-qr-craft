import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Removed redundant Navigation import
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageSquare, Mic, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ForumPage from '@/components/community/ForumPage';
import GroupChatPage from '@/components/community/GroupChatPage';

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>("forum");

  return (
    // Apply dark theme background and adjust padding
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-6"> {/* Consistent padding */}
        <header className="mb-10"> {/* Increased margin */}
           {/* Update text colors */}
          <h1 className="text-3xl font-bold text-white">피어몰 커뮤니티</h1>
          <p className="mt-2 text-gray-400">
            다양한 사용자들과 소통하고 정보를 공유할 수 있는 공간입니다.
          </p>
        </header>

        <Tabs defaultValue="forum" value={activeTab} onValueChange={setActiveTab} className="w-full">
           {/* Dark theme for TabsList and TabsTrigger */}
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-10 bg-gray-800/50 border border-gray-700 p-1 h-auto">
            <TabsTrigger
              value="forum"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-100 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200" // Brighter inactive text (gray-100), kept lighter hover bg (gray-600)
            >
              <MessageSquare className="h-4 w-4" />
              <span>포럼 & 게시판</span>
            </TabsTrigger>
            <TabsTrigger
              value="groupchat"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-100 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200" // Brighter inactive text (gray-100), kept lighter hover bg (gray-600)
            >
              <Users className="h-4 w-4" />
              <span>그룹 채팅</span>
            </TabsTrigger>
            <TabsTrigger
              value="voicechat"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-100 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200" // Brighter inactive text (gray-100), kept lighter hover bg (gray-600)
            >
              <Mic className="h-4 w-4" />
              <span>음성 채팅</span>
            </TabsTrigger>
            <TabsTrigger
              value="videochat"
              className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-100 hover:text-white hover:bg-gray-600 rounded-md transition-colors duration-200" // Brighter inactive text (gray-100), kept lighter hover bg (gray-600)
            >
              <Video className="h-4 w-4" />
              <span>화상 채팅</span>
            </TabsTrigger>
          </TabsList>

          {/* Ensure child components (ForumPage, GroupChatPage) are also styled for dark theme */}
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
  );
};

export default Community;
