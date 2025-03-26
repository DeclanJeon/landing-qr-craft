
import React from 'react';
import { ShieldCheck, Award, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AboutPageProps {
  shopData: {
    shopName: string;
    shopDescription?: string;
    ownerName?: string;
  };
}

const AboutPage: React.FC<AboutPageProps> = ({ shopData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{shopData.shopName} 소개</h2>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          {shopData.shopDescription || `${shopData.shopName}은 고객님께 최고의 제품과 서비스를 제공하기 위해 항상 노력하고 있습니다.`}
        </p>
        <p className="text-lg text-gray-700">
          {shopData.ownerName ? `대표 ${shopData.ownerName}은 항상 최상의 품질과 서비스를 제공하기 위해 끊임없이 연구하고 발전하고 있습니다.` : 
          '저희는 항상 최상의 품질과 서비스를 제공하기 위해 끊임없이 연구하고 발전하고 있습니다.'}
        </p>
      </div>
      
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">우리의 가치</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ShieldCheck className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>품질 보증</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                모든 제품은 엄격한 품질 검사를 거쳐 고객님께 제공됩니다.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Award className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>신뢰와 전문성</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                풍부한 경험과 전문 지식을 바탕으로 최상의 서비스를 제공합니다.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Check className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>고객 만족</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                고객의 만족이 저희의 최우선 가치입니다. 항상 고객의 목소리에 귀 기울입니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-6">우리의 약속</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
            <span>항상 고객님께 최고의 제품과 서비스를 제공하겠습니다.</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
            <span>정직과 신뢰를 바탕으로 투명한 정보를 제공하겠습니다.</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
            <span>고객님의 피드백을 항상 경청하고 끊임없이 발전하겠습니다.</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
            <span>지속 가능한 비즈니스 관행을 통해 사회적 책임을 다하겠습니다.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
