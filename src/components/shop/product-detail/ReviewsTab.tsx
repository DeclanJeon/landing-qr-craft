
import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

interface ReviewsTabProps {
  reviews: Review[];
  handleDeleteReview: (reviewId: string) => void;
  setIsAddingReview: (isAdding: boolean) => void;
}

const ITEMS_PER_PAGE = 3;

const ReviewsTab: React.FC<ReviewsTabProps> = ({ 
  reviews, 
  handleDeleteReview,
  setIsAddingReview 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  
  // Get current reviews based on pagination
  const indexOfLastReview = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">리뷰 모음</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={() => setIsAddingReview(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>리뷰 추가</span>
        </Button>
      </div>
      
      {reviews.length > 0 ? (
        <>
          <div className="space-y-4">
            {currentReviews.map(review => (
              <div key={review.id} className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr]">
                  <div className="bg-gray-100 h-[150px] relative">
                    <img 
                      src={review.imageUrl} 
                      alt={review.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/200x150";
                      }}
                    />
                  </div>
                  <div className="p-4 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg mb-1 line-clamp-2">{review.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {review.author} • {review.source} • {review.date}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 h-8 w-8"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-auto">
                      {review.linkUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center mt-2"
                          onClick={() => window.open(review.linkUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          원문 보기
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {pageNumbers.map(number => (
                  <PaginationItem key={number}>
                    <PaginationLink 
                      isActive={currentPage === number}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 리뷰가 없습니다</h3>
          <p className="text-gray-500 mb-4">첫 번째 리뷰를 추가해보세요.</p>
          <Button onClick={() => setIsAddingReview(true)} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            리뷰 추가하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
