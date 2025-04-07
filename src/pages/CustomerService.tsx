
import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Plus,
  MessageSquareReply,
  Trash2,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schema for inquiry form validation
const inquirySchema = z.object({
  title: z.string().min(2, { message: "제목은 2자 이상이어야 합니다." }),
  content: z.string().min(5, { message: "내용은 5자 이상이어야 합니다." })
});

// Define schema for reply form validation
const replySchema = z.object({
  content: z.string().min(2, { message: "내용은 2자 이상이어야 합니다." })
});

type InquiryFormValues = z.infer<typeof inquirySchema>;
type ReplyFormValues = z.infer<typeof replySchema>;

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  userId: string;
  userName: string;
}

interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  isExpanded: boolean;
  replies: Reply[];
}

const CustomerService = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null);
  const [currentInquiryId, setCurrentInquiryId] = useState<number | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { 
      id: 1, 
      title: '배송 관련 문의', 
      content: '주문한 상품이 아직 배송 중인데 언제 도착할까요?', 
      status: '답변완료', 
      createdAt: '2023-08-15', 
      isExpanded: false,
      replies: [
        {
          id: 1,
          content: '안녕하세요, 고객님! 문의 주셔서 감사합니다. 해당 상품은 현재 배송 중이며 추정 도착 시간은 내일 오전입니다. 배송 관련 문의는 언제든 고객센터로 연락 주세요.',
          createdAt: '2023-08-16',
          userId: 'admin',
          userName: '고객센터'
        }
      ]
    },
    { 
      id: 2, 
      title: '환불 요청', 
      content: '제품에 하자가 있어 환불을 원합니다.', 
      status: '접수됨', 
      createdAt: '2023-08-20', 
      isExpanded: false,
      replies: []
    }
  ]);

  // Form for new inquiry
  const inquiryForm = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  // Form for editing inquiry
  const editInquiryForm = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  // Form for reply
  const replyForm = useForm<ReplyFormValues>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: ''
    }
  });

  // Toggle inquiry expanded state
  const toggleInquiry = (id: number) => {
    setInquiries(inquiries.map(item => 
      item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
    ));
  };

  // Delete an inquiry
  const deleteInquiry = (id: number) => {
    setInquiries(inquiries.filter(item => item.id !== id));
    toast.success('문의가 삭제되었습니다.');
  };

  // Delete a reply
  const deleteReply = (inquiryId: number, replyId: number) => {
    setInquiries(inquiries.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          replies: inquiry.replies.filter(reply => reply.id !== replyId)
        };
      }
      return inquiry;
    }));
    toast.success('답글이 삭제되었습니다.');
  };

  // Handle submitting a new inquiry
  const submitInquiry = (data: InquiryFormValues) => {
    const newInquiry = {
      id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
      title: data.title,
      content: data.content,
      status: '접수됨',
      createdAt: new Date().toLocaleDateString('ko-KR'),
      isExpanded: false,
      replies: []
    };
    
    setInquiries([newInquiry, ...inquiries]);
    inquiryForm.reset();
    setIsDialogOpen(false);
    toast.success('문의가 성공적으로 접수되었습니다.');
  };

  // Open reply dialog
  const openReplyDialog = (inquiryId: number) => {
    setCurrentInquiryId(inquiryId);
    setIsReplyDialogOpen(true);
    replyForm.reset();
  };

  // Submit reply
  const submitReply = (data: ReplyFormValues) => {
    if (currentInquiryId) {
      setInquiries(inquiries.map(inquiry => {
        if (inquiry.id === currentInquiryId) {
          const newReply = {
            id: inquiry.replies.length > 0 ? Math.max(...inquiry.replies.map(r => r.id)) + 1 : 1,
            content: data.content,
            createdAt: new Date().toLocaleDateString('ko-KR'),
            userId: 'user',
            userName: '사용자'
          };
          
          return {
            ...inquiry,
            status: inquiry.status === '접수됨' ? '답변중' : inquiry.status,
            replies: [...inquiry.replies, newReply]
          };
        }
        return inquiry;
      }));
      
      replyForm.reset();
      setIsReplyDialogOpen(false);
      setCurrentInquiryId(null);
      toast.success('답글이 등록되었습니다.');
    }
  };

  // Open edit dialog
  const openEditDialog = (inquiry: Inquiry) => {
    setEditingInquiry(inquiry);
    editInquiryForm.setValue('title', inquiry.title);
    editInquiryForm.setValue('content', inquiry.content);
    setIsEditDialogOpen(true);
  };

  // Submit inquiry edit
  const submitInquiryEdit = (data: InquiryFormValues) => {
    if (editingInquiry) {
      setInquiries(inquiries.map(inquiry => {
        if (inquiry.id === editingInquiry.id) {
          return {
            ...inquiry,
            title: data.title,
            content: data.content
          };
        }
        return inquiry;
      }));
      
      editInquiryForm.reset();
      setIsEditDialogOpen(false);
      setEditingInquiry(null);
      toast.success('문의가 수정되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">고객센터</h1>
            <p className="text-muted-foreground mt-2 max-w-[600px]">
              질문이나 문제가 있으신가요? 문의를 남겨주시면 빠르게 답변해드리겠습니다.
            </p>
          </div>

          {/* Main Inquiry Board */}
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
                  <Form {...inquiryForm}>
                    <form onSubmit={inquiryForm.handleSubmit(submitInquiry)} className="space-y-4 py-4">
                      <FormField
                        control={inquiryForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>제목</FormLabel>
                            <FormControl>
                              <Input placeholder="문의 제목을 입력하세요" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={inquiryForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>내용</FormLabel>
                            <FormControl>
                              <Textarea placeholder="문의 내용을 자세히 입력해 주세요" rows={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>취소</Button>
                        <Button type="submit">문의 제출하기</Button>
                      </DialogFooter>
                    </form>
                  </Form>
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
                            className={inquiry.status === '답변완료' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : inquiry.status === '답변중' 
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                                : ''}
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      {inquiry.isExpanded && (
                        <CardContent className="border-t bg-muted/10 p-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium">문의내용:</div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                    onClick={() => openEditDialog(inquiry)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    수정
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => deleteInquiry(inquiry.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    삭제
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm p-3 bg-white rounded-md border">{inquiry.content}</div>
                            </div>
                            
                            {/* Replies Section */}
                            {inquiry.replies.length > 0 && (
                              <div className="border-t pt-4">
                                <h4 className="text-sm font-medium mb-3">답변:</h4>
                                <div className="space-y-3">
                                  {inquiry.replies.map((reply) => (
                                    <div key={reply.id} className="bg-white rounded-md border p-3">
                                      <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                          <Badge variant="outline" className={reply.userId === 'admin' 
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'bg-gray-50 text-gray-700'
                                          }>
                                            {reply.userName}
                                          </Badge>
                                          <span className="ml-2 text-xs text-gray-500">{reply.createdAt}</span>
                                        </div>
                                        {reply.userId !== 'admin' && (
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteReply(inquiry.id, reply.id);
                                            }}
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        )}
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Reply Button */}
                            <div className="flex justify-end pt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => openReplyDialog(inquiry.id)}
                                className="flex items-center border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <MessageSquareReply className="h-4 w-4 mr-1" />
                                답글 작성
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
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>답글 작성</DialogTitle>
            <DialogDescription>
              문의에 대한 답글을 작성해 주세요.
            </DialogDescription>
          </DialogHeader>
          <Form {...replyForm}>
            <form onSubmit={replyForm.handleSubmit(submitReply)} className="space-y-4 py-4">
              <FormField
                control={replyForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>답글 내용</FormLabel>
                    <FormControl>
                      <Textarea placeholder="답글 내용을 입력해 주세요" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsReplyDialogOpen(false)}>취소</Button>
                <Button type="submit">답글 등록</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Inquiry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문의 수정</DialogTitle>
            <DialogDescription>
              문의 내용을 수정해 주세요.
            </DialogDescription>
          </DialogHeader>
          <Form {...editInquiryForm}>
            <form onSubmit={editInquiryForm.handleSubmit(submitInquiryEdit)} className="space-y-4 py-4">
              <FormField
                control={editInquiryForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="문의 제목을 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editInquiryForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea placeholder="문의 내용을 자세히 입력해 주세요" rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>취소</Button>
                <Button type="submit">수정 완료</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerService;
