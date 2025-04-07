
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'} mt-1 flex items-center`}>
          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={trend.isPositive 
                ? "M5 10l7-7m0 0l7 7m-7-7v18" 
                : "M19 14l-7 7m0 0l-7-7m7 7V3"} 
            />
          </svg>
          {trend.value}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
