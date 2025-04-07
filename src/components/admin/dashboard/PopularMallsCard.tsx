
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Mall {
  name: string;
  visits: string;
  increase: string;
}

interface PopularMallsCardProps {
  malls: Mall[];
}

const PopularMallsCard: React.FC<PopularMallsCardProps> = ({ malls }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>인기 피어몰</CardTitle>
        <CardDescription>방문자 수 기준 상위 피어몰입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {malls.map((mall, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{mall.name}</p>
                <p className="text-xs text-gray-500">{mall.visits} 방문</p>
              </div>
              <div className="text-xs text-green-500">
                {mall.increase} ↑
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="border-t px-6 py-3">
        <Button variant="ghost" size="sm" className="w-full">모든 피어몰 보기</Button>
      </div>
    </Card>
  );
};

export default PopularMallsCard;
