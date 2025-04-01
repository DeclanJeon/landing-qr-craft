
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
      <div className="mb-6">
        {icon}
      </div>
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="text-gray-600 max-w-md mb-8">{description}</p>
      <Link to={returnPath}>
        <Button variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>{returnLabel}</span>
        </Button>
      </Link>
    </div>
  );
};

export default PageUnderConstruction;
