
import React, { useState } from 'react';
import { Loader2, Link as LinkIcon } from 'lucide-react';
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

interface AddReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: string) => Promise<void>;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({
  isOpen,
  onOpenChange,
  onAddLink
}) => {
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
        setPreviewData({
          title: "리뷰 제목 (서버에서 실제 제목이 추출됩니다)",
          imageUrl: "https://placehold.co/200x150",
          author: "작성자 (실제 추출됩니다)",
          source: formattedSource,
          date: new Date().toISOString().split('T')[0]
        });
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!isLinkProcessing) {
        onOpenChange(open);
        if (!open) {
          setNewReviewLink('');
          setLinkError(null);
          setPreviewData(null);
        }
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>리뷰 링크 추가</DialogTitle>
          <DialogDescription>
            외부 사이트의 리뷰 링크를 추가하세요. 링크를 등록하면 자동으로 제목과 이미지 정보가 추출됩니다.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
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
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              if (!isLinkProcessing) {
                onOpenChange(false);
                setLinkError(null);
                setPreviewData(null);
              }
            }}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewDialog;
