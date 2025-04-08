import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import PeermallCreateModal from '@/components/PeermallCreateModal'; // Import the modal

import { toast } from "@/hooks/use-toast";
import { 
  QrCode, 
  Store, 
  ArrowRight, 
  CheckCheck, 
  User, 
  ShieldCheck, 
  Link2,      
  Zap,         
  Sun,         
  Layers,      
  HeartHandshake 
} from "lucide-react";
// Optional: Consider adding framer-motion for smoother animations
// import { motion } from 'framer-motion';

// --- Helper Functions & State Hook ---
const generateQrCode = (content: string) => {
  // Using a slightly higher quality QR code generator API if needed, or stick to qrserver
  // Example: return `https://api.qr-code-generator.com/v1/create?access-token=YOUR_TOKEN&qr_code_text=${encodeURIComponent(content)}...`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(content)}&qzone=1&format=png`; // Increased size, added quiet zone
};

const useIndexState = () => {
  const [qrContent, setQrContent] = useState('https://peermall.com'); // Default to a relevant URL
  const [qrImage, setQrImage] = useState('');
  const featuresRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQrImage(generateQrCode(qrContent));
  }, [qrContent]);

  const handleGenerateQR = () => {
    setQrImage(generateQrCode(qrContent));
    toast({
      title: "QR Code Generated",
      description: "Your unique QR code is ready.",
      variant: "default", // Use Shadcn variants if defined
    });
  };

  const handleDownloadQR = () => {
    if (!qrImage) return;
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'peermall-qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "QR Code Downloaded",
      description: "The QR code image has been saved.",
    });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return {
    qrContent, setQrContent, qrImage, handleGenerateQR, handleDownloadQR,
    featuresRef, heroRef, scrollToFeatures
  };
};

// --- Reusable Section Component ---
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  hasSeparator?: boolean;
  // No need to explicitly add ref to props when using forwardRef with TypeScript generics
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ id, className = "", children, hasSeparator = false }, ref) => (
  // Increased vertical padding slightly for more breathing room
  <section id={id} ref={ref} className={`relative py-28 md:py-36 overflow-hidden ${className}`}> 
    <div className="container mx-auto px-6 relative z-10">
      {children}
    </div>
    {hasSeparator && (
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
    )}
  </section>
)) // Removed semicolon

// --- Premium Peermall Creator Component ---
interface PremiumPeermallCreatorProps {
  onStartClick: () => void;
}

