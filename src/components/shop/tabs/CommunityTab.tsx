import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users } from 'lucide-react';
import ForumPage from '@/components/community/ForumPage'; // Assuming ForumPage is correctly located
import GroupChatPage from '@/components/community/GroupChatPage'; // Assuming GroupChatPage is correctly located

interface CommunityTabProps {
  shopUrl: string; // Pass shopUrl if needed by ForumPage or others
}

const CommunityTab: React.FC<CommunityTabProps> = ({ shopUrl }) => {
  const [communityTab, setCommunityTab] = useState<string>("forum");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Tabs defaultValue="forum" value={communityTab} onValueChange={setCommunityTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>포럼 & 게시판</span>
            </TabsTrigger>
            <TabsTrigger value="groupchat" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>그룹 채팅</span>
            </TabsTrigger>
            <TabsTrigger value="voicechat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>음성 채팅</span>
            </TabsTrigger>
            <TabsTrigger value="videochat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>화상 채팅</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forum">
            {/* Pass shopUrl to ForumPage */}
            <ForumPage shopUrl={shopUrl} />
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

export default CommunityTab;
