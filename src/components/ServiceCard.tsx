
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <Card className="h-full bg-bg-100 border-bg-200 hover:border-primary-100 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-primary-100/10 flex items-center justify-center mb-2">
          <div className="text-primary-100">{icon}</div>
        </div>
        <CardTitle className="text-lg font-medium text-text-100">{title}</CardTitle>
        <CardDescription className="text-text-200">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {/* Content can be added if needed */}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={onClick}
          className="w-full justify-between text-primary-100 border-primary-100/30 hover:bg-primary-100/5 hover:text-primary-100 hover:border-primary-100"
        >
          자세히 보기
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