const PremiumPeermallCreator: React.FC<PremiumPeermallCreatorProps> = ({ onStartClick }) => (
  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden p-8 border border-gray-700/40">
    {/* Premium background patterns/effects */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-3xl"></div>
      
      {/* Grid lines for premium feel */}
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
    </div>

    <div className="relative z-10">
      <div className="flex flex-col items-center text-center space-y-8 py-6">
        <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform rotate-12">
          <div className="w-20 h-20 bg-gradient-to-tl from-purple-600 to-blue-400 rounded-xl transform -rotate-12 flex items-center justify-center">
            <Store className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-4 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
            내 피어몰 만들기
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            최고급 템플릿과 도구로 몇 분 안에 당신만의 럭셔리한 세상을 구축하세요. 판매, 수익화까지 단 몇 번의 클릭만으로.
          </p>
          
          <div className="pt-4">
            <Button 
              onClick={onStartClick} 
              size="lg" 
              className="px-8 py-6 h-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-blue-500/30 group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <div className="relative flex items-center">
                <Store className="mr-2 h-6 w-6" />
                <span>내 피어몰 시작하기</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
            
            {/* <div className="mt-5 text-gray-400 text-sm">
              3% 낮은 수수료 · 무제한 제품 등록 · 프리미엄 템플릿
            </div> */}
          </div>
        </div>
        
        <div className="flex items-center space-x-8 pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-gray-300">안전한 거래</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-gray-300">빠른 성장</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Link2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-gray-300">쉬운 연동</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Define Types for Hero Section Props ---
type IndexState = ReturnType<typeof useIndexState>;

interface HeroSectionProps {
  state: IndexState;
  scrollToFeatures: () => void;
  onOpenCreateModal: () => void;
}

// --- Hero Section ---
const HeroSection = ({ state, scrollToFeatures, onOpenCreateModal }: HeroSectionProps) => (
  <section ref={state.heroRef} className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-b from-black via-gray-900 to-black text-gray-200 overflow-hidden">
    {/* Background Glows / Abstract Shapes */}
    <div className="absolute inset-0 z-0 opacity-25"> 
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900 rounded-full filter blur-[180px] opacity-50 animate-pulse-slow"></div> 
      <div className="absolute bottom-[-20%] right-[-10%] w-[45vw] h-[45vw] bg-purple-900 rounded-full filter blur-[180px] opacity-40 animate-pulse-slow animation-delay-2000"></div>
    </div>
    
    <div className="container mx-auto px-6 relative z-10"> 
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            내 손안의 쇼핑몰, Peermall
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto md:mx-0 leading-relaxed"> 
            귀한 고객들이 직접 사거나 팔 수 있는 새로운 쇼핑 플랫폼입니다. QR코드로 당신의 세상을 거번하고, 모두와 연결되어 확장하세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
            <Button onClick={scrollToFeatures} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black w-full sm:w-auto">
              주요 기능 살펴보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-10 md:mt-0">
          <PremiumPeermallCreator onStartClick={onOpenCreateModal} />
        </div>
      </div>
    </div>
  </section>
);

// --- Feature Item Component ---
interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}
const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 mt-1">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-100 mb-1">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

// --- Define Types for Features Section Props ---
interface FeaturesSectionProps {
  featuresRef: React.RefObject<HTMLDivElement>; // Type from useIndexState
}

// --- Features Section ---
// Define as standard function for consistency
const FeaturesSection = ({ featuresRef }: FeaturesSectionProps) => (
  <Section id="features" ref={featuresRef} className="bg-gray-900 text-gray-300" hasSeparator>
    {/* Increased spacing */}
    <div className="text-center mb-20"> 
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Peermall 기능 살펴보기</h2> 
      <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"> 
        당신의 디지털 자산을 관리하고, 커뮤니티와 소통하며, 안전하게 거래할 수 있는 강력한 기능들을 만나보세요.
      </p>
    </div>
    
    {/* Using a grid layout similar to examples - increased gap */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"> 
      <FeatureItem 
        icon={Layers} 
        title="나의 쇼핑몰 (Effortless Store Creation)" 
        description="쉽고 빠르게 나만의 온라인 쇼핑몰을 구축하세요. 복잡한 과정 없이 몇 분 만에 제품을 등록하고 판매를 시작할 수 있습니다. (수수료 3%)" 
      />
      <FeatureItem 
        icon={QrCode} 
        title="QR 코드 (Dynamic QR Codes)" 
        description="상품, 상점, 프로모션을 위한 QR 코드를 간편하게 생성하고 공유하세요. 오프라인과 온라인을 연결하는 효과적인 마케팅을 진행할 수 있습니다." 
      />
      <FeatureItem 
        icon={ShieldCheck} 
        title="인증 (Blockchain Authentication)" 
        description="블록체인 기술을 활용한 진품 인증 시스템으로 제품의 신뢰도를 높이고, 소유권 인증을 통해 안전한 거래를 보장합니다." 
      />
      <FeatureItem 
        icon={HeartHandshake} // Changed from User
        title="커뮤니티 (Integrated Community)" 
        description="사용자들과 소통하고 정보를 공유할 수 있는 커뮤니티 공간과 1:1 음성, 화상, 채팅 상담 서비스를 제공합니다." 
      />
       <FeatureItem 
        icon={Link2} // Represents connection/integration
        title="사이트 통합 (Seamless Integration)" 
        description="기존 웹사이트나 플랫폼에 Peermall 기능을 손쉽게 연동하여 사용자 경험을 확장하세요." 
      />
       <FeatureItem 
        icon={Zap} // Represents speed/power
        title="빠른 기능 접근" 
        description="QR 코드 생성, 나의 라운지, 피어몰 목록 등 주요 기능에 빠르게 접근하여 효율적으로 관리하세요." 
      />
    </div>
  </Section>
);

// --- Story Section ---
const StorySection = () => (
  <Section id="story" className="bg-black text-gray-300" hasSeparator>
    {/* Increased spacing */}
    <div className="text-center max-w-4xl mx-auto"> 
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Peermall 이야기</h2> 
      <p className="text-lg md:text-xl leading-relaxed text-gray-400">
        <strong className="text-blue-400">피어(Peer)의 귀족, 또래</strong> 등의 뜻과 <strong className="text-blue-400">몰(Mall)</strong>은 쇼핑하는 곳이라는 뜻의 합성어입니다. 귀족이 쇼핑하는 곳처럼, <strong className="text-white">귀한 고객들이 직접 사거나 팔 수 있는 품격 있는 사이트</strong>를 지향합니다.
      </p>
    </div>
  </Section>
);

// --- Vision & Mission Section ---
const VisionMissionSection = () => (
  <Section id="vision-mission" className="bg-gray-900 text-gray-300" hasSeparator>
    {/* Increased gap */}
    <div className="grid lg:grid-cols-2 gap-20 items-center"> 
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">우리의 비전과 미션</h2> 
        <div className="space-y-10"> {/* Increased space between vision/mission */}
          <div>
            <h3 className="flex items-center text-xl font-semibold text-blue-400 mb-4"> 
              <Sun className="h-6 w-6 mr-2" /> 우리의 비전
            </h3>
            <p className="text-gray-400 leading-relaxed"> 
              인간이 가상과 현실 세계를 거주지와 직장으로 사용할 수 있도록 고도화된 인터넷 서비스 인프라를 구축하고 운영하여 '지속 가능한 인간 사회'에서 살아가는 것입니다.
            </p>
          </div>
          <div>
            <h3 className="flex items-center text-xl font-semibold text-blue-400 mb-4"> 
              <CheckCheck className="h-6 w-6 mr-2" /> 우리의 미션
            </h3>
            <p className="text-gray-400 leading-relaxed"> 
              우리는 청정 커머스 서비스인 피어몰을 통해 지속 가능한 인간 사회를 만드는 일에 이바지하고자 합니다. 피어몰은 각각의 유저나 회사, 커뮤니티가 직접 거버넌스를 한다는 모토를 가지고 "내가 내 세상을 거번하고, 당신이 당신의 세상을 거번하고, 우리가 우리의 세상을 거번한다"는 철학적이고 기술적인 메커니즘을 통해 디지털-물리적 자산, 사업 및 프라이버시를 보호할 수 있는 인프라 시스템을 구축합니다.
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-64 md:h-96 mt-10 lg:mt-0">
        {/* Placeholder visual - slightly adjusted */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80"> 
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-25 filter blur-3xl"></div> 
            <Link2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 text-blue-400 opacity-60" /> 
            {/* Network/light elements */}
            <div className="absolute top-[30%] left-[30%] w-3 h-3 bg-blue-300 rounded-full animate-ping"></div> 
             <div className="absolute bottom-[30%] right-[30%] w-2 h-2 bg-purple-300 rounded-full animate-ping animation-delay-1000"></div> 
          </div>
        </div>
         <p className="absolute bottom-2 right-2 text-xs text-gray-600 italic">[Visualizing Connection & Governance]</p> 
      </div>
    </div>
  </Section>
);

// --- Values Section ---
interface ValueCardProps { title: string; description: string; }
const ValueCard: React.FC<ValueCardProps> = ({ title, description }) => (
  <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 h-full">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const ValuesSection = () => (
  <Section id="values" className="bg-black text-gray-300" hasSeparator>
    {/* Increased spacing */}
    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">우리의 가치</h2> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"> {/* Increased gap */}
      <ValueCard title="Relationship & Identification" description="관계와 정체성을 중요시하며 진정한 연결을 추구합니다." />
      <ValueCard title="3R (Role, Responsibility, Rights)" description="역할, 책임, 권리의 균형을 통한 자기 거버넌스를 지향합니다." />
      <ValueCard title="Quality of Life" description="삶의 질 향상을 위한 가치 창출에 기여합니다." />
      <ValueCard title="Private & Security" description="개인정보 보호와 보안을 최우선으로 생각합니다." />
      <ValueCard title="Holistic human society" description="총체적인 인간 사회를 위한 지속 가능한 발전을 추구합니다." />
    </div>
  </Section>
);

// --- Contact Section ---
const ContactSection = () => (
  <Section id="contact" className="bg-gray-900 text-gray-300">
    {/* Increased spacing */}
    <div className="text-center max-w-3xl mx-auto"> 
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">문의하기</h2> 
      <p className="text-lg text-gray-400 mb-10 leading-relaxed"> 
        Peermall에 대해 더 궁금한 점이 있으신가요? 지금 바로 문의하세요!
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
        <Input 
          type="email" 
          placeholder="이메일을 입력하세요" 
          className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 rounded-full px-5 py-3" // Rounded input
        />
         {/* Ensured consistent button styling */}
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"> 
          문의하기
        </Button>
      </div>
    </div>
  </Section>
);

// --- Index Page Component ---
const Index = () => {
  const state = useIndexState();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    // Check if user is authenticated before opening
    const isAuthenticated = localStorage.getItem('peermall-user-authenticated') === 'true';
    if (!isAuthenticated) {
      toast({
        title: "로그인 필요",
        description: "피어몰을 생성하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      // Optionally redirect to login or just show the toast
      // navigate('/login'); 
      return; 
    }
    setIsCreateModalOpen(true);
  };
  
  return (
    <div className="min-h-screen font-sans antialiased bg-black">
      <HeroSection 
        state={state} 
        scrollToFeatures={state.scrollToFeatures}
        onOpenCreateModal={handleOpenCreateModal}
      />
      <FeaturesSection featuresRef={state.featuresRef} />
      <StorySection />
      <VisionMissionSection />
      <ValuesSection />
      <ContactSection />
      
      {/* Render the modal */}
      <PeermallCreateModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} // Reverted to onClose
      />
    </div>
  );
};

export default Index;
