import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/shop';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

// Import new components
import ProductImage from './product-detail/ProductImage';
import ProductInfo from './product-detail/ProductInfo';
import ProductTabs from './product-detail/ProductTabs';
import RelatedProducts from './product-detail/RelatedProducts';
import AddReviewDialog from './product-detail/AddReviewDialog';
import LoadingState from './product-detail/LoadingState';
import NotFoundState from './product-detail/NotFoundState';

interface Review {
  id: string;
  title: string;
  author: string;
  source: string;
  imageUrl: string;
  linkUrl: string;
  date: string;
}

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
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [activeTab, setActiveTab] = useState('product-info');

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
          source: "유튜��",
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

      try {
        const url = new URL(newReviewLink);
        const domain = url.hostname.replace('www.', '');
        const sourceName = domain.split('.')[0];
        const formattedSource = sourceName.charAt(0).toUpperCase() + sourceName.slice(1);
        newReview.source = formattedSource;

        console.log("Fetching URL:", newReviewLink);
        const proxyUrl = `https://cors-anywhere.herokuapp.com/${newReviewLink}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          console.error("Failed to fetch URL:", response.status);
          throw new Error(`Failed to fetch URL: ${response.status}`);
        }
        
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const metaTitle = 
          doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
          doc.querySelector('title')?.textContent ||
          newReview.title;
        
        if (metaTitle) {
          newReview.title = metaTitle;
        }
        
        const metaImage = 
          doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
          doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
        
        if (metaImage) {
          if (metaImage.startsWith('/')) {
            newReview.imageUrl = `${url.origin}${metaImage}`;
          } else if (metaImage.startsWith('http')) {
            newReview.imageUrl = metaImage;
          }
        } else {
          const images = Array.from(doc.querySelectorAll('img')).filter(img => {
            const src = img.getAttribute('src');
            return src && 
                 !src.includes('avatar') && 
                 !src.includes('icon') && 
                 !src.includes('logo') &&
                 (img.width > 100 || img.height > 100 || !img.width);
          });
          
          if (images.length > 0) {
            let imgSrc = images[0].getAttribute('src');
            if (imgSrc) {
              if (imgSrc.startsWith('/')) {
                newReview.imageUrl = `${url.origin}${imgSrc}`;
              } else if (imgSrc.startsWith('http')) {
                newReview.imageUrl = imgSrc;
              } else {
                newReview.imageUrl = `${url.origin}/${imgSrc}`;
              }
            }
          }
        }
        
        const metaAuthor = 
          doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
          doc.querySelector('meta[property="article:author"]')?.getAttribute('content') ||
          doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content');
        
        if (metaAuthor) {
          newReview.author = metaAuthor;
        } else {
          const authorElements = doc.querySelectorAll('.author, .byline, [rel="author"]');
          if (authorElements.length > 0) {
            const authorText = authorElements[0].textContent?.trim();
            if (authorText) {
              newReview.author = authorText;
            }
          }
        }
        
        const dateElements = doc.querySelectorAll('time, .date, .published, meta[property="article:published_time"]');
        if (dateElements.length > 0) {
          const dateElement = dateElements[0];
          
          if (dateElement.tagName === 'META') {
            const dateContent = dateElement.getAttribute('content');
            if (dateContent) {
              try {
                newReview.date = new Date(dateContent).toISOString().split('T')[0];
              } catch (e) {
                console.error("Failed to parse date from meta tag:", e);
              }
            }
          } else if (dateElement.hasAttribute('datetime')) {
            const dateTime = dateElement.getAttribute('datetime');
            if (dateTime) {
              try {
                newReview.date = new Date(dateTime).toISOString().split('T')[0];
              } catch (e) {
                console.error("Failed to parse datetime attribute:", e);
              }
            }
          } else {
            const dateText = dateElement.textContent?.trim();
            if (dateText) {
              try {
                newReview.date = new Date(dateText).toISOString().split('T')[0];
              } catch (e) {
                console.error("Failed to parse date from text:", e);
              }
            }
          }
        }
        
        console.log("Extracted review data:", newReview);
      } catch (error) {
        console.error("Error extracting metadata:", error);
        toast({
          title: "메타데이터 추출 문제",
          description: "페이지 정보를 추출하는 데 어려움이 있습니다. 기본 정보를 사용합니다.",
        });
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
      throw new Error("유효한 URL을 입력해주세요");
    }
  };

  const handleAddManualReview = async (review: Omit<Review, 'id'>) => {
    if (!product) return;
    
    try {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
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
      throw new Error("리뷰 추가 중 오류가 발생했습니다");
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
      
      <div className="mt-10 border-t pt-8">
        <ProductTabs 
          product={product}
          vendors={vendors}
          reviews={reviews}
          myMalls={myMalls}
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
