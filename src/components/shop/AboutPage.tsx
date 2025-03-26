
import React from 'react';
import { QrCode, Shield, Award, MessageSquare, Video, FileCheck, Users, Key, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

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
      <h2 className="text-3xl font-bold mb-6 text-blue-600">피어몰 소개</h2>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          피어몰은 누구나 쉽게 자신의 상품을 홍보하고 판매경로로 이동시킬 수 있게 하는 자신만의 뷰어공간입니다. 
          제품만의 QR코드를 발급하여 직접적인 고객과의 소통이 가능하게 합니다.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          고객은 유통사, 제조사, 판매점과 직접적인 소통을 할 수 있으며
          피어몰은 사이트 자체 내에서 Call system을 제공하고 있습니다.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          고객이 피어몰의 제품을 구매하게 되면 고객은 피어몰을 만들 수 있는 자격이 주어집니다.
          그러면 고객은 유통사와 제조사와 직접 소통을 하여 스스로가 스토어로서 유통채널도 확보하며, 제품을 만들 수 있는 기회도 가질 수 있습니다.
        </p>
        <p className="text-lg text-gray-700">
          피어몰은 고객 스스로가 제품을 구매했고, 제품이 마음에 들어서 스스로 제품을 만들어 유통하면서 돈을 벌 수 있는 스스로가 거번할 수 있는 길을 제공합니다.
        </p>
      </div>
      
      {/* 주요 기능 섹션 */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">피어몰의 주요 기능</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* QR코드 생성 */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <QrCode className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>QR코드 생성</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>사용자 정의 QR코드 생성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>스토어 QR코드 생성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>제품 QR코드 생성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>Call QR코드 생성</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>Email QR코드 생성</span>
                  </li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
          
          {/* 진품인증 */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>진품인증</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                제품이 진품인지 아닌지를 인증하는 기능입니다. 피어몰은 신뢰할 수 있는 
                제품 인증 시스템을 통해 고객에게 진품을 보장합니다.
              </CardDescription>
            </CardContent>
          </Card>
          
          {/* 소유권 인증 */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Key className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>소유권 인증</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                제품의 소유권이 어디에 있는지 본인인지 아니면 다른 사람인지
                그 사람은 누구인지에 대한 내용을 보여주며 자신의 소유라면 UI/UX로 나타납니다.
              </CardDescription>
            </CardContent>
          </Card>
          
          {/* 커뮤니티 */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>커뮤니티</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                <ul className="space-y-2 mt-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>게시판, 채팅, 음성채팅, 화상채팅</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>화이트보드, 회의, 미팅</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-1" />
                    <span>비밀 채팅</span>
                  </li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
          
          {/* QR코드 검증 */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <FileCheck className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>QR코드 검증</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                피어몰은 QR코드의 진위여부를 검증하는 기능을 제공합니다.
                파일 검증을 통해 안전한 QR코드 사용 환경을 조성합니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 피어몰 가치 혜택 */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-6">피어몰의 가치와 혜택</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
            <span>자신만의 브랜드와 제품을 만들고 유통할 수 있는 기회</span>
          </li>
          <li className="flex items-start">
            <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
            <span>제조사, 유통사와의 직접적인 소통을 통한 투명한 거래</span>
          </li>
          <li className="flex items-start">
            <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
            <span>QR코드를 통한 간편한 제품 정보 접근 및 인증</span>
          </li>
          <li className="flex items-start">
            <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
            <span>커뮤니티를 통한 다양한 소통 방식 제공</span>
          </li>
          <li className="flex items-start">
            <Award className="h-5 w-5 text-orange-500 mr-2 mt-1" />
            <span>스스로 거버넌스할 수 있는 자유로운 환경 제공</span>
          </li>
        </ul>
      </div>
      
      {/* CTA 섹션 */}
      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">지금 바로 피어몰을 시작해보세요</h3>
        <p className="text-blue-600 mb-6">자신만의 브랜드를 구축하고 제품을 홍보하며 새로운 비즈니스 기회를 만들어보세요.</p>
        <div className="flex justify-center gap-4">
          <Link to="/personal-lounge">
            <Button size="lg" className="font-semibold">
              피어몰 만들기
            </Button>
          </Link>
          <Link to="/qr-generator">
            <Button variant="outline" size="lg" className="font-semibold">
              QR코드 생성하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
