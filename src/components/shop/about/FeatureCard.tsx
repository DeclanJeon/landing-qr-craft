
import React, { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  listItems?: string[];
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, listItems }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {description && <p>{description}</p>}
          {listItems && (
            <ul className="space-y-2 mt-2">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
