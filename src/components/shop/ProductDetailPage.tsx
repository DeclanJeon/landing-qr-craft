import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Heart,
  Share,
  ShieldCheck,
  Shield,
  Truck,
  FileText,
  MessageSquare,
  Phone,
  Video,
  Monitor,
  Users,
  Link,
  Plus,
  Trash2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Review interface
interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

// MyMall interface
interface MyMall {
  id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
  date: string;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<{name: string, rating: number, price: string}[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myMalls, setMyMalls] = useState<MyMall[]>([]);
  const [newReviewLink, setNewReviewLink] = useState('');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [activeTab, setActiveTab] = useState('product-info');
  const [isLinkProcessing, setIsLinkProcessing] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = () => {
      setIsLoading(true);
      
      const storedProducts = localStorage.getItem('peermall-products');
      const localProducts = storedProducts ? JSON.parse(storedProducts) : [];
      
      import('@/constants/sampleData').then(({ sampleProducts }) => {
        const allProducts = [...localProducts];
        
        const foundProduct = allProducts.find(p => p.id.toString() === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          const related = allProducts
            .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
          
          const mockVendors = [
            { name: '공식 스토어', rating: 4.9, price: foundProduct.price },
            { name: '프리미엄 리셀러', rating: 4.7, price: `${parseInt(foundProduct.price.replace(/[^\d]/g, '')) * 1.05}원` },
            { name: '인증 파트너샵', rating: 4.5, price: `${parseInt(foundProduct.price.replace(/[^\d]/g, '')) * 0.95}원` }
          ];
          setVendors(mockVendors);
          
          loadReviews(foundProduct.id);
          loadMyMalls(foundProduct.id);
        }
        
        setIsLoading(false);
      });
    };
    
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const loadReviews = (productId: number) => {
    const storedReviews = localStorage.getItem(`peermall-reviews-${productId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      const mockReviews: Review[] = [
        {
          id: "1",
          title: "상품 사용 후기: 기대 이상입니다!",
          author: "테크리뷰어",
          source: "블로그",
          imageUrl: "https://placehold.co/200x150",
          linkUrl: "https://example.com/review1",
          date: "2023-10-15"
        },
        {
          id: "2",
          title: "1개월 사용 후 정직한 리뷰",
          author: "일상리뷰",
          source: "유튜브",
          imageUrl: "https://placehold.co/200x150",
          linkUrl: "https://example.com/review2",
          date: "2023-09-20"
        }
      ];
      setReviews(mockReviews);
      localStorage.setItem(`peermall-reviews-${productId}`, JSON.stringify(mockReviews));
    }
  };

  const loadMyMalls = (productId: number) => {
    const storedMyMalls = localStorage.getItem(`peermall-mymalls-${productId}`);
    if (storedMyMalls) {
      setMyMalls(JSON.parse(storedMyMalls));
    } else {
      const mockMyMalls: MyMall[] = [
        {
          id: "1",
          userName: "김민수",
          userImageUrl: "https://placehold.co/40",
          comment: "이 상품 강력 추천합니다!",
          date: "2023-10-16"
        },
        {
          id: "2",
          userName: "이지은",
          userImageUrl: "https://placehold.co/40",
          comment: "저도 사용중인데 만족스러워요",
          date: "2023-10-10"
        }
      ];
      setMyMalls(mockMyMalls);
      localStorage.setItem(`peermall-mymalls-${productId}`, JSON.stringify(mockMyMalls));
    }
  };

  const handleAddReviewLink = async () => {
    if (!newReviewLink.trim() || !product) return;
    
    try {
      setIsLinkProcessing(true);
      setLinkError(null);

      const domain = new URL(newReviewLink).hostname;
      const sourceName = domain.replace('www.', '').split('.')[0];
      const formattedSource = sourceName.charAt(0).toUpperCase() + sourceName.slice(1);
      
      let newReview: Review = {
        id: Date.now().toString(),
        title: `리뷰 ${reviews.length + 1}`,
        author: "불명",
        source: formattedSource,
        imageUrl: "https://placehold.co/200x150",
        linkUrl: newReviewLink,
        date: new Date().toISOString().split('T')[0]
      };

      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${newReviewLink}`);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const metaTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                          doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
                          doc.querySelector('title')?.textContent;
        
        if (metaTitle) {
          newReview.title = metaTitle;
        }
        
        const metaImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                         doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
        
        if (metaImage) {
          if (metaImage.startsWith('/')) {
            const url = new URL(newReviewLink);
            newReview.imageUrl = `${url.origin}${metaImage}`;
          } else if (metaImage.startsWith('http')) {
            newReview.imageUrl = metaImage;
          }
        }
        
        const metaAuthor = doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
                          doc.querySelector('meta[property="article:author"]')?.getAttribute('content');
        
        if (metaAuthor) {
          newReview.author = metaAuthor;
        }
      } catch (error) {
        console.error("Error extracting metadata:", error);
        setLinkError("유효한 URL을 입력해주세요");
      }
      
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem(`peermall-reviews-${product.id}`, JSON.stringify(updatedReviews));
      
