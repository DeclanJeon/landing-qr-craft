
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Plus, Search, MoreVertical, Store, Calendar, Eye, Pencil, Trash2, 
  ChevronLeft, ChevronRight, Info 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data for peermalls
interface Peermall {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  url: string;
  status: 'active' | 'inactive' | 'pending';
}

const PeermallManagementTab = () => {
  const navigate = useNavigate();
  const [peermalls, setPeermalls] = useState<Peermall[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [peermallToDelete, setPeermallToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Generate or fetch peermall data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Get from localStorage or generate mock data if none exists
      const savedPeermalls = localStorage.getItem('peermall-user-malls');
      if (savedPeermalls) {
        setPeermalls(JSON.parse(savedPeermalls));
      } else {
        const mockData: Peermall[] = [
          {
            id: '1',
            name: '패션 소품 피어몰',
            type: '패션',
            createdAt: '2024-03-15',
            url: 'fashion-items',
            status: 'active'
          },
          {
            id: '2',
            name: '디지털 액세서리 몰',
            type: '전자제품',
            createdAt: '2024-03-20',
            url: 'digital-accessories',
            status: 'active'
          },
          {
            id: '3',
            name: '홈인테리어 피어몰',
            type: '홈&리빙',
            createdAt: '2024-03-25',
            url: 'home-interior',
            status: 'pending'
          }
        ];
        setPeermalls(mockData);
        localStorage.setItem('peermall-user-malls', JSON.stringify(mockData));
      }
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filter peermalls based on search query
  const filteredPeermalls = searchQuery 
    ? peermalls.filter(mall => 
        mall.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mall.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : peermalls;
    
  // Paginate results
  const paginatedPeermalls = filteredPeermalls.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredPeermalls.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle view peermall
  const handleViewPeermall = (url: string) => {
    // Navigate to the peermall
    navigate(`/shop/${url}/home`);
  };
  
  // Handle edit peermall
  const handleEditPeermall = (id: string) => {
    // Navigate to edit page or open modal
    toast({
      title: "피어몰 수정",
      description: "피어몰 수정 페이지로 이동합니다.",
    });
    navigate(`/personal-lounge?edit=${id}`);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = (id: string) => {
    setPeermallToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  // Handle actual deletion
  const deletePeermall = () => {
    if (!peermallToDelete) return;
    
    const updatedPeermalls = peermalls.filter(mall => mall.id !== peermallToDelete);
    setPeermalls(updatedPeermalls);
    localStorage.setItem('peermall-user-malls', JSON.stringify(updatedPeermalls));
    
    toast({
      title: "피어몰이 삭제되었습니다",
      description: "선택한 피어몰이 성공적으로 삭제되었습니다.",
    });
    
    setDeleteDialogOpen(false);
    setPeermallToDelete(null);
  };
  
  // Handle create new peermall
  const handleCreatePeermall = () => {
    navigate('/personal-lounge');
  };
  
  const getStatusBadge = (status: 'active' | 'inactive' | 'pending') => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">활성화</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-900/30 text-gray-400 text-xs rounded-full">비활성화</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded-full">검토중</span>;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-white">내 피어몰 관리</h2>
          <Button 
            onClick={handleCreatePeermall}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> 새 피어몰 만들기
          </Button>
        </div>
        
        <Card className="bg-gray-850 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="text"
                placeholder="피어몰 이름 또는 유형으로 검색..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        {isLoading ? (
          <div className="bg-gray-850 border-gray-700 rounded-md p-8 text-center">
            <div className="h-24 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">피어몰 정보를 불러오는 중입니다...</p>
            </div>
          </div>
        ) : peermalls.length === 0 ? (
          <div className="bg-gray-850 border-gray-700 rounded-md p-8 text-center">
            <Store className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">등록된 피어몰이 없습니다</h3>
            <p className="text-gray-400 mb-6">새로운 피어몰을 만들어 시작하세요!</p>
            <Button onClick={handleCreatePeermall}>
              <Plus className="h-4 w-4 mr-2" /> 새 피어몰 만들기
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-gray-850 border-gray-700 rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700">
                    <TableHead className="text-gray-300">피어몰 이름</TableHead>
                    <TableHead className="text-gray-300">유형</TableHead>
                    <TableHead className="text-gray-300">상태</TableHead>
                    <TableHead className="text-gray-300 hidden md:table-cell">생성일</TableHead>
                    <TableHead className="text-gray-300 w-[100px]">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPeermalls.length > 0 ? (
                    paginatedPeermalls.map((mall) => (
                      <TableRow key={mall.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="font-medium text-gray-200">{mall.name}</TableCell>
                        <TableCell className="text-gray-300">{mall.type}</TableCell>
                        <TableCell>{getStatusBadge(mall.status)}</TableCell>
                        <TableCell className="text-gray-400 hidden md:table-cell">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {mall.createdAt}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-800 border border-gray-700 text-gray-200">
                              <DropdownMenuItem 
                                onClick={() => handleViewPeermall(mall.url)}
                                className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                              >
                                <Eye className="mr-2 h-4 w-4" /> 보기
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEditPeermall(mall.id)}
                                className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                              >
                                <Pencil className="mr-2 h-4 w-4" /> 수정
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteConfirm(mall.id)}
                                className="text-red-400 hover:text-red-300 focus:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> 삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                        <Info className="mx-auto h-8 w-8 mb-2" />
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
                <div>
                  총 {filteredPeermalls.length}개 중 {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredPeermalls.length)}개 표시
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-gray-700"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={`h-8 w-8 ${
                        currentPage === i + 1 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'border-gray-700 text-gray-400'
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 border-gray-700"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">피어몰을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              이 작업은 되돌릴 수 없으며, 피어몰과 관련된 모든 데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-gray-300 border-none">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              onClick={deletePeermall}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PeermallManagementTab;
