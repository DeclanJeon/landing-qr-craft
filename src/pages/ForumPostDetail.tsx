import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { ForumPost } from '@/components/community/ForumPage'; // Import the interface
import PostFormModal from '@/components/community/PostFormModal'; // Import the modal
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; 

// Define the expected URL parameters
interface ForumPostDetailParams extends Record<string, string | undefined> {
  shopUrl?: string;
  postId: string;
}

const ForumPostDetail = () => {
  // Extract both shopUrl and postId
  const { shopUrl, postId } = useParams<ForumPostDetailParams>(); 
  const navigate = useNavigate();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  // Load posts from Local Storage and find the specific post
  // Load posts from Local Storage and find the specific post
  useEffect(() => {
    const storedPosts = localStorage.getItem('peermallForumPosts');
    // Ensure postId is valid before parsing and searching
    if (storedPosts && postId && !isNaN(parseInt(postId, 10))) { 
      try {
        const posts: ForumPost[] = JSON.parse(storedPosts);
        const foundPost = posts.find(p => p.id === parseInt(postId, 10));
        setPost(foundPost || null);
      } catch (e) {
        console.error("Error parsing posts from localStorage:", e);
        setPost(null);
      }
    }
  }, [postId]);

  const handleSavePost = (postData: Omit<ForumPost, 'id' | 'date' | 'replies' | 'views' | 'isNew' | 'isPopular'> & { id?: number; content?: string }) => {
    const storedPosts = localStorage.getItem('peermallForumPosts');
    let posts: ForumPost[] = [];
    if (storedPosts) {
      try {
        posts = JSON.parse(storedPosts);
      } catch (e) {
        console.error("Error parsing posts from localStorage:", e);
      }
    }

    const now = new Date().toISOString().split('T')[0]; 
    let updatedPosts: ForumPost[];

    if (postData.id) { // Editing existing post
      updatedPosts = posts.map(p => 
        p.id === postData.id 
          ? { ...p, ...postData, date: now, content: postData.content || '' } 
          : p
      );
      // Update the post state for the detail view immediately
      setPost(updatedPosts.find(p => p.id === postData.id) || null);
    } else {
      // This case shouldn't happen from the detail page, but handle defensively
      console.error("Attempted to save a new post from detail view");
      return; 
    }

    localStorage.setItem('peermallForumPosts', JSON.stringify(updatedPosts));
    setIsModalOpen(false); 
  };

  const handleDeleteClick = () => {
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (!post) return;

    const storedPosts = localStorage.getItem('peermallForumPosts');
    let posts: ForumPost[] = [];
    if (storedPosts) {
      try {
        posts = JSON.parse(storedPosts);
      } catch (e) {
        console.error("Error parsing posts from localStorage:", e);
        navigate('/community'); // Navigate away if error
        return;
      }
    }

    const updatedPosts = posts.filter(p => p.id !== post.id);
    localStorage.setItem('peermallForumPosts', JSON.stringify(updatedPosts));
    setIsAlertOpen(false);
    // Navigate back to the correct community page
    navigate(shopUrl ? `/shop/${shopUrl}/community` : '/community'); 
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16 text-center text-gray-400">
        게시글을 찾을 수 없습니다.
        <Link to="/community" className="block mt-4 text-blue-400 hover:underline">
          포럼으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16 text-gray-300">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Update back button navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(shopUrl ? `/shop/${shopUrl}/community` : '/community')} 
          className="mb-6 text-gray-400 hover:text-white hover:bg-gray-700/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {shopUrl ? '샵 커뮤니티로 돌아가기' : '포럼으로 돌아가기'}
        </Button>

        <article className="bg-gray-800/50 p-6 md:p-8 rounded-lg border border-gray-700">
          <header className="mb-6 pb-4 border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>작성자: {post.author}</span>
              <span>작성일: {post.date}</span>
            </div>
            <div className="mt-4 flex space-x-2">
               <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700" onClick={() => setIsModalOpen(true)}>
                 <Edit className="mr-1 h-4 w-4" /> 수정
               </Button>
               <Button variant="destructive" size="sm" onClick={handleDeleteClick}>
                 <Trash2 className="mr-1 h-4 w-4" /> 삭제
               </Button>
            </div>
          </header>
          {/* Render HTML content safely */}
          <div 
            className="prose prose-invert prose-sm md:prose-base max-w-none ql-editor-content" 
            dangerouslySetInnerHTML={{ __html: post.content || '' }} 
          />
        </article>
      </div>

      {/* Re-use the same modal for editing */}
      <PostFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePost}
        initialData={post} // Pass current post data for editing
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">게시글 삭제 확인</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-gray-300 border-gray-600 hover:bg-gray-700">취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ForumPostDetail;
