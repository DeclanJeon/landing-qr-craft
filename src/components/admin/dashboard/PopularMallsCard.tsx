
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PopularMall {
  name: string;
  visits: string;
  increase: string;
}

interface PopularMallsCardProps {
  malls: PopularMall[];
}

const PopularMallsCard: React.FC<PopularMallsCardProps> = ({ malls }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>인기 피어몰</CardTitle>
        <CardDescription>가장 많이 방문한 피어몰입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {malls.map((mall, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  <span className="text-xs font-medium">{i+1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{mall.name}</p>
                  <p className="text-xs text-gray-500">{mall.visits} 방문</p>
                </div>
              </div>
              <p className="text-xs text-green-500">↑ {mall.increase}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full">모든 피어몰 보기</Button>
      </CardFooter>
    </Card>
  );
};

export default PopularMallsCard;
