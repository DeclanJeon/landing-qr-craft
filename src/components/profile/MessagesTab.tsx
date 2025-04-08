
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Mail, Send, Trash2, CheckCircle, Circle, RefreshCw, ChevronLeft, ChevronRight, Info, ListFilter, X, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Define message types
interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
}

const MessagesTab = () => {
  // States
  const [activeTab, setActiveTab] = useState("inbox");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterReadStatus, setFilterReadStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const itemsPerPage = 5;
  
  // Generate mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const userEmail = localStorage.getItem('peermall-user-email') || 'user@example.com';
      
      // Get from localStorage or generate mock data if none exists
      const savedMessages = localStorage.getItem('peermall-user-messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        const mockData: Message[] = [
          {
            id: '1',
            sender: 'admin@peermall.com',
            recipient: userEmail,
            subject: '피어몰 생성 안내',
            content: '안녕하세요! Peermall에 가입해주셔서 감사합니다. 이제 자신만의 피어몰을 생성하고 관리할 수 있습니다. 궁금한 점이 있으시면 언제든지 문의해주세요.',
            timestamp: '2024-04-05 14:30',
            isRead: false,
            isStarred: true
          },
          {
            id: '2',
            sender: 'support@peermall.com',
            recipient: userEmail,
            subject: '계정 인증 완료',
            content: '회원님의 계정 인증이 성공적으로 완료되었습니다. 이제 Peermall의 모든 기능을 사용하실 수 있습니다.',
            timestamp: '2024-04-03 09:15',
            isRead: true,
            isStarred: false
          },
          {
            id: '3',
            sender: 'notifications@peermall.com',
            recipient: userEmail,
            subject: '4월 이벤트 안내',
            content: '4월 한 달간 새로운 피어몰을 생성하시면 특별 혜택을 드립니다! 지금 바로 확인하세요.',
            timestamp: '2024-04-01 11:20',
            isRead: true,
            isStarred: false
          },
          {
            id: '4',
            sender: userEmail,
            recipient: 'partner@peermall.com',
            subject: '제휴 문의',
            content: '안녕하세요, 피어몰 서비스 제휴와 관련하여 문의드립니다. 제안서를 첨부하였으니 검토 부탁드립니다.',
            timestamp: '2024-04-04 16:45',
            isRead: true,
            isStarred: false
          },
          {
            id: '5',
            sender: userEmail,
            recipient: 'support@peermall.com',
            subject: '기능 관련 문의',
            content: '안녕하세요, QR코드 생성 기능 사용 중 오류가 발생했습니다. 확인 부탁드립니다.',
            timestamp: '2024-03-28 13:10',
            isRead: true,
            isStarred: true
          }
        ];
        setMessages(mockData);
        localStorage.setItem('peermall-user-messages', JSON.stringify(mockData));
      }
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Handle viewing message details
  const handleViewMessage = (message: Message) => {
    // Mark as read if not already
    if (!message.isRead && activeTab === "inbox") {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? { ...m, isRead: true } : m
      );
      setMessages(updatedMessages);
      localStorage.setItem('peermall-user-messages', JSON.stringify(updatedMessages));
    }
    
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };
  
  // Handle marking as read/unread
  const handleToggleReadStatus = (message: Message, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedMessages = messages.map(m => 
      m.id === message.id ? { ...m, isRead: !m.isRead } : m
    );
    setMessages(updatedMessages);
    localStorage.setItem('peermall-user-messages', JSON.stringify(updatedMessages));
    
    toast({
      title: message.isRead ? "읽지 않음으로 표시됨" : "읽음으로 표시됨",
    });
  };
  
  // Handle starring/unstarring
  const handleToggleStarred = (message: Message, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedMessages = messages.map(m => 
      m.id === message.id ? { ...m, isStarred: !m.isStarred } : m
    );
    setMessages(updatedMessages);
    localStorage.setItem('peermall-user-messages', JSON.stringify(updatedMessages));
  };
  
  // Handle deletion
  const handleDelete = (messageId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    const updatedMessages = messages.filter(m => m.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('peermall-user-messages', JSON.stringify(updatedMessages));
    
    toast({
      title: "메시지가 삭제되었습니다",
    });
  };
  
  // Handle sending new message
  const handleSendMessage = () => {
    if (!subject.trim() || !recipient.trim() || !content.trim()) {
      toast({
        title: "모든 필드를 입력해주세요",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      const userEmail = localStorage.getItem('peermall-user-email') || 'user@example.com';
      
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: userEmail,
        recipient: recipient,
        subject: subject,
        content: content,
        timestamp: new Date().toLocaleString('ko-KR'),
        isRead: true,
        isStarred: false
      };
      
      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('peermall-user-messages', JSON.stringify(updatedMessages));
      
      setIsSending(false);
      setIsComposeModalOpen(false);
      setSubject('');
      setRecipient('');
      setContent('');
      
      toast({
        title: "메시지가 전송되었습니다",
        description: recipient + "에게 메시지를 보냈습니다."
      });
      
      // Switch to sent tab to show the message
      setActiveTab("sent");
    }, 1000);
  };
  
  // Filter messages based on tab, search query, and filters
  const filteredMessages = messages.filter(message => {
    // First filter by tab
    if (activeTab === "inbox" && message.recipient !== localStorage.getItem('peermall-user-email')) return false;
    if (activeTab === "sent" && message.sender !== localStorage.getItem('peermall-user-email')) return false;
    
    // Then filter by read status if needed
    if (filterReadStatus === 'read' && !message.isRead) return false;
    if (filterReadStatus === 'unread' && message.isRead) return false;
    
    // Then by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.subject.toLowerCase().includes(query) ||
        message.content.toLowerCase().includes(query) ||
        message.sender.toLowerCase().includes(query) ||
        message.recipient.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort messages by timestamp (newest first)
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
  
  // Paginate results
  const paginatedMessages = sortedMessages.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(sortedMessages.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Format message timestamp to readable format
  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today, show time only
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '어제';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      // Show full date
      return date.toLocaleDateString('ko-KR');
    }
  };
  
  // Count unread messages
  const unreadCount = messages.filter(m => 
    !m.isRead && m.recipient === localStorage.getItem('peermall-user-email')
  ).length;
  
  // Reset filters
  const resetFilters = () => {
    setFilterReadStatus('all');
    setSearchQuery('');
    setShowFilters(false);
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-white">쪽지함</h2>
            <Button 
              onClick={() => setIsComposeModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="h-4 w-4 mr-2" /> 새 쪽지 작성
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
              <TabsList className="bg-gray-800 border border-gray-700">
                <TabsTrigger 
                  value="inbox" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Mail className="h-4 w-4 mr-2" /> 
                  받은 쪽지함 
                  {unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="sent" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Send className="h-4 w-4 mr-2" /> 보낸 쪽지함
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input 
                    type="text"
                    placeholder="검색..."
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full sm:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-gray-700 text-gray-400 hover:text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <Card className="bg-gray-850 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-200">필터</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <span className="text-xs font-medium text-gray-400">읽음 상태</span>
                      <div className="flex mt-1 space-x-2">
                        <Button 
                          variant={filterReadStatus === 'all' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterReadStatus('all')}
                          className={filterReadStatus === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700'}
                        >
                          전체
                        </Button>
                        <Button 
                          variant={filterReadStatus === 'read' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterReadStatus('read')}
                          className={filterReadStatus === 'read' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700'}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" /> 읽음
                        </Button>
                        <Button 
                          variant={filterReadStatus === 'unread' ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterReadStatus('unread')}
                          className={filterReadStatus === 'unread' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700'}
                        >
                          <Circle className="h-3 w-3 mr-1" /> 읽지 않음
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={resetFilters}
                        className="text-gray-400 hover:text-white"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" /> 필터 초기화
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <TabsContent value="inbox" className="mt-0">
              {renderMessageList("inbox")}
            </TabsContent>
            
            <TabsContent value="sent" className="mt-0">
              {renderMessageList("sent")}
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      
      {/* Message Detail Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-800 text-gray-200 border-gray-700">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white text-xl">{selectedMessage.subject}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {activeTab === "inbox" ? (
                    <>보낸 사람: <span className="text-blue-400">{selectedMessage.sender}</span></>
                  ) : (
                    <>받는 사람: <span className="text-blue-400">{selectedMessage.recipient}</span></>
                  )}
                  <span className="block text-gray-500 text-sm mt-1">{selectedMessage.timestamp}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-4 border-t border-b border-gray-700 py-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedMessage.content}</p>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                {activeTab === "inbox" && (
                  <Button
                    onClick={() => {
                      setIsComposeModalOpen(true);
                      setIsMessageModalOpen(false);
                      setRecipient(selectedMessage.sender);
                      setSubject(`Re: ${selectedMessage.subject}`);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" /> 답장하기
                  </Button>
                )}
                <Button 
                  variant="destructive"
                  onClick={(e) => {
                    handleDelete(selectedMessage.id, e);
                    setIsMessageModalOpen(false);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> 삭제하기
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Compose Message Modal */}
      <Dialog open={isComposeModalOpen} onOpenChange={setIsComposeModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-800 text-gray-200 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">새 쪽지 작성</DialogTitle>
            <DialogDescription className="text-gray-400">
              새로운 쪽지를 작성하여 보내세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-gray-300">받는 사람</Label>
              <Input
                id="recipient"
                placeholder="수신자 이메일을 입력하세요"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={isSending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-300">제목</Label>
              <Input
                id="subject"
                placeholder="제목을 입력하세요"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={isSending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-300">내용</Label>
              <Textarea
                id="content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                disabled={isSending}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsComposeModalOpen(false)}
              className="border-gray-600 text-gray-300"
              disabled={isSending}
            >
              취소
            </Button>
            <Button 
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSending}
            >
              {isSending ? (
                <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 전송 중...</>
              ) : (
                <>쪽지 보내기 <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
  function renderMessageList(type: 'inbox' | 'sent') {
    return isLoading ? (
      <div className="bg-gray-850 border-gray-700 rounded-md p-8 text-center">
        <div className="h-24 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">쪽지를 불러오는 중입니다...</p>
        </div>
      </div>
    ) : sortedMessages.length === 0 ? (
      <div className="bg-gray-850 border-gray-700 rounded-md p-8 text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-200 mb-1">쪽지가 없습니다</h3>
        <p className="text-gray-400 mb-6">
          {type === 'inbox' ? '아직 받은 쪽지가 없습니다.' : '아직 보낸 쪽지가 없습니다.'}
        </p>
        {type === 'inbox' && searchQuery && (
          <Button onClick={() => setSearchQuery("")} variant="outline" className="border-gray-700">
            <RefreshCw className="h-4 w-4 mr-2" /> 검색 초기화
          </Button>
        )}
        {type === 'sent' && (
          <Button onClick={() => setIsComposeModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" /> 새 쪽지 작성
          </Button>
        )}
      </div>
    ) : (
      <>
        <div className="divide-y divide-gray-700 bg-gray-850 border-gray-700 rounded-md overflow-hidden">
          {paginatedMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleViewMessage(message)}
              className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors flex items-start gap-3 ${
                type === 'inbox' && !message.isRead ? 'bg-gray-800/50' : ''
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 rounded-full ${
                    message.isStarred ? 'text-amber-400 hover:text-amber-500' : 'text-gray-500 hover:text-amber-400'
                  }`}
                  onClick={(e) => handleToggleStarred(message, e)}
                >
                  {message.isStarred ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  )}
                </Button>
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium truncate ${type === 'inbox' && !message.isRead ? 'text-white' : 'text-gray-300'}`}>
                    {type === 'inbox' ? message.sender : message.recipient}
                  </h4>
                  <span className="text-gray-500 text-xs ml-2 flex-shrink-0">
                    {formatMessageDate(message.timestamp)}
                  </span>
                </div>
                
                <h3 className={`text-base truncate ${type === 'inbox' && !message.isRead ? 'font-semibold text-white' : 'font-medium text-gray-400'}`}>
                  {message.subject}
                </h3>
                
                <p className="text-gray-500 text-sm truncate">
                  {message.content.substring(0, 80)}
                  {message.content.length > 80 ? '...' : ''}
                </p>
              </div>
              
              <div className="flex flex-col gap-1">
                {type === 'inbox' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 rounded-full ${message.isRead ? 'text-gray-500' : 'text-blue-400'}`}
                    onClick={(e) => handleToggleReadStatus(message, e)}
                    title={message.isRead ? "읽지 않음으로 표시" : "읽음으로 표시"}
                  >
                    {message.isRead ? <Circle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-gray-500 hover:text-red-400"
                  onClick={(e) => handleDelete(message.id, e)}
                  title="삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
            
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
            <div>
              총 {sortedMessages.length}개 중 {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, sortedMessages.length)}개 표시
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-gray-700"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {totalPages <= 5 ? (
                // Show all pages if 5 or fewer
                [...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={`h-8 w-8 ${
                      currentPage === i + 1 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-gray-700 text-gray-400'
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))
              ) : (
                // Show limited pages with ellipsis for more than 5 pages
                <>
                  {[...Array(Math.min(3, currentPage))].map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={`h-8 w-8 ${
                        currentPage === i + 1 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-gray-700 text-gray-400'
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
                  
                  {currentPage > 3 && currentPage < totalPages - 2 && (
                    <Button
                      size="sm"
                      variant="default"
                      className="h-8 w-8 bg-blue-600 hover:bg-blue-700"
                    >
                      {currentPage}
                    </Button>
                  )}
                  
                  {currentPage < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}
                  
                  {totalPages > 1 && (
                    <Button
                      size="sm"
                      variant={currentPage === totalPages ? "default" : "outline"}
                      className={`h-8 w-8 ${
                        currentPage === totalPages 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-gray-700 text-gray-400'
                      }`}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  )}
                </>
              )}
              
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-gray-700"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default MessagesTab;
