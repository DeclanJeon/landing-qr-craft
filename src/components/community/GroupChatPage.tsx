import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Send, Mic, MicOff, Video, VideoOff, 
  ScreenShare, MoreVertical, UserPlus, Settings, 
  Image, File, Smile, Paperclip
} from 'lucide-react';

interface GroupChatPageProps {
  type: 'text' | 'voice' | 'video';
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isActive?: boolean;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    sender: "피어몰매니저",
    content: "안녕하세요! 피어몰 커뮤니티 그룹 채팅방에 오신 것을 환영합니다.",
    time: "10:00",
    isCurrentUser: false
  },
  {
    id: 2,
    sender: "QR마스터",
    content: "QR 코드 활용 관련해서 질문이 있으신 분들은 편하게 물어보세요!",
    time: "10:05",
    isCurrentUser: false
  },
  {
    id: 3,
    sender: "디자인프로",
    content: "피어몰 디자인 커스터마이징 관련 팁을 공유해 드릴게요.",
    time: "10:10",
    isCurrentUser: false
  },
  {
    id: 4,
    sender: "나",
    content: "안녕하세요! 처음 가입했습니다. 모두 잘 부탁드려요.",
    time: "10:15",
    isCurrentUser: true
  },
  {
    id: 5,
    sender: "피어몰매니저",
    content: "환영합니다! 궁금한 점이 있으시면 언제든지 물어보세요.",
    time: "10:17",
    isCurrentUser: false
  },
  {
    id: 6,
    sender: "링크수집가",
    content: "외부 링크 연동 관련해서 도움이 필요하신 분 계신가요?",
    time: "10:20",
    isCurrentUser: false
  },
  {
    id: 7,
    sender: "나",
    content: "네, 저는 외부 쇼핑몰 링크를 효과적으로 관리하는 방법이 궁금합니다.",
    time: "10:25",
    isCurrentUser: true
  }
];

const chatRooms: ChatRoom[] = [
  { id: 1, name: "피어몰 일반", lastMessage: "안녕하세요! 모두 반갑습니다.", time: "10:30", unread: 0, isActive: true },
  { id: 2, name: "QR 코드 활용", lastMessage: "QR 코드 사용법 공유합니다", time: "09:45", unread: 2 },
  { id: 3, name: "외부 링크 팁", lastMessage: "효과적인 링크 관리 방법", time: "어제", unread: 0 },
  { id: 4, name: "디자인 공유", lastMessage: "새로운 템플릿을 확인해보세요", time: "어제", unread: 5 },
  { id: 5, name: "마케팅 전략", lastMessage: "효과적인 프로모션 방법", time: "2일 전", unread: 0 }
];

const participants = [
  "피어몰매니저 (방장)",
  "QR마스터",
  "링크수집가",
  "디자인프로",
  "CS전문가",
  "모바일테스터",
  "통합마케터",
  "나"
];

const GroupChatPage: React.FC<GroupChatPageProps> = ({ type }) => {
  const [message, setMessage] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "나",
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    // Apply dark theme: main container
    <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Sidebar - Chat Rooms - Dark theme */}
        <div className="border-r border-gray-700 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-200">채팅방</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Dark theme input */}
          <Input placeholder="채팅방 검색..." className="h-8 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400" />
          
          <div className="space-y-1">
            {chatRooms.map(room => (
              <button
                key={room.id}
                className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                  room.isActive ? 'bg-blue-900/50 text-white' : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div>
                  <div className="font-medium text-sm">{room.name}</div>
                  <div className="text-xs text-gray-400 truncate">{room.lastMessage}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">{room.time}</span>
                  {room.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center leading-tight mt-1">
                      {room.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        
        {/* Main Chat Area */}
        <div className="md:col-span-3 flex flex-col h-[70vh]">
          {/* Chat Header - Dark theme */}
          <div className="border-b border-gray-700 p-4 flex justify-between items-center bg-gray-800">
            <div className="flex items-center">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100">피어몰 {type === 'text' ? '그룹 채팅' : type === 'voice' ? '음성 채팅' : '화상 채팅'}</h3>
                <p className="text-xs text-gray-400">{participants.length}명 참여 중</p>
              </div>
            </div>
            
            
            <div className="flex items-center space-x-2">
              {(type === 'voice' || type === 'video') && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 hover:bg-gray-700 ${isMuted ? 'bg-red-900/50 text-red-400 border-red-700 hover:bg-red-900' : ''}`}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                    {isMuted ? '음소거됨' : '음소거'}
                  </Button>
                </>
              )}
              
              
              {type === 'video' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 hover:bg-gray-700 ${isVideoOff ? 'bg-red-900/50 text-red-400 border-red-700 hover:bg-red-900' : ''}`}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff className="h-4 w-4 mr-1" /> : <Video className="h-4 w-4 mr-1" />}
                    {isVideoOff ? '비디오 끔' : '비디오'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-gray-600 text-gray-300 hover:bg-gray-700 ${isScreenSharing ? 'bg-green-900/50 text-green-400 border-green-700 hover:bg-green-900' : ''}`}
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <ScreenShare className="h-4 w-4 mr-1" />
                    {isScreenSharing ? '공유 중지' : '화면 공유'}
                  </Button>
                </>
              )}
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chat/Video Content - Dark theme */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
            {(type === 'voice' || type === 'video') ? (
              // Voice/Video Grid
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                {participants.slice(0, 6).map((participant, index) => (
                  <div key={index} className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video">
                    {type === 'video' && !isVideoOff && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-80 bg-gradient-to-b from-transparent to-black/40">
                        {index !== 7 ? (
                          <img 
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(participant.split(' ')[0])}&background=random`} 
                            alt={participant}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-700 flex items-center justify-center">
                            <span className="font-bold text-lg">나</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-xs">
                      {participant}
                      {isMuted && index === 7 && <MicOff className="inline h-3 w-3 ml-1" />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Text Messages - Dark theme
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isCurrentUser && (
                      <div className="mr-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          {msg.sender.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className={`max-w-[70%]`}>
                      {!msg.isCurrentUser && (
                        <div className="text-xs text-gray-400 ml-2 mb-1">{msg.sender}</div>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 inline-block ${
                          msg.isCurrentUser
                            ? 'bg-blue-600 text-white rounded-tr-none' // Current user bubble
                            : 'bg-gray-700 text-gray-200 rounded-tl-none' // Other user bubble
                        }`}
                      >
                        {msg.content}
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${msg.isCurrentUser ? 'text-right mr-1' : 'ml-2'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Message Input (Text Chat) - Dark theme */}
          {type === 'text' && (
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex items-center">
                <div className="flex space-x-1 mr-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-700">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="메시지 입력..."
                  className="flex-1 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                />
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 ml-2 text-blue-400 hover:bg-gray-700" 
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;
