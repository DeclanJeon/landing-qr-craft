import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { QrCode, Store, ArrowRight, CheckCheck, User } from "lucide-react";


const generateQrCode = (content: string) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(content)}`;
};

const Index = () => {
  const [qrContent, setQrContent] = useState('이곳에 URL을 입력 하세요.');
  const [qrImage, setQrImage] = useState('');
  // Removed isScrolled, mobileMenuOpen, searchOpen, notificationsOpen states (moved to Navigation.tsx)
  const [activeFeatureTab, setActiveFeatureTab] = useState("mystore");
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentPeerMallPage, setCurrentPeerMallPage] = useState(1);
  const peermallsPerPage = 4;
  
  useEffect(() => {
    setQrImage(generateQrCode(qrContent));
  }, [qrContent]);

  // Removed scroll useEffect (moved to Navigation.tsx)

  const handleGenerateQR = () => {
    setQrImage(generateQrCode(qrContent));
    toast({
      title: "QR 코드가 생성되었습니다",
      description: "생성된 QR 코드를 다운로드하거나 공유할 수 있습니다.",
    });
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'peermall-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "QR 코드 다운로드",
      description: "QR 코드가 성공적으로 다운로드되었습니다.",
    });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Removed PremiumNavigation component definition

  const peerMalls = [
    {
      id: 1,
      name: "패션 컬렉션",
      owner: "김지은",
      image: "https://placehold.co/300",
      url: "fashion"
    },
    {
      id: 2,
      name: "홈 인테리어",
      owner: "박민수",
      image: "https://placehold.co/300",
      url: "home"
    },
    {
      id: 3,
      name: "디지털 기기",
      owner: "이승훈",
      image: "https://placehold.co/300",
      url: "digital"
    },
    {
      id: 4,
      name: "뷰티 제품",
      owner: "최예린",
      image: "https://placehold.co/300",
      url: "beauty"
    },
    {
      id: 5,
      name: "스포츠 용품",
      owner: "정태환",
      image: "https://placehold.co/300",
      url: "sports"
    },
    {
      id: 6,
      name: "취미 용품",
      owner: "송지현",
      image: "https://placehold.co/300",
      url: "hobby"
    },
    {
      id: 7,
      name: "자동차 액세서리",
      owner: "강민석",
      image: "https://placehold.co/300",
      url: "car"
    },
    {
      id: 8,
      name: "건강 식품",
      owner: "유민지",
      image: "https://placehold.co/300",
      url: "health"
    }
  ];

  const totalPages = Math.ceil(peerMalls.length / peermallsPerPage);
  const indexOfLastPeerMall = currentPeerMallPage * peermallsPerPage;
  const indexOfFirstPeerMall = indexOfLastPeerMall - peermallsPerPage;
  const currentPeerMalls = peerMalls.slice(indexOfFirstPeerMall, indexOfLastPeerMall);

  return (
    <div className="min-h-screen font-sans">
      <section ref={heroRef} className="pt-32 pb-24 bg-gradient-to-br from-blue-50 to-indigo-100 animate-fade-in">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">내 손안의 쇼핑몰, Peermall</h2>
            <p className="text-xl text-gray-600 mb-8">귀한 고객들이 직접 사거나 팔 수 있는 새로운 쇼핑 플랫폼입니다.</p>
            <div className="flex space-x-4">
              <Button onClick={scrollToFeatures} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-6 text-lg flex items-center">
                주요 기능 살펴보기 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {/* <Link to="/personal-lounge">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8 py-6 text-lg">
                  무료로 시작하기
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative bg-white rounded-xl shadow-2xl p-6 animate-float">
              <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">나만의 QR 코드 만들기</h3>
                 <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  {qrImage && <img src={qrImage} alt="QR 코드" className="w-48 h-48" />}
                </div>
                <div className="w-full space-y-4">
                  <Input 
                    value={qrContent}
                    onChange={(e) => setQrContent(e.target.value)}
                    placeholder="URL 또는 텍스트 입력"
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleGenerateQR} className="w-full bg-blue-600 hover:bg-blue-700">
                      QR 코드 생성
                    </Button>
                    <Button onClick={handleDownloadQR} variant="outline" className="w-full">
                      다운로드
                    </Button>
                  </div>
                  <Link to="/qr-generator" className="block w-full">
                    <Button variant="ghost" className="w-full">
                      고급 QR 코드 생성기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Peermall 기능 살펴보기</h2>
          
          <Tabs defaultValue="mystore" className="w-full" onValueChange={setActiveFeatureTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-8">
              <TabsTrigger value="mystore" className="flex flex-col items-center py-3">
                <Store className="h-6 w-6 mb-1" />
                <span>나의 쇼핑몰</span>
              </TabsTrigger>
              <TabsTrigger value="qrcode" className="flex flex-col items-center py-3">
                <QrCode className="h-6 w-6 mb-1" />
                <span>QR 코드</span>
              </TabsTrigger>
              <TabsTrigger value="authentication" className="flex flex-col items-center py-3">
                <CheckCheck className="h-6 w-6 mb-1" />
                <span>인증</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="flex flex-col items-center py-3">
                <User className="h-6 w-6 mb-1" />
                <span>커뮤니티</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <TabsContent value="mystore" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">나만의 피어몰 만들기</h3>
                    <p className="text-gray-600 mb-6">쉽고 빠르게 나만의 온라인 쇼핑몰을 구축하세요. 복잡한 과정 없이 몇 분 만에 제품을 등록하고 판매를 시작할 수 있습니다.</p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>쉽고 빠른 쇼핑몰 개설 (무료)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>간단한 제품 등록 및 관리</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>맞춤형 스토어 디자인</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>합리적인 거래 수수료 (3%)</span>
                      </li>
                    </ul>
                    <Link to="/personal-lounge">
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">스토어 만들기</Button>
                    </Link>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-lg text-gray-500">스토어 미리보기</span>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-10 bg-blue-100 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="qrcode" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">QR 코드 생성 및 활용</h3>
                    <p className="text-gray-600 mb-6">상품, 상점, 프로모션을 위한 QR 코드를 간편하게 생성하고 공유하세요. QR 코드를 통해 오프라인과 온라인을 연결하는 효과적인 마케팅을 진행할 수 있습니다.</p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>상품 및 상점 전용 QR 코드</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>이벤트 및 프로모션 QR 코드</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>QR 코드 스캔 통계 제공</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>손쉬운 QR 코드 인쇄 및 공유</span>
                      </li>
                    </ul>
                    <Link to="/qr-generator">
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">QR 코드 생성하기</Button>
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-full">
                      <div className="flex justify-center mb-4">
                        <img src={generateQrCode('https://peermall.com/store')} alt="QR 코드 예시" className="w-48 h-48" />
                      </div>
                      <div className="text-center space-y-2">
                        <h4 className="font-medium text-gray-800">피어몰 샘플 스토어</h4>
                        <p className="text-sm text-gray-500">이 QR 코드를 스캔하여 샘플 스토어를 확인하세요</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="authentication" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">진품 및 소유권 인증</h3>
                    <p className="text-gray-600 mb-6">블록체인 기술을 활용한 진품 인증 시스템으로 제품의 신뢰도를 높이고, 소유권 인증을 통해 안전한 거래를 보장합니다.</p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>블록체인 기반 진품 인증</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>안전한 소유권 이전</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>QR 코드를 통한 간편 인증</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>제품 이력 추적</span>
                      </li>
                    </ul>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">인증 시스템 알아보기</Button>
                  </div>
                  <div className="flex justify-center">
                    <Card className="w-full max-w-md">
                      <CardContent className="p-6">
                        <div className="mb-6 flex justify-center">
                          <div className="relative">
                            <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-md text-xs font-medium">
                              인증됨
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">제품명</h4>
                            <p className="font-medium">프리미엄 스니커즈 XYZ</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">제조사</h4>
                            <p className="font-medium">ABC 브랜드</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">제조일</h4>
                            <p className="font-medium">2023년 10월 15일</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">인증 ID</h4>
                            <p className="font-medium text-xs">0x8F3E...7D21</p>
                          </div>
                          <Button variant="outline" className="w-full">인증서 확인</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">커뮤니티 및 고객 소통</h3>
                    <p className="text-gray-600 mb-6">사용자들과 소통하고 정보를 공유할 수 있는 커뮤니티 공간과 1:1 음성, 화상, 채팅 상담 서비스를 제공합니다.</p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>커뮤니티 블로그 및 게시판</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>실시간 텍스트, 음성, 화상 채팅</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>라이브 스트리밍 기능</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCheck className="h-5 w-5 text-green-500 mr-2 mt-1" />
                        <span>소통 기록 관리</span>
                      </li>
                    </ul>
                    <div className="flex space-x-3 mt-6">
                      <Link to="/community">
                        <Button className="bg-blue-600 hover:bg-blue-700">커뮤니티 참여하기</Button>
                      </Link>
                      <Link to="/customer-service">
                        <Button variant="outline" className="border-blue-600 text-blue-600">고객센터 문의하기</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Peermall 커뮤니티</h4>
                        <p className="text-xs text-gray-500">2,543 회원 · 활발한 활동 중</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-xs font-medium text-indigo-600">JS</span>
                          </div>
                          <div>
                            <h5 className="font-medium">제품 사용 후기</h5>
                            <p className="text-sm text-gray-600 mt-1">정말 만족스러운 제품이었습니다. 특히 배송이 빨라서...</p>
                            <p className="text-xs text-gray-400 mt-2">2시간 전</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-xs font-medium text-green-600">KM</span>
                          </div>
                          <div>
                            <h5 className="font-medium">질문: 운영시간이 어떻게 되나요?</h5>
                            <p className="text-sm text-gray-600 mt-1">주말에도 고객센터 운영이 되는지 궁금합니다.</p>
                            <p className="text-xs text-gray-400 mt-2">1일 전</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to="/community">
                      <Button variant="outline" className="w-full mt-4">전체 게시글 보기</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">빠른 기능 접근</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/qr-generator">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <QrCode className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="font-medium">QR 코드 생성</h3>
                  <p className="text-sm text-gray-500 mt-2">나만의 QR 코드를 만들어보세요</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/personal-lounge">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Store className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="font-medium">나의 라운지</h3>
                  <p className="text-sm text-gray-500 mt-2">나만의 피어몰 라운지 관리</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/login">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <User className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="font-medium">로그인</h3>
                  <p className="text-sm text-gray-500 mt-2">이메일로 간편하게 로그인</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/peermall-list">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <Store className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="font-medium">피어몰 목록</h3>
                  <p className="text-sm text-gray-500 mt-2">등록된 피어몰 둘러보기</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section id="story" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Peermall 이야기</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              <strong className="text-blue-600">피어의 귀족, 또래</strong> 등의 뜻과 <strong className="text-blue-600">몰</strong>은 쇼핑하는 곳이라는 뜻의 합성어로 귀족이 쇼핑하는 곳으로 귀한 고객들이 직접 사거나 팔 수 있는 사이트입니다.
            </p>
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl shadow-subtle">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">우리의 비전</h2>
              <p className="text-gray-700 leading-relaxed">
                인간이 가상과 현실 세계를 거주지와 직장으로 사용할 수 있도록 고도화된 인터넷 서비스 인프라를 구축하고 운영하여 '지속 가능한 인간 사회'에서 살아가는 것입니다.
              </p>
            </div>
            <div id="mission" className="bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-xl shadow-subtle">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">우리의 미션</h2>
              <p className="text-gray-700 leading-relaxed">
                우리는 청정 커머스 서비스인 피어몰을 통해 지속 가능한 인간 사회를 만드는 일에 이바지하고자 합니다. 피어몰은 각각의 유저나 회사, 커뮤니티가 직접 거버넌스를 한다는 모토를 가지고 "내가 내 세상을 거번하고, 당신이 당신의 세상을 거번하고, 우리가 우리의 세상을 거번한다"는 철학적이고 기술적인 메커니즘을 통해 디지털-물리적 자산, 사업 및 프라이버시를 보호할 수 있는 인프라 시스템을 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="values" className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 가치</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Relationship & Identification</h3>
              <p className="text-white/80">관계와 정체성을 중요시하며 진정한 연결을 추구합니다.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">3R (Role, Responsibility, Rights)</h3>
              <p className="text-white/80">역할, 책임, 권리의 균형을 통한 자기 거버넌스를 지향합니다.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Quality of Life</h3>
              <p className="text-white/80">삶의 질 향상을 위한 가치 창출에 기여합니다.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Private & Security</h3>
              <p className="text-white/80">개인정보 보호와 보안을 최우선으로 생각합니다.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Holistic human society</h3>
              <p className="text-white/80">총체적인 인간 사회를 위한 지속 가능한 발전을 추구합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">문의하기</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Peermall에 대해 더 궁금한 점이 있으신가요? 지금 바로 문의하세요!</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-md mx-auto">
            <Input placeholder="이메일을 입력하세요" className="md:flex-1" />
            <Button className="bg-blue-600 hover:bg-blue-700">문의하기</Button>
          </div>
        </div>
      </section>

      {/* ShopFooter component removed as it's now in MainLayout */}
    </div>
  );
};

export default Index;
