
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft } from 'lucide-react';

interface PageUnderConstructionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  returnPath?: string;
  returnLabel?: string;
}

const PageUnderConstruction: React.FC<PageUnderConstructionProps> = ({
  title,
  description,
  icon = <Settings className="h-16 w-16 text-blue-600" />,
  returnPath = "/",
  returnLabel = "홈으로 돌아가기"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-8"> {/* Increased margin */}
        {icon} {/* Icon color is passed as prop from parent */}
      </div>
      {/* Updated text colors */}
      <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1> 
      <p className="text-gray-400 max-w-md mb-10">{description}</p> 
      <Link to={returnPath}>
         {/* Updated button style */}
        <Button variant="outline" className="flex items-center border-gray-600 text-gray-300 hover:bg-gray-700/50"> 
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>{returnLabel}</span>
        </Button>
      </Link>
    </div>
  );
};

export default PageUnderConstruction;
