
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const handleAddReviewLink = async () => {
    if (!newReviewLink.trim()) return;
    
    try {
      setIsLinkProcessing(true);
      setLinkError(null);
      await onAddLink(newReviewLink);
      setNewReviewLink('');
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
        }
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>리뷰 링크 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            외부 사이트의 리뷰 링크를 추가하세요. 링크를 등록하면 자동으로 제목과 이미지 정보가 추출됩니다.
          </p>
          <div className="space-y-2">
            <Input 
              placeholder="https://example.com/review" 
              value={newReviewLink}
              onChange={(e) => {
                setNewReviewLink(e.target.value);
                setLinkError(null);
              }}
              className={linkError ? "border-red-500" : ""}
            />
            {linkError && <p className="text-sm text-red-500">{linkError}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              if (!isLinkProcessing) {
                onOpenChange(false);
                setLinkError(null);
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
