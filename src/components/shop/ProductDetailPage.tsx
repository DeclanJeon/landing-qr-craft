
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

// Import components
import ProductImage from './product-detail/ProductImage';
import ProductInfo from './product-detail/ProductInfo';
import ProductTabs from './product-detail/ProductTabs';
import RelatedProducts from './product-detail/RelatedProducts';
import AddReviewDialog from './product-detail/AddReviewDialog';
import LoadingState from './product-detail/LoadingState';
import NotFoundState from './product-detail/NotFoundState';
import BestReviews from './product-detail/BestReviews';
import SideAdvertisement from './product-detail/SideAdvertisement';

interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
  rating?: number;
  likes?: number;
}

interface MyMall {
  id: string;
  userName: string;
  userImageUrl: string;
  comment: string;
  date: string;
}

interface PeerMall {
  id: string;
  name: string;
  logo: string;
  url: string;
  products: Product[];
}

const ProductDetailPage: React.FC = () => {
  const { shopUrl, productId } = useParams<{ shopUrl: string; productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<{name: string, rating: number, price: string}[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myMalls, setMyMalls] = useState<MyMall[]>([]);
  const [peerMalls, setpeerMalls] = useState<PeerMall[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [activeTab, setActiveTab] = useState('my-products');

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
            .slice(0, 6);
          setRelatedProducts(related);
          
          const mockVendors = [
            { name: '공식 스토어', rating: 4.9, price: foundProduct.price },
            { name: '프리미엄 리셀러', rating: 4.7, price: `${parseInt(foundProduct.price.replace(/[^\d]/g, '')) * 1.05}원` },
            { name: '인증 파트너샵', rating: 4.5, price: `${parseInt(foundProduct.price.replace(/[^\d]/g, '')) * 0.95}원` }
          ];
          setVendors(mockVendors);
          
          loadReviews(foundProduct.id);
          loadMyMalls(foundProduct.id);
          loadPeerMalls();
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
          date: "2023-10-15",
          rating: 4.8,
          likes: 24
        },
        {
          id: "2",
          title: "1개월 사용 후 정직한 리뷰",
          author: "일상리뷰",
          source: "유튜브",
          imageUrl: "https://placehold.co/200x150",
          linkUrl: "https://example.com/review2",
          date: "2023-09-20",
          rating: 4.5,
          likes: 18
        },
        {
          id: "3",
          title: "이 제품 추천합니다",
          author: "소비자",
          source: "쇼핑몰",
          imageUrl: "https://placehold.co/200x150",
          linkUrl: "https://example.com/review3",
          date: "2023-11-05",
          rating: 4.2,
          likes: 12
        },
        {
          id: "4",
          title: "구매하기 전에 알았으면 좋았을 것들",
          author: "실용파",
          source: "인스타그램",
          imageUrl: "https://placehold.co/200x150",
          linkUrl: "https://example.com/review4",
          date: "2023-10-25",
          rating: 3.9,
          likes: 8
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
        },
        {
          id: "3",
          userName: "박준호",
          userImageUrl: "https://placehold.co/40",
          comment: "가성비 좋은 제품입니다",
          date: "2023-11-01"
        },
        {
          id: "4",
          userName: "정소연",
          userImageUrl: "https://placehold.co/40",
          comment: "디자인이 정말 예쁘네요",
          date: "2023-11-05"
        }
      ];
      setMyMalls(mockMyMalls);
      localStorage.setItem(`peermall-mymalls-${productId}`, JSON.stringify(mockMyMalls));
    }
  };

  const loadPeerMalls = () => {
    // This would normally be from an API, but for demo we'll create mock data
    const mockPeerMalls: PeerMall[] = [
      {
        id: "1",
        name: "테크 마니아",
        logo: "https://placehold.co/40",
        url: "techmall",
        products: [
          {
            id: 101,
            name: "고급 블루투스 이어폰",
            price: "89,000원",
            imageUrl: "https://placehold.co/200/2E86C1/FFF?text=Earbuds",
            description: "고품질 사운드의 블루투스 이어폰",
            categoryId: 1,
            externalUrl: "https://example.com/earbuds"
          },
          {
            id: 102,
            name: "스마트 홈 허브",
            price: "129,000원",
            imageUrl: "https://placehold.co/200/27AE60/FFF?text=SmartHome",
            description: "모든 스마트 기기를 연결하는 허브",
            categoryId: 1,
            externalUrl: "https://example.com/smarthome"
          },
          {
            id: 103,
            name: "게이밍 마우스",
            price: "79,000원",
            imageUrl: "https://placehold.co/200/8E44AD/FFF?text=Mouse",
            description: "정밀한 움직임을 지원하는 게이밍 마우스",
            categoryId: 1,
            externalUrl: "https://example.com/mouse"
          },
          {
            id: 104,
            name: "4K 웹캠",
            price: "92,000원",
            imageUrl: "https://placehold.co/200/F39C12/FFF?text=Webcam",
            description: "화상 회의를 위한 고화질 웹캠",
            categoryId: 1,
            externalUrl: "https://example.com/webcam"
          }
        ]
      },
      {
        id: "2",
        name: "홈 스타일",
        logo: "https://placehold.co/40",
        url: "homestyle",
        products: [
          {
            id: 201,
            name: "모던 스탠드 조명",
            price: "68,000원",
            imageUrl: "https://placehold.co/200/E74C3C/FFF?text=Lamp",
            description: "거실에 어울리는 모던한 스탠드 조명",
            categoryId: 2,
            externalUrl: "https://example.com/lamp"
          },
          {
            id: 202,
            name: "원목 커피 테이블",
            price: "215,000원",
            imageUrl: "https://placehold.co/200/9A7D0A/FFF?text=Table",
            description: "자연스러운 느낌의 원목 커피 테이블",
            categoryId: 2,
            externalUrl: "https://example.com/table"
          },
          {
            id: 203,
            name: "북유럽 패브릭 소파",
            price: "450,000원",
            imageUrl: "https://placehold.co/200/1ABC9C/FFF?text=Sofa",
            description: "편안함과 스타일을 겸비한 소파",
            categoryId: 2,
            externalUrl: "https://example.com/sofa"
          }
        ]
      }
    ];
    
    setpeerMalls(mockPeerMalls);
  };

  const extractMetadataFromUrl = async (url: string) => {
    try {
      console.log("Attempting to extract metadata from URL:", url);
      
      // In a real implementation, this would be a call to your scraping API
      // For this demo, we'll simulate a response
      
      try {
        const parsedUrl = new URL(url);
        const domain = parsedUrl.hostname.replace('www.', '');
        const sourceName = domain.split('.')[0];
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock response based on URL
        let title = `${sourceName} 사이트의 리뷰`;
        let author = `${sourceName} 작성자`;
        let imageUrl = "https://placehold.co/200x150";
        let source = sourceName.charAt(0).toUpperCase() + sourceName.slice(1);
        let date = new Date().toISOString().split('T')[0];
        let rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
        
        // Customize based on domain
        if (url.includes('blog')) {
          title = "블로그에서 발견한 상세 리뷰";
          author = "블로그 작성자";
          source = "블로그";
        } else if (url.includes('youtube') || url.includes('youtu.be')) {
          title = "유튜브 제품 리뷰 영상";
          author = "유튜브 크리에이터";
          imageUrl = "https://placehold.co/200x150/FF0000/FFFFFF?text=YouTube";
          source = "유튜브";
        } else if (url.includes('instagram')) {
          title = "인스타그램 사용자 후기";
          author = "인스타그래머";
          imageUrl = "https://placehold.co/200x150/E1306C/FFFFFF?text=Instagram";
          source = "인스타그램";
        }
        
        return {
          title,
          image: imageUrl,
          author,
          source,
          date,
          rating: parseFloat(rating)
        };
      } catch (parseError) {
        console.error("Error parsing URL:", parseError);
        throw new Error("유효한 URL을 입력해주세요");
      }
    } catch (error) {
      console.error("Error extracting metadata:", error);
      throw new Error("메타데이터 추출 중 오류가 발생했습니다");
    }
  };

  const handleAddReviewLink = async (newReviewLink: string) => {
    if (!newReviewLink.trim() || !product) return;
    
    try {
      let newReview: Review = {
        id: Date.now().toString(),
        title: `리뷰 ${reviews.length + 1}`,
        author: "불명",
        source: "웹사이트",
        imageUrl: "https://placehold.co/200x150",
        linkUrl: newReviewLink,
        date: new Date().toISOString().split('T')[0]
      };

      // Extract metadata from URL
      const metadata = await extractMetadataFromUrl(newReviewLink);
      if (metadata) {
        newReview.title = metadata.title || newReview.title;
        newReview.author = metadata.author || newReview.author;
        newReview.source = metadata.source || newReview.source;
        newReview.imageUrl = metadata.image || newReview.imageUrl;
        newReview.rating = metadata.rating;
        newReview.likes = Math.floor(Math.random() * 30); // Random likes
        
        if (metadata.date) {
          try {
            // Try to format the date
            const formattedDate = new Date(metadata.date).toISOString().split('T')[0];
            newReview.date = formattedDate;
          } catch (e) {
            console.error("Error formatting date:", e);
            // Keep the default date
          }
        }
      }
      
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem(`peermall-reviews-${product.id}`, JSON.stringify(updatedReviews));
      
      toast({
        title: "리뷰 링크가 추가되었습니다",
        description: "제품 상세 페이지에 리뷰 링크가 성공적으로 추가되었습니다.",
      });
    } catch (error) {
      console.error("Error adding review link:", error);
      toast({
        title: "오류",
        description: "리뷰 링크 추가 중 문제가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleAddManualReview = async (review: Omit<Review, 'id'>) => {
    if (!product) return;
    
    try {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        rating: review.rating || Math.floor(Math.random() * 2) + 4, // Random 4-5 if not provided
        likes: Math.floor(Math.random() * 20) // Random likes
      };
      
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem(`peermall-reviews-${product.id}`, JSON.stringify(updatedReviews));
      
      toast({
        title: "리뷰가 추가되었습니다",
        description: "제품 상세 페이지에 리뷰가 성공적으로 추가되었습니다.",
      });
    } catch (error) {
      console.error("Error adding manual review:", error);
      toast({
        title: "오류",
        description: "리뷰 추가 중 문제가 발생했습니다.",
        variant: "destructive"
      });
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

  if (isLoading) {
    return <LoadingState />;
  }

  if (!product) {
    return <NotFoundState />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      {/* Side Advertisements */}
      <SideAdvertisement position="left" />
      <SideAdvertisement position="right" />
      
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
        <ProductImage imageUrl={product.imageUrl} alt={product.name} />
        
        <ProductInfo 
          product={product}
          handleBuyNow={handleBuyNow}
          handleAddToCart={handleAddToCart}
          handleConsultChat={handleConsultChat}
          handleConsultVoice={handleConsultVoice}
          handleConsultVideo={handleConsultVideo}
        />
      </div>
      
      {/* Best Reviews Section */}
      {reviews.length >= 3 && (
        <div className="mt-10">
          <BestReviews reviews={reviews} />
        </div>
      )}
      
      <div className="mt-10 border-t pt-8">
        <ProductTabs 
          shopUrl={shopUrl}
          product={product}
          relatedProducts={relatedProducts}
          vendors={vendors}
          reviews={reviews}
          myMalls={myMalls}
          peerMalls={peerMalls}
          handleDeleteReview={handleDeleteReview}
          setIsAddingReview={setIsAddingReview}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      
      <RelatedProducts products={relatedProducts} />
      
      <AddReviewDialog 
        isOpen={isAddingReview} 
        onOpenChange={setIsAddingReview}
        onAddLink={handleAddReviewLink}
        onAddManualReview={handleAddManualReview}
      />
    </div>
  );
};

export default ProductDetailPage;
