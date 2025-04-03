import React, { useState, useMemo, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; // Import Link
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, MessageSquare, Users, ArrowUpRight, 
  Edit, Trash2 // Import icons for edit/delete
} from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import PostFormModal from './PostFormModal'; // Import the modal
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Import Alert Dialog for delete confirmation

// Export the interface and add content field
export interface ForumPost { 
  id: number;
  title: string;
  content?: string; // Add content field
  author: string;
  date: string; // Keep date for display, will be updated on edit/create
  replies: number; // Keep for display, maybe manage separately later
  views: number; // Keep for display, maybe manage separately later
  isNew?: boolean; // Keep for display logic
  isPopular?: boolean; // Keep for display logic
}

// Initial data (can be fetched from an API later)
const initialSamplePosts: ForumPost[] = [
  { 
    id: 1, 
    title: "피어몰 시작하는 방법 - 초보자 가이드", 
    content: "이 가이드에서는 피어몰을 처음 사용하는 분들을 위한 기본 단계를 안내합니다...",
    author: "피어몰매니저", 
    date: "2023-06-15", 
    replies: 24, 
    views: 1250,
    isPopular: true
  },
  { 
    id: 2, 
    title: "QR 코드 활용 사례 공유합니다", 
    content: "다양한 QR 코드 활용 사례와 팁을 공유합니다.",
    author: "QR마스터", 
    date: "2023-06-18", 
    replies: 18, 
    views: 876,
    isPopular: true
  },
  // Add content to other sample posts if desired
  { id: 3, title: "외부 링크 통합 방법 질문", content: "외부 링크 통합 시...", author: "링크수집가", date: "2023-06-20", replies: 7, views: 342 },
  { id: 4, title: "추천 상품 등록시 이미지 오류", content: "이미지 업로드 중 오류가...", author: "이미지트러블", date: "2023-06-21", replies: 12, views: 567 },
  { id: 5, title: "피어몰 디자인 커스터마이징 팁", content: "디자인 팁 공유...", author: "디자인프로", date: "2023-06-22", replies: 15, views: 789, isNew: true },
  { id: 6, title: "고객 상담 효율적으로 하는 방법", content: "CS 효율화 방안...", author: "CS전문가", date: "2023-06-22", replies: 9, views: 432, isNew: true },
  { id: 7, title: "외부 쇼핑몰과 연동하기", content: "API 연동 관련...", author: "통합마케터", date: "2023-06-23", replies: 6, views: 321, isNew: true },
  { id: 8, title: "모바일에서 QR 스캔 안되는 문제", content: "모바일 스캔 문제 해결...", author: "모바일테스터", date: "2023-06-23", replies: 11, views: 543, isNew: true }
];

const ForumCategories = [
  { id: 'all', name: '전체 게시글' },
  { id: 'notice', name: '공지사항' },
  { id: 'guide', name: '이용가이드' },
  { id: 'qna', name: '질문과 답변' },
  { id: 'share', name: '정보 공유' },
  { id: 'feedback', name: '피드백' }
];

// Define props interface
interface ForumPageProps {
  shopUrl?: string; // Make shopUrl optional
}

