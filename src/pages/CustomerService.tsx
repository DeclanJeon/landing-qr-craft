
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  FileText, 
  Send, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const CustomerService = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', message: '안녕하세요! 무엇을 도와드릴까요?', timestamp: new Date().toISOString() }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');
  const [inquiries, setInquiries] = useState([
    { 
      id: 1, 
      title: '배송 관련 문의', 
      content: '주문한 상품이 아직 배송 중인데 언제 도착할까요?', 
      status: '답변완료', 
      createdAt: '2023-08-15', 
      isExpanded: false 
    },
    { 
      id: 2, 
      title: '환불 요청', 
      content: '제품에 하자가 있어 환불을 원합니다.', 
      status: '접수됨', 
      createdAt: '2023-08-20', 
      isExpanded: false 
    }
  ]);
  const [waitingTime, setWaitingTime] = useState({
    chat: '3분',
    voice: '5분',
    video: '10분'
  });

  // Handle sending a chat message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: currentMessage,
      timestamp: new Date().toISOString()
    };
    setChatMessages([...chatMessages, userMessage]);
    setCurrentMessage('');
    
    // Simulate agent response after delay
    setTimeout(() => {
      const agentMessage = {
        id: chatMessages.length + 2,
        sender: 'agent',
        message: '죄송합니다만, 현재 문의량이 많아 잠시 후에 상담사가 연결될 예정입니다. 조금만 기다려주시겠습니까?',
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  // Handle submitting a new inquiry
  const submitInquiry = () => {
    if (!inquiryTitle.trim() || !inquiryContent.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    const newInquiry = {
      id: inquiries.length + 1,
      title: inquiryTitle,
      content: inquiryContent,
      status: '접수됨',
      createdAt: new Date().toLocaleDateString('ko-KR'),
      isExpanded: false
    };
    
    setInquiries([newInquiry, ...inquiries]);
    setInquiryTitle('');
    setInquiryContent('');
    setIsDialogOpen(false);
    toast.success('문의가 성공적으로 접수되었습니다.');
  };

  // Toggle inquiry expanded state
  const toggleInquiry = (id) => {
    setInquiries(inquiries.map(item => 
      item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
    ));
  };

  // Delete an inquiry
  const deleteInquiry = (id) => {
    setInquiries(inquiries.filter(item => item.id !== id));
    toast.success('문의가 삭제되었습니다.');
  };

  // Handle service request
  const requestService = (type) => {
    toast.success(`${type} 상담이 요청되었습니다. 상담사가 곧 연결됩니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">고객센터</h1>
            <p className="text-muted-foreground mt-2 max-w-[600px]">
              질문이나 문제가 있으신가요? 다양한 채널로 도움을 드리겠습니다.
            </p>
          </div>

          {/* Current Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">채팅 상담</CardTitle>
                <CardDescription>현재 대기 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{waitingTime.chat}</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">운영 중</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">음성 상담</CardTitle>
                <CardDescription>현재 대기 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{waitingTime.voice}</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">운영 중</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">화상 상담</CardTitle>
                <CardDescription>현재 대기 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Video className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{waitingTime.video}</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">혼잡</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">채팅 상담</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">음성 상담</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">화상 상담</span>
              </TabsTrigger>
              <TabsTrigger value="inquiry" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">문의 게시판</span>
              </TabsTrigger>
            </TabsList>

            {/* 채팅 상담 탭 */}
            <TabsContent value="chat" className="space-y-4">
              <Card className="border">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-lg">실시간 채팅 상담</CardTitle>
                  <CardDescription>고객센터 운영 시간: 평일 09:00 - 18:00</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[400px] flex flex-col">
                    <ScrollArea className="flex-1 pr-4 mb-4">
                      <div className="space-y-4">
                        {chatMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`
                              max-w-[80%] rounded-lg p-3 
                              ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}
                            `}>
                              {msg.sender === 'agent' && (
                                <div className="flex items-center mb-1">
                                  <Avatar className="h-5 w-5 mr-2">
                                    <AvatarImage src="/placeholder.svg" alt="CS Agent" />
                                    <AvatarFallback>CS</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium">고객센터</span>
                                </div>
                              )}
                              <p>{msg.message}</p>
                              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <form onSubmit={sendMessage} className="flex items-center gap-2">
                      <Input 
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 음성 상담 탭 */}
            <TabsContent value="voice" className="space-y-4">
              <Card className="border">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-lg">1:1 음성 상담</CardTitle>
                  <CardDescription>고객센터 운영 시간: 평일 09:00 - 18:00</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-12 space-y-6">
                    <div className="inline-flex items-center justify-center p-6 bg-blue-50 text-blue-600 rounded-full mb-4">
                      <Phone className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-medium">실시간 음성 상담 연결</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      음성 상담을 통해 더 자세한 설명이 필요하신가요? 아래 버튼을 클릭하여 전문 상담사와 음성으로 연결하세요.
                    </p>
                    <p className="text-sm text-blue-600 font-medium">현재 예상 대기 시간: {waitingTime.voice}</p>
                    <Button 
                      size="lg" 
                      onClick={() => requestService('음성')}
                      className="px-8"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      음성 상담 연결하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 화상 상담 탭 */}
            <TabsContent value="video" className="space-y-4">
              <Card className="border">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-lg">1:1 화상 상담</CardTitle>
                  <CardDescription>고객센터 운영 시간: 평일 09:00 - 18:00</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-12 space-y-6">
                    <div className="inline-flex items-center justify-center p-6 bg-blue-50 text-blue-600 rounded-full mb-4">
                      <Video className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-medium">실시간 화상 상담 연결</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      화면을 통해 더 상세한 상담이 필요하신가요? 아래 버튼을 클릭하여 전문 상담사와 화상으로 연결하세요.
                    </p>
                    <p className="text-sm text-yellow-600 font-medium">현재 예상 대기 시간: {waitingTime.video}</p>
                    <Button 
                      size="lg" 
                      onClick={() => requestService('화상')}
                      className="px-8"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      화상 상담 연결하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 문의 게시판 탭 */}
            <TabsContent value="inquiry" className="space-y-4">
              <Card className="border">
                <CardHeader className="bg-muted/50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">문의 게시판</CardTitle>
                    <CardDescription>질문을 남기면 24시간 내에 답변해 드립니다</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">문의하기</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>새 문의 작성</DialogTitle>
                        <DialogDescription>
                          문의 내용을 작성해 주세요. 담당자가 확인 후 답변드리겠습니다.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm font-medium">제목</label>
                          <Input 
                            id="title"
                            value={inquiryTitle}
                            onChange={(e) => setInquiryTitle(e.target.value)}
                            placeholder="문의 제목을 입력하세요"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="content" className="text-sm font-medium">내용</label>
                          <Textarea 
                            id="content"
                            value={inquiryContent}
                            onChange={(e) => setInquiryContent(e.target.value)}
                            placeholder="문의 내용을 자세히 입력해 주세요"
                            rows={6}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                        <Button onClick={submitInquiry}>문의 제출하기</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {inquiries.length > 0 ? (
                      inquiries.map((inquiry) => (
                        <Card key={inquiry.id} className="overflow-hidden">
                          <CardHeader 
                            className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => toggleInquiry(inquiry.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <CardTitle className="text-base">{inquiry.title}</CardTitle>
                                <CardDescription className="text-xs">
                                  {inquiry.createdAt}
                                </CardDescription>
                              </div>
                              <Badge 
                                variant={inquiry.status === '답변완료' ? 'default' : 'outline'}
                                className={inquiry.status === '답변완료' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                              >
                                {inquiry.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          {inquiry.isExpanded && (
                            <CardContent className="border-t bg-muted/10 p-4">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="text-sm font-medium">문의내용:</div>
                                  <div className="text-sm">{inquiry.content}</div>
                                </div>
                                {inquiry.status === '답변완료' && (
                                  <div className="space-y-2 pt-4 border-t">
                                    <div className="text-sm font-medium text-green-700">답변:</div>
                                    <div className="text-sm">
                                      안녕하세요, 고객님! 문의 주셔서 감사합니다. 해당 상품은 현재 배송 중이며 
                                      추정 도착 시간은 내일 오전입니다. 배송 관련 문의는 언제든 고객센터로 연락 주세요.
                                    </div>
                                  </div>
                                )}
                                <div className="flex justify-end pt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => deleteInquiry(inquiry.id)}
                                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                  >
                                    삭제
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-3" />
                        <h3 className="text-lg font-medium text-muted-foreground">문의 내역이 없습니다</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          첫 번째 문의를 작성해 보세요.
                        </p>
                        <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          문의하기
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">자주 묻는 질문</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">배송은 얼마나 걸리나요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    일반 배송은 2-3일, 익일 배송은 다음날까지 배송됩니다.
                    자세한 배송 정보는 주문 상세에서 확인하실 수 있습니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">환불 정책은 어떻게 되나요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    제품 수령 후 7일 이내에 환불 신청이 가능합니다.
                    단, 제품의 훼손이 없어야 하며 원래 포장 상태여야 합니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">멤버십 혜택은 무엇인가요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    멤버십 회원은 구매 시 5% 할인과 무료 배송 혜택을 받으실 수 있습니다.
                    또한 신제품 출시 정보를 가장 먼저 받아보실 수 있습니다.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">해외 배송도 가능한가요?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    네, 해외 배송 가능합니다. 국가별로 배송비와 기간이 다를 수 있으니
                    주문 시 배송 정보를 확인해 주시기 바랍니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
