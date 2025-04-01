
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useState } from 'react';

interface MyMall {
  id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
  date: string;
}

interface MyMallsTabProps {
  myMalls: MyMall[];
}

const ITEMS_PER_PAGE = 3;

const MyMallsTab: React.FC<MyMallsTabProps> = ({ myMalls }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(myMalls.length / ITEMS_PER_PAGE);
  
  // Get current items based on pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = myMalls.slice(indexOfFirstItem, indexOfLastItem);
  
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
      <div className="mb-6">
        <h2 className="text-xl font-bold">다른 사용자의 피어몰</h2>
        <p className="text-gray-600 mt-1">이 상품을 포함한 다른 사용자의 피어몰 목록입니다.</p>
      </div>
      
      {myMalls.length > 0 ? (
        <>
          <div className="space-y-4">
            {currentItems.map(mall => (
              <div key={mall.id} className="p-4 border rounded-lg flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={mall.userImageUrl} 
                    alt={mall.userName}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium">{mall.userName}님의 피어몰</h3>
                    <span className="text-sm text-gray-500 ml-2">{mall.date}</span>
                  </div>
                  <p className="text-gray-700">{mall.comment}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600 mt-1"
                    onClick={() => toast({
                      title: "피어몰 방문",
                      description: `${mall.userName}님의 피어몰로 이동합니다.`,
                    })}
                  >
                    피어몰 방문하기
                  </Button>
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
          <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 피어몰이 없습니다</h3>
          <p className="text-gray-500">아직 이 상품을 포함한 다른 사용자의 피어몰이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default MyMallsTab;