const ForumPage: React.FC<ForumPageProps> = ({ shopUrl }) => { // Accept shopUrl prop
  const [posts, setPosts] = useState<ForumPost[]>(initialSamplePosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<ForumPost | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const postsPerPage = 5;

  // --- Load posts from Local Storage on mount ---
  useEffect(() => {
    const storedPosts = localStorage.getItem('peermallForumPosts');
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (e) {
        console.error("Error parsing posts from localStorage:", e);
        // Optionally clear corrupted data or use initialSamplePosts
        localStorage.removeItem('peermallForumPosts');
        setPosts(initialSamplePosts); 
      }
    } else {
      // Initialize with sample data if nothing in storage
      setPosts(initialSamplePosts);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- Save posts to Local Storage whenever posts state changes ---
  useEffect(() => {
    // Don't save the initial sample data immediately on first render
    if (posts !== initialSamplePosts) { 
      localStorage.setItem('peermallForumPosts', JSON.stringify(posts));
    }
  }, [posts]); // Run whenever the posts array changes

  // --- CRUD Handlers ---
  const handleCreateClick = () => {
    setEditingPost(null); // Ensure we are creating, not editing
    setIsModalOpen(true);
  };

  const handleEditClick = (post: ForumPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete !== null) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
    }
    setIsAlertOpen(false);
    setPostToDelete(null);
  };

  const handleSavePost = (postData: Omit<ForumPost, 'id' | 'date' | 'replies' | 'views' | 'isNew' | 'isPopular'> & { id?: number; content?: string }) => {
    const now = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    if (postData.id) {
      // Update existing post
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postData.id 
            ? { ...post, ...postData, date: now } 
            : post
        )
      );
    } else {
      // Create new post
      const newPost: ForumPost = {
        ...postData,
        id: Date.now(), // Simple ID generation, replace with better method if needed
        date: now,
        replies: 0, // Default values for new posts
        views: 0,
        content: postData.content || '', // Ensure content is included
      };
      setPosts(prevPosts => [newPost, ...prevPosts]); // Add new post to the beginning
    }
    setIsModalOpen(false); // Close modal after save
  };

  // --- Pagination Logic ---
  const filteredPosts = useMemo(() => {
    // Add filtering logic here if needed based on selectedCategory
    // For now, just return all posts
    return posts;
  }, [posts, selectedCategory]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset to page 1 if current page becomes invalid after deletion/filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="text-gray-300 bg-gray-800/30 p-6 rounded-lg border border-gray-700"> 
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">커뮤니티 포럼</h2> 
        <Button onClick={handleCreateClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"> 
          <PlusCircle className="h-4 w-4" />
          새 글 작성하기
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {ForumCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${ 
              selectedCategory === category.id
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white' 
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-left font-medium text-sm text-gray-400 px-2">제목</th>
              <th className="py-3 text-center font-medium text-sm text-gray-400 w-24 px-2">작성자</th>
              <th className="py-3 text-center font-medium text-sm text-gray-400 w-28 px-2">작성일</th>
              <th className="py-3 text-center font-medium text-sm text-gray-400 w-20 px-2">답변</th>
              <th className="py-3 text-center font-medium text-sm text-gray-400 w-20 px-2">조회</th>
              <th className="py-3 text-center font-medium text-sm text-gray-400 w-24 px-2">관리</th> 
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-4 px-2"> 
                  <div className="flex items-start">
                    <div>
                      {/* Link title to detail page, conditionally using shopUrl */}
                      <Link 
                        to={shopUrl ? `/shop/${shopUrl}/community/post/${post.id}` : `/community/post/${post.id}`} 
                        className="font-medium text-gray-200 hover:text-blue-400 flex items-center"
                      >
                        {post.title}
                        {post.isNew && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-900 text-blue-300 rounded">NEW</span>
                        )}
                        {post.isPopular && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-amber-900 text-amber-300 rounded">인기</span>
                        )}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center text-sm text-gray-400 px-2">{post.author}</td>
                <td className="py-4 text-center text-sm text-gray-400 px-2">{post.date}</td>
                <td className="py-4 text-center text-sm text-gray-400 px-2">{post.replies}</td>
                <td className="py-4 text-center text-sm text-gray-400 px-2">{post.views}</td>
                <td className="py-4 text-center text-sm text-gray-400 px-2">
                  <div className="flex justify-center items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-blue-400 hover:bg-gray-600" onClick={() => handleEditClick(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-gray-600" onClick={() => handleDeleteClick(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPosts.length > postsPerPage && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent className="text-gray-300">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} hover:bg-gray-700 hover:text-white border border-gray-700 rounded-md`}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`hover:bg-gray-700 hover:text-white border rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : 'text-gray-300 border-gray-700'}`}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} hover:bg-gray-700 hover:text-white border border-gray-700 rounded-md`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Modal for Creating/Editing Posts */}
      <PostFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePost}
        initialData={editingPost} 
      />

      {/* Alert Dialog for Delete Confirmation */}
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

      {/* Popular Topics & Active Users sections remain unchanged for now */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
          인기 토픽
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.filter(post => post.isPopular).map(post => ( // Use posts state here
            <a key={post.id} href="#" className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition-colors block">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-200">{post.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {post.author} • {post.date} • 답변 {post.replies}개
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-500 flex-shrink-0 ml-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
          <Users className="h-5 w-5 mr-2 text-blue-400" />
          활발한 사용자
        </h3>
        <div className="flex flex-wrap gap-3">
          {['피어몰매니저', 'QR마스터', '링크수집가', '디자인프로', 'CS전문가'].map((user, index) => (
            <a key={index} href="#" className="flex items-center bg-gray-700/50 rounded-full px-3 py-1.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-2 flex-shrink-0">
                {user.charAt(0)}
              </div>
              <span className="truncate">{user}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