      setNewReviewLink('');
      setIsAddingReview(false);
      
      toast({
        title: "리뷰 링크가 추가되었습니다",
        description: "제품 상세 페이지에 리뷰 링크가 성공적으로 추가되었습니다.",
      });
    } catch (error) {
      console.error("Error adding review link:", error);
      setLinkError("유효한 URL을 입력해주세요");
    } finally {
      setIsLinkProcessing(false);
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!product) return;
    
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem(`peermall-reviews-${product.id}`, JSON.stringify(updatedReviews));
    
    toast({
      title: "리뷰 링크가 삭제되었습니다",
      description: "제품 상세 페이지에서 리뷰 링크가 성공적으로 삭제되었습니다.",
    });
  };

  const handleBuyNow = () => {
    if (product?.externalUrl) {
      window.open(product.externalUrl, '_blank');
      toast({
        title: "외부 사이트로 이동합니다",
        description: "판매자의 사이트에서 구매를 완료해주세요.",
      });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "상품이 장바구니에 추가되었습니다",
        description: `${product.name}이(가) 관심목록에 추가되었습니다.`,
      });
    }
  };

  const handleConsultChat = () => {
    toast({
      title: "채팅 상담 시작",
      description: "상담원과의 채팅이 곧 연결됩니다.",
    });
  };

  const handleConsultVoice = () => {
    toast({
      title: "음성 상담 연결",
      description: "음성 상담이 연결 중입니다. 잠시만 기다려주세요.",
    });
  };

  const handleConsultVideo = () => {
    toast({
      title: "화상 상담 연결",
      description: "화상 상담이 연결 중입니다. 잠시만 기다려주세요.",
    });
  };

  const handleMeeting = () => {
    toast({
      title: "화상 미팅 예약",
      description: "화면 공유 및 화이트보드 기능이 포함된 화상 미팅을 예약합니다.",
    });
  };

  const handleAuthenticity = () => {
    toast({
      title: "진품 인증 정보",
      description: "이 제품은 공식 인증기관을 통해 진품 확인이 가능합니다.",
    });
  };

  const handleOwnership = () => {
    toast({
      title: "소유권 인증 정보",
      description: "블록체인 기반 소유권 증명 서비스를 제공합니다.",
    });
  };

  const handleShipping = () => {
    toast({
      title: "배송 정보",
      description: "주문 후 1-3일 이내 출고되며, 택배사에 따라 배송일이 달라질 수 있습니다.",
    });
  };

  const handleProductInfo = () => {
    toast({
      title: "제품 정보",
      description: "상세 제품정보 및 사양을 확인하실 수 있습니다.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">상품을 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-6">요청하신 상품 정보가 존재하지 않거나 삭제되었습니다.</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        돌아가기
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full rounded-md object-contain"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <Heart className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white">
              <Share className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">{product.price}</p>
          
          {(product.distributor || product.manufacturer) && (
            <div className="mb-6 space-y-2">
              {product.distributor && (
                <div className="flex items-center text-sm text-gray-600">
                  <span>유통사: {product.distributor}</span>
                </div>
              )}
              {product.manufacturer && (
                <div className="flex items-center text-sm text-gray-600">
                  <span>제조사: {product.manufacturer}</span>
                </div>
              )}
            </div>
          )}
          
          {product.description && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">상품 설명</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
          
          <div className="flex flex-col space-y-4 mb-8">
            <Button className="w-full" size="lg" onClick={handleBuyNow}>
              바로 구매하기
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleAddToCart}>
              장바구니에 담기
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  고객센터
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={handleConsultChat}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  채팅 상담
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleConsultVoice}>
                  <Phone className="mr-2 h-4 w-4" />
                  음성 상담
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleConsultVideo}>
                  <Video className="mr-2 h-4 w-4" />
                  화상 상담
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
            <Button variant="outline" onClick={handleAuthenticity} className="flex items-center justify-start">
              <ShieldCheck className="h-4 w-4 mr-2" />
              진품 인증
            </Button>
            <Button variant="outline" onClick={handleOwnership} className="flex items-center justify-start">
              <Shield className="h-4 w-4 mr-2" />
              소유권 인증
            </Button>
            <Button variant="outline" onClick={handleShipping} className="flex items-center justify-start">
              <Truck className="h-4 w-4 mr-2" />
              배송 정보
            </Button>
            <Button variant="outline" onClick={handleProductInfo} className="flex items-center justify-start">
              <FileText className="h-4 w-4 mr-2" />
              제품 정보
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
            <p>이 상품은 외부 판매자의 상품입니다. 구매 시 판매자의 웹사이트로 이동합니다.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 border-t pt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="product-info">상품 정보</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 모음</TabsTrigger>
            <TabsTrigger value="my-malls">다른 사용자의 마이몰</TabsTrigger>
          </TabsList>
          
          <TabsContent value="product-info">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">판매처 목록</h2>
              <div className="space-y-3">
                {vendors.map((vendor, index) => (
                  <div key={index} className="p-4 border rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{vendor.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-1">{vendor.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{vendor.price}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        방문하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">상품 상세 정보</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">제품명</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">제조사</TableCell>
                    <TableCell>{product.manufacturer || '-'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">유통사</TableCell>
                    <TableCell>{product.distributor || '-'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">가격</TableCell>
                    <TableCell>{product.price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">리뷰 모음</h2>
              <Dialog open={isAddingReview} onOpenChange={setIsAddingReview}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    <span>리뷰 링크 추가</span>
                  </Button>
                </DialogTrigger>
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
                    <Button variant="outline" onClick={() => {
                      setIsAddingReview(false);
                      setLinkError(null);
                    }}>취소</Button>
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
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr]">
                      <div className="bg-gray-100 h-[150px]">
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center mt-2"
                            onClick={() => window.open(review.linkUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            원문 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 리뷰가 없습니다</h3>
                <p className="text-gray-500 mb-4">첫 번째 리뷰 링크를 추가해보세요.</p>
                <Button onClick={() => setIsAddingReview(true)} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  리뷰 링크 추가하기
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-malls">
            <div className="mb-6">
              <h2 className="text-xl font-bold">다른 사용자의 마이몰</h2>
              <p className="text-gray-600 mt-1">이 상품을 포함한 다른 사용자의 마이몰 목록입니다.</p>
            </div>
            
            {myMalls.length > 0 ? (
              <div className="space-y-4">
                {myMalls.map(mall => (
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
                        <h3 className="font-medium">{mall.userName}님의 마이몰</h3>
                        <span className="text-sm text-gray-500 ml-2">{mall.date}</span>
                      </div>
                      <p className="text-gray-700">{mall.comment}</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600 mt-1"
                        onClick={() => toast({
                          title: "마이몰 방문",
                          description: `${mall.userName}님의 마이몰로 이동합니다.`,
                        })}
                      >
                        마이몰 방문하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-700 mb-2">등록된 마이몰이 없습니다</h3>
                <p className="text-gray-500">아직 이 상품을 포함한 다른 사용자의 마이몰이 없습니다.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-10 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">관련 상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map(relatedProduct => (
              <div 
                key={relatedProduct.id} 
                className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/shop/${window.location.pathname.split('/')[2]}/product/${relatedProduct.id}`)}
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={relatedProduct.imageUrl} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                  <p className="text-blue-600 font-bold mt-1">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
