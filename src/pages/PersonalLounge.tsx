import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Plus, Edit, Link as LinkIcon, QrCode, Globe, Settings } from 'lucide-react';
import PeermallShopForm from '@/components/PeermallShopForm';

const PersonalLounge = () => {
  // 피어몰이 이미 생성되었는지 여부 (실제로는 API 또는 상태 관리를 통해 가져와야 함)
  const hasPeermall = false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">내 피어몰 만들기</h1>
                <p className="text-gray-500 mt-1">나만의 개인 브랜드 쇼핑몰을 만들고 관리하세요.</p>
              </div>
            </div>

            {hasPeermall ? (
              <div>
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">내 피어몰</CardTitle>
                        <CardDescription>user@example.com</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        설정
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:justify-between gap-6">
                      <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center md:w-1/3">
                        <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          MY
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold">내 피어몰 스토어</h3>
                        <p className="text-gray-600 mt-2">나만의 특별한 제품을 판매하는 쇼핑몰입니다.</p>
                        <div className="mt-4 flex flex-col space-y-2">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">mystore.peermall.com</span>
                          </div>
                          <div className="flex items-center">
                            <QrCode className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">QR 코드 활성화됨</span>
                          </div>
                          <div className="flex items-center">
                            <Store className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">12개의 제품</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button className="w-full sm:w-auto">
                      <Store className="h-4 w-4 mr-2" />
                      피어몰 방문하기
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Edit className="h-4 w-4 mr-2" />
                      피어몰 편집하기
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <QrCode className="h-4 w-4 mr-2" />
                      QR 코드 생성
                    </Button>
                  </CardFooter>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>제품 관리</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Store className="h-12 w-12 text-blue-600 mb-4" />
                      <p className="text-sm text-gray-600">피어몰에 등록된 상품을 관리하세요.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        제품 관리하기
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>주문 관리</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <QrCode className="h-12 w-12 text-blue-600 mb-4" />
                      <p className="text-sm text-gray-600">고객의 주문 내역을 확인하고 관리하세요.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        주문 확인하기
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>사이트 연동</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LinkIcon className="h-12 w-12 text-blue-600 mb-4" />
                      <p className="text-sm text-gray-600">기존 웹사이트와 피어몰을 연동하세요.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        사이트 연동하기
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>내 피어몰 시작하기</CardTitle>
                  <CardDescription>아래 정보를 입력하여 몇 분 안에 나만의 온라인 스토어를 만들어보세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PeermallShopForm />
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-6">
                  <p className="text-sm text-gray-500">
                    이미 계정이 있으신가요? <a href="/login" className="text-blue-600 hover:underline">로그인하기</a>
                  </p>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLounge;
