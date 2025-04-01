
import React, { useState } from 'react';
import { Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ManualReviewData {
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

interface AddReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: string) => Promise<void>;
  onAddManualReview: (review: ManualReviewData) => Promise<void>;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요" }),
  author: z.string().min(1, { message: "작성자를 입력해주세요" }),
  source: z.string().min(1, { message: "출처를 입력해주세요" }),
  imageUrl: z.string().url({ message: "유효한 이미지 URL을 입력해주세요" }).or(z.string().length(0)),
  linkUrl: z.string().url({ message: "유효한 URL을 입력해주세요" }).or(z.string().length(0)),
  date: z.string().min(1, { message: "날짜를 입력해주세요" })
});

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({
  isOpen,
  onOpenChange,
  onAddLink,
  onAddManualReview
}) => {
  const [activeTab, setActiveTab] = useState<string>("auto");
  const [newReviewLink, setNewReviewLink] = useState('');
  const [isLinkProcessing, setIsLinkProcessing] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<{
    title: string;
    imageUrl: string;
    author: string;
    source: string;
    date: string;
  } | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      source: "",
      imageUrl: "",
      linkUrl: "",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const handlePreviewLink = async () => {
    if (!newReviewLink.trim()) return;
    
    try {
      setIsPreviewLoading(true);
      setLinkError(null);
      setPreviewData(null);
      
      const url = new URL(newReviewLink);
      const domain = url.hostname.replace('www.', '');
      const sourceName = domain.split('.')[0];
      const formattedSource = sourceName.charAt(0).toUpperCase() + sourceName.slice(1);
      
      // Simulate metadata extraction
      setTimeout(() => {
        const mockPreviewData = {
          title: "리뷰 제목 (서버에서 실제 제목이 추출됩니다)",
          imageUrl: "https://placehold.co/200x150",
          author: "작성자 (실제 추출됩니다)",
          source: formattedSource,
          date: new Date().toISOString().split('T')[0]
        };
        
        // Customize based on domain
        if (url.hostname.includes('youtube') || url.hostname.includes('youtu.be')) {
          mockPreviewData.title = "유튜브 리뷰 영상";
          mockPreviewData.author = "유튜브 채널";
          mockPreviewData.imageUrl = "https://placehold.co/200x150/FF0000/FFFFFF?text=YouTube";
        } else if (url.hostname.includes('instagram')) {
          mockPreviewData.title = "인스타그램 포스트";
          mockPreviewData.author = "인스타그램 사용자";
          mockPreviewData.imageUrl = "https://placehold.co/200x150/E1306C/FFFFFF?text=Instagram";
        } else if (url.hostname.includes('blog')) {
          mockPreviewData.title = "블로그 리뷰 포스트";
          mockPreviewData.author = "블로그 작성자";
          mockPreviewData.imageUrl = "https://placehold.co/200x150/FF9800/FFFFFF?text=Blog";
        }
        
        setPreviewData(mockPreviewData);
        setIsPreviewLoading(false);
      }, 1000);
      
    } catch (error) {
      setLinkError("유효한 URL을 입력해주세요");
      setIsPreviewLoading(false);
    }
  };

  const handleAddReviewLink = async () => {
    if (!newReviewLink.trim()) return;
    
    try {
      setIsLinkProcessing(true);
      setLinkError(null);
      await onAddLink(newReviewLink);
      setNewReviewLink('');
      setPreviewData(null);
      onOpenChange(false);
    } catch (error) {
      setLinkError("링크 처리 중 오류가 발생했습니다");
      console.error("Error processing link:", error);
    } finally {
      setIsLinkProcessing(false);
    }
  };

  const handleAddManualReview = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLinkProcessing(true);
      
      // Ensure all required fields are present for ManualReviewData
      const reviewData: ManualReviewData = {
        title: data.title,
        author: data.author,
        source: data.source,
        imageUrl: data.imageUrl || "https://placehold.co/200x150",
        linkUrl: data.linkUrl || "",
        date: data.date
      };
      
      await onAddManualReview(reviewData);
      form.reset();
      setImagePreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding manual review:", error);
    } finally {
      setIsLinkProcessing(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue("imageUrl", url);
    
    if (url && url.match(/^(https?:\/\/)/)) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isLinkProcessing) {
        onOpenChange(open);
        if (!open) {
          setNewReviewLink('');
          setLinkError(null);
          setPreviewData(null);
          setImagePreview(null);
          form.reset();
          setActiveTab("auto");
        }
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>리뷰 추가</DialogTitle>
          <DialogDescription>
            자동으로 리뷰 정보를 추출하거나 수동으로 리뷰 정보를 직접 입력할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="auto">자동 추출</TabsTrigger>
            <TabsTrigger value="manual">수동 입력</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto" className="space-y-4">
            <div className="flex space-x-2">
              <Input 
                placeholder="https://example.com/review" 
                value={newReviewLink}
                onChange={(e) => {
                  setNewReviewLink(e.target.value);
                  setLinkError(null);
                }}
                className={linkError ? "border-red-500" : ""}
              />
              <Button 
                type="button" 
                variant="secondary"
                onClick={handlePreviewLink}
                disabled={isPreviewLoading || !newReviewLink.trim()}
              >
                {isPreviewLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "미리보기"}
              </Button>
            </div>
            
            {linkError && <p className="text-sm text-red-500">{linkError}</p>}
            
            {isPreviewLoading && (
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex gap-4">
                  <Skeleton className="h-[100px] w-[120px] rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            )}
            
            {previewData && !isPreviewLoading && (
              <div className="border rounded-md p-4">
                <div className="flex gap-4">
                  <img 
                    src={previewData.imageUrl} 
                    alt={previewData.title}
                    className="h-[100px] w-[120px] rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{previewData.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{previewData.author}</span>
                      <span className="mx-1">•</span>
                      <span>{previewData.source}</span>
                      <span className="mx-1">•</span>
                      <span>{previewData.date}</span>
                    </div>
                    <div className="flex items-center mt-3 text-sm text-blue-600">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      <span className="truncate max-w-[200px]">{newReviewLink}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500 flex items-start">
              <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2 flex-shrink-0">
                <LinkIcon className="h-3 w-3" />
              </div>
              <p>링크를 추가하면 자동으로 제목, 작성자, 날짜, 이미지 등의 정보가 추출됩니다. 네이버 블로그, 유튜브, 인스타그램 등 주요 사이트의 링크를 지원합니다.</p>
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isLinkProcessing}
              >
                취소
              </Button>
              <Button 
                onClick={handleAddReviewLink} 
                disabled={isLinkProcessing || !newReviewLink.trim()}
              >
                {isLinkProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    처리 중...
                  </>
                ) : "추가"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="manual">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddManualReview)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input placeholder="리뷰 제목" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>작성자</FormLabel>
                        <FormControl>
                          <Input placeholder="작성자 이름" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>출처</FormLabel>
                        <FormControl>
                          <Input placeholder="블로그, 유튜브 등" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이미지 URL</FormLabel>
                      <FormControl>
                        <div className="flex space-x-2">
                          <Input 
                            placeholder="https://example.com/image.jpg" 
                            {...field}
                            onChange={handleImageUrlChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {imagePreview && (
                        <div className="mt-2 border rounded p-2 bg-gray-50">
                          <p className="text-xs mb-1 text-gray-500">이미지 미리보기:</p>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-[100px] w-auto object-cover rounded"
                            onError={() => setImagePreview(null)}
                          />
                        </div>
                      )}
                      {!imagePreview && (
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          <span>이미지 URL을 입력하면 미리보기가 표시됩니다</span>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>원문 링크 URL (선택사항)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/review" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>작성일</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="mt-6">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    disabled={isLinkProcessing}
                  >
                    취소
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isLinkProcessing}
                  >
                    {isLinkProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        처리 중...
                      </>
                    ) : "추가"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewDialog;
