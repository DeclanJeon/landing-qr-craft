
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyTabContentProps {
  title: string;
  description: string;
}

const EmptyTabContent: React.FC<EmptyTabContentProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-500 py-8 md:py-16">
          {title} 기능은 추후 업데이트 예정입니다.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyTabContent;
