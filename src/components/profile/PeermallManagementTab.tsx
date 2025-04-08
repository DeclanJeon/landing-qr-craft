
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Plus, Search, MoreVertical, Store, Calendar, Eye, Pencil, Trash2, 
  ChevronLeft, ChevronRight, Info, LayoutGrid, LayoutList
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
import { ShopData } from '@/types/shop'; // Import ShopData type

// Updated Peermall interface to better match ShopData
interface Peermall {
  id: string; // Use shopUrl as ID
  name: string;
  type: string; // Use category
  createdAt: string; // Need to find or default this
  url: string; // shopUrl
  status: 'active' | 'inactive' | 'pending'; // Need to determine this, default to active
}

// Define view types
type ViewMode = 'board' | 'blog';

const PeermallManagementTab = () => {
  const navigate = useNavigate();
  const [peermalls, setPeermalls] = useState<Peermall[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [peermallToDelete, setPeermallToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const itemsPerPage = 5;
  
  // Fetch user's peermalls from localStorage
  useEffect(() => {
    setIsLoading(true);
    const currentUserNickname = localStorage.getItem('peermall-user-nickname');
    const userPeermalls: Peermall[] = [];

    if (currentUserNickname) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('peermallShopData_')) {
          try {
            const shopDataString = localStorage.getItem(key);
            if (shopDataString) {
              const shopData: ShopData = JSON.parse(shopDataString);
              // Compare ownerName with current user's nickname
              if (shopData.ownerName === currentUserNickname) {
                userPeermalls.push({
                  id: shopData.shopUrl, // Use shopUrl as unique ID
                  name: shopData.shopName,
                  type: shopData.category || '미분류', // Use category or default
                  // TODO: Find a way to get creation date, using placeholder for now
                  createdAt: '날짜 정보 없음', 
                  url: shopData.shopUrl,
                  // TODO: Determine status logic, defaulting to active
                  status: 'active', 
                });
              }
            }
          } catch (error) {
            console.error(`Error parsing localStorage item ${key}:`, error);
          }
        }
      }
    }
    
    setPeermalls(userPeermalls);
    setIsLoading(false);
    
    // Note: We are not saving this filtered list back to 'peermall-user-malls' anymore.
    // Deletion logic needs to remove the original 'peermallShopData_{shopUrl}' item.

  }, []); // Run only once on mount

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
  
  // Handle edit peermall - navigate to the specific shop admin page
  const handleEditPeermall = (shopUrl: string) => {
    toast({
      title: "피어몰 관리",
      description: "피어몰 관리 페이지로 이동합니다.",
    });
    navigate(`/shop/${shopUrl}/admin`); // Navigate to the admin page using shopUrl
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = (id: string) => {
    setPeermallToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  // Handle actual deletion - remove the item from localStorage
  const deletePeermall = () => {
    if (!peermallToDelete) return; // peermallToDelete now holds the shopUrl (ID)
    
    const keyToDelete = `peermallShopData_${peermallToDelete}`;
    localStorage.removeItem(keyToDelete);
    
    // Update the state to reflect the deletion
    const updatedPeermalls = peermalls.filter(mall => mall.id !== peermallToDelete);
    setPeermalls(updatedPeermalls);
    
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
  
  // Toggle view mode
  const toggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1); // Reset to first page when changing views
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

  // Render blog view (card layout)
  const renderBlogView = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPeermalls.length > 0 ? (
          paginatedPeermalls.map((mall) => (
            <motion.div
              key={mall.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-850 border-gray-700 h-full flex flex-col hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div 
                    className="h-36 bg-gray-800 relative"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/400x200/?${mall.type.toLowerCase()})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
                    <div className="absolute bottom-3 left-4">
                      {getStatusBadge(mall.status)}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2">{mall.name}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {mall.createdAt}
                    </div>
                    <p className="text-gray-400 text-sm">유형: {mall.type}</p>
                  </div>
                </CardContent>
                
                <CardFooter className="px-5 py-4 border-t border-gray-700 mt-auto flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 px-2" 
                    onClick={() => handleViewPeermall(mall.url)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> 보기
                  </Button>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 px-2" 
                      onClick={() => handleEditPeermall(mall.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-2" 
                      onClick={() => handleDeleteConfirm(mall.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <Card className="bg-gray-850 border-gray-700 p-8 text-center w-full max-w-md">
              <Info className="mx-auto h-8 w-8 text-gray-500 mb-2" />
              <p className="text-gray-400">검색 결과가 없습니다.</p>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Render board view (table layout)
  const renderBoardView = () => {
    return (
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
    );
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
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <div className="relative flex-grow w-full">
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
              
              {/* View toggle buttons */}
              <div className="flex border border-gray-700 rounded-md">
                <Button 
                  variant={viewMode === 'board' ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === 'board' 
                    ? "rounded-r-none bg-blue-600 hover:bg-blue-700 border-r border-gray-700" 
                    : "rounded-r-none text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                  }
                  onClick={() => toggleViewMode('board')}
                >
                  <LayoutList className="h-4 w-4 mr-2" />
                  게시판 형식
                </Button>
                <Button 
                  variant={viewMode === 'blog' ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === 'blog' 
                    ? "rounded-l-none bg-blue-600 hover:bg-blue-700" 
                    : "rounded-l-none text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                  }
                  onClick={() => toggleViewMode('blog')}
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  블로그 형식
                </Button>
              </div>
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
            {viewMode === 'board' ? renderBoardView() : renderBlogView()}
            
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
