
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare, Users, ArrowUpRight } from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: number;
  views: number;
  isNew?: boolean;
  isPopular?: boolean;
}

const samplePosts: ForumPost[] = [
  { 
    id: 1, 
    title: "피어몰 시작하는 방법 - 초보자 가이드", 
    author: "피어몰매니저", 
    date: "2023-06-15", 
    replies: 24, 
    views: 1250,
    isPopular: true
  },
  { 
    id: 2, 
    title: "QR 코드 활용 사례 공유합니다", 
    author: "QR마스터", 
    date: "2023-06-18", 
    replies: 18, 
    views: 876,
    isPopular: true
  },
  { 
    id: 3, 
    title: "외부 링크 통합 방법 질문", 
    author: "링크수집가", 
    date: "2023-06-20", 
    replies: 7, 
    views: 342
  },
  { 
    id: 4, 
    title: "추천 상품 등록시 이미지 오류", 
    author: "이미지트러블", 
    date: "2023-06-21", 
    replies: 12, 
    views: 567
  },
  { 
    id: 5, 
    title: "피어몰 디자인 커스터마이징 팁", 
    author: "디자인프로", 
    date: "2023-06-22", 
    replies: 15, 
    views: 789,
    isNew: true
  },
  { 
    id: 6, 
    title: "고객 상담 효율적으로 하는 방법", 
    author: "CS전문가", 
    date: "2023-06-22", 
    replies: 9, 
    views: 432,
    isNew: true
  },
  { 
    id: 7, 
    title: "외부 쇼핑몰과 연동하기", 
    author: "통합마케터", 
    date: "2023-06-23", 
    replies: 6, 
    views: 321,
    isNew: true
  },
  { 
    id: 8, 
    title: "모바일에서 QR 스캔 안되는 문제", 
    author: "모바일테스터", 
    date: "2023-06-23", 
    replies: 11, 
    views: 543,
    isNew: true
  }
];

const ForumCategories = [
  { id: 'all', name: '전체 게시글' },
  { id: 'notice', name: '공지사항' },
  { id: 'guide', name: '이용가이드' },
  { id: 'qna', name: '질문과 답변' },
  { id: 'share', name: '정보 공유' },
  { id: 'feedback', name: '피드백' }
];

const ForumPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">커뮤니티 포럼</h2>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          새 글 작성하기
        </Button>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ForumCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Forum Posts */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left font-medium text-sm text-gray-500">제목</th>
              <th className="py-3 text-center font-medium text-sm text-gray-500 w-24">작성자</th>
              <th className="py-3 text-center font-medium text-sm text-gray-500 w-28">작성일</th>
              <th className="py-3 text-center font-medium text-sm text-gray-500 w-20">답변</th>
              <th className="py-3 text-center font-medium text-sm text-gray-500 w-20">조회</th>
            </tr>
          </thead>
          <tbody>
            {samplePosts.map((post) => (
              <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4">
                  <div className="flex items-start">
                    <div>
                      <a href="#" className="font-medium text-gray-900 hover:text-blue-600 flex items-center">
                        {post.title}
                        {post.isNew && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">NEW</span>
                        )}
                        {post.isPopular && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">인기</span>
                        )}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-center text-sm text-gray-600">{post.author}</td>
                <td className="py-4 text-center text-sm text-gray-600">{post.date}</td>
                <td className="py-4 text-center text-sm text-gray-600">{post.replies}</td>
                <td className="py-4 text-center text-sm text-gray-600">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <nav className="flex items-center space-x-1">
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="m15 18-6-6 6-6"/></svg>
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-blue-50 text-blue-600 border-blue-200">1</Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">2</Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="m9 18 6-6-6-6"/></svg>
          </Button>
        </nav>
      </div>
      
      {/* Popular Topics */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          인기 토픽
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {samplePosts.filter(post => post.isPopular).map(post => (
            <a key={post.id} href="#" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.author} • {post.date} • 답변 {post.replies}개
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Active Users */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          활발한 사용자
        </h3>
        <div className="flex flex-wrap gap-3">
          {['피어몰매니저', 'QR마스터', '링크수집가', '디자인프로', 'CS전문가'].map((user, index) => (
            <a key={index} href="#" className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm hover:bg-gray-200 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-2">
                {user.charAt(0)}
              </div>
              {user}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
