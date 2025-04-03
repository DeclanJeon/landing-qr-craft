import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Label } from "@/components/ui/label";
import { ForumPost } from './ForumPage'; 

// Define modules and formats for the editor outside the component
const quillModules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'], // Consider adding image/video handlers if needed
    ['clean']
  ],
  // Add clipboard module if needed for pasting HTML: clipboard: { matchVisual: false }
};

const quillFormats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (postData: Omit<ForumPost, 'id' | 'date' | 'replies' | 'views' | 'isNew' | 'isPopular'> & { id?: number }) => void;
  initialData?: ForumPost | null; 
}

const PostFormModal: React.FC<PostFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const author = "나"; // Assuming author is fixed

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content || ''); 
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData, isOpen]); 

  const handleSave = () => {
    // Basic validation for Quill content (might be HTML string)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    if (!title.trim() || !textContent.trim()) { 
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    
    const postData = {
      id: initialData?.id, 
      title,
      content, // Save the HTML content from Quill
      author,
    };
    onSave(postData);
    onClose(); 
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Increased max-width for editor */}
      <DialogContent className="sm:max-w-2xl bg-gray-800 border-gray-700 text-gray-200"> 
        <DialogHeader>
          <DialogTitle className="text-white">{initialData ? '게시글 수정' : '새 게시글 작성'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right text-gray-300">
              제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="게시글 제목"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2 text-gray-300">
              내용
            </Label>
            {/* Use ReactQuill */}
            <div className="col-span-3 quill-dark-container rounded-md overflow-hidden border border-gray-600"> 
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                className="bg-white text-gray-900" // Editor content area background/text
                modules={quillModules} 
                formats={quillFormats} 
                placeholder="게시글 내용을 입력하세요..."
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">
              취소
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            {initialData ? '수정하기' : '저장하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormModal;
