
import React from 'react';
import { Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

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

interface BestReviewsProps {
  reviews: Review[];
}

const BestReviews: React.FC<BestReviewsProps> = ({ reviews }) => {
  // Sort reviews by rating and likes (if available)
  const getBestReviews = (reviewsList: Review[]) => {
    return [...reviewsList]
      .sort((a, b) => {
        // First sort by rating
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (ratingB !== ratingA) return ratingB - ratingA;
        
        // Then by likes
        const likesA = a.likes || 0;
        const likesB = b.likes || 0;
        return likesB - likesA;
      })
      .slice(0, 3); // Take top 3
  };

  const bestReviews = getBestReviews(reviews);

  const handleCallReviewer = (author: string) => {
    toast({
      title: "통화 연결",
      description: `${author}님과 통화를 연결합니다.`,
    });
  };

  if (bestReviews.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">베스트 리뷰</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bestReviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium line-clamp-1">{review.title}</h3>
              <div className="flex items-center">
                {review.rating && (
                  <div className="flex items-center text-yellow-500 mr-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">{review.rating}</span>
                  </div>
                )}
                {review.likes && (
                  <span className="text-sm text-gray-500">+{review.likes}</span>
                )}
              </div>
            </div>
            
            <div className="relative h-24 mb-2 bg-gray-100">
              <img 
                src={review.imageUrl} 
                alt={review.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/200x150";
                }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-gray-600">{review.author}</span>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-blue-600"
                onClick={() => handleCallReviewer(review.author)}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestReviews;
