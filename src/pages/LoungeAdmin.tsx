
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  ShoppingCart, 
  BarChart, 
  Bell, 
  MessageSquare,
  Package,
  CreditCard,
  Tag,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoungeAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Peermall 관리자 대시보드</h1>
                <p className="text-gray-500 mt-1">피어몰 시스템을 효율적으로 관리하세요.</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  알림
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  설정
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <div className="border-b">
                  <div className="px-4">
                    <TabsList className="h-14">
                      <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <BarChart className="h-4 w-4 mr-2" />
                        대시보드
                      </TabsTrigger>
                      <TabsTrigger value="users" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Users className="h-4 w-4 mr-2" />
                        회원 관리
                      </TabsTrigger>
                      <TabsTrigger value="products" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Package className="h-4 w-4 mr-2" />
                        상품 관리
                      </TabsTrigger>
                      <TabsTrigger value="orders" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        주문 관리
                      </TabsTrigger>
                      <TabsTrigger value="marketing" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <Tag className="h-4 w-4 mr-2" />
                        마케팅
                      </TabsTrigger>
                      <TabsTrigger value="support" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        고객 지원
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="overview" className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">총 회원수</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">8,249</div>
                        <p className="text-xs text-green-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          12.5% 증가
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">신규 주문</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">382</div>
                        <p className="text-xs text-green-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          8.2% 증가
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">판매량</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₩12.4M</div>
                        <p className="text-xs text-red-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          3.1% 감소
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">방문자</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">31,249</div>
                        <p className="text-xs text-green-500 mt-1 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          24.5% 증가
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>최근 활동</CardTitle>
                        <CardDescription>최근 24시간 동안의 활동 내역입니다.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-start">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <Clock className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">새로운 회원 가입</p>
                                <p className="text-xs text-gray-500">user123@example.com 님이 가입했습니다.</p>
                                <p className="text-xs text-gray-400 mt-1">{i * 15}분 전</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" className="w-full">모든 활동 보기</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>인기 피어몰</CardTitle>
                        <CardDescription>가장 많이 방문한 피어몰입니다.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {name: "전자기기 피어몰", visits: "1,249", increase: "12.5%"},
                            {name: "패션 피어몰", visits: "945", increase: "8.3%"},
                            {name: "식품 피어몰", visits: "821", increase: "5.1%"},
                            {name: "홈리빙 피어몰", visits: "675", increase: "3.7%"}
                          ].map((mall, i) => (
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
                  </div>
                </TabsContent>

                <TabsContent value="users" className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>회원 관리</CardTitle>
                      <CardDescription>등록된 회원 정보를 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-16">회원 관리 기능은 추후 업데이트 예정입니다.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="products" className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>상품 관리</CardTitle>
                      <CardDescription>등록된 상품 정보를 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-16">상품 관리 기능은 추후 업데이트 예정입니다.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders" className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>주문 관리</CardTitle>
                      <CardDescription>고객의 주문 정보를 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-16">주문 관리 기능은 추후 업데이트 예정입니다.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="marketing" className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>마케팅</CardTitle>
                      <CardDescription>마케팅 캠페인을 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-16">마케팅 기능은 추후 업데이트 예정입니다.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="support" className="p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>고객 지원</CardTitle>
                      <CardDescription>고객 문의를 관리합니다.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-500 py-16">고객 지원 기능은 추후 업데이트 예정입니다.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoungeAdmin;
