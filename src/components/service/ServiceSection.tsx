
import React, { useState } from 'react';
import { Store, Hash, Users, MessageCircle, Megaphone, Monitor, Check, Star, Zap } from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceDetailModal from './ServiceDetailModal';
import { ServiceDetail } from '@/types/service';

// Service data with detailed information for each service
const coreServices: ServiceDetail[] = [
  { 
    id: 'create-mall', 
    name: '피어몰 만들기', 
    shortDescription: '나만의 온라인 스토어 생성',
    description: '피어몰은 온라인에서 당신만의 공간을 손쉽게 만들 수 있는 서비스입니다. 복잡한 코딩 지식 없이도 몇 분 안에 전문적인 쇼핑몰을 만들고, 상품과 서비스를 효과적으로 홍보할 수 있습니다. 템플릿과 커스터마이징 옵션을 통해 브랜드 아이덴티티를 완벽하게 표현해보세요.',
    icon: <Store className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070',
    features: [
      { 
        name: '쉬운 설정',
        description: '3단계 설정으로 몇 분 안에 쇼핑몰 완성',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: '다양한 템플릿',
        description: '산업별 최적화된 디자인 템플릿 제공',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '커스터마이징',
        description: '로고, 색상, 레이아웃 등 자유롭게 변경',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070',
        caption: '쉬운 관리자 대시보드'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2072',
        caption: '모바일 최적화 디자인'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=2071',
        caption: '다양한 결제 옵션'
      }
    ],
    useCases: [
      {
        title: '패션 브랜드',
        description: '자신만의 의류 브랜드를 온라인에서 운영하며 글로벌 고객층에게 접근'
      },
      {
        title: '디지털 콘텐츠 판매',
        description: 'e북, 온라인 강좌, 디지털 아트 등을 판매하는 전문 플랫폼 구축'
      }
    ],
    demoUrl: '/demo/create-mall'
  },
  { 
    id: 'generate-number', 
    name: '고유 번호 생성', 
    shortDescription: '나만의 고유 식별 번호 발급',
    description: '피어몰의 고유 번호 생성 시스템은 사용자와 상품을 위한 안전하고 독특한 식별자를 제공합니다. 블록체인 기술을 활용하여 위변조가 불가능한 고유 번호를 발급받고, 이를 통해 제품의 진위 여부 확인, 멤버십 관리, 이벤트 참여 등 다양한 서비스에 활용할 수 있습니다.',
    icon: <Hash className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2032',
    features: [
      { 
        name: '블록체인 기술',
        description: '위변조 불가능한 안전한 고유 번호 발급',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: 'QR코드 연동',
        description: '스캔으로 쉽게 확인 가능한 QR코드 자동 생성',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '다목적 활용',
        description: '상품 인증, 회원 관리, 이벤트 등에 활용',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=2071',
        caption: '번호 생성 인터페이스'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1548092372-0d1bd40894a3?auto=format&fit=crop&q=80&w=2070',
        caption: 'QR코드 관리 대시보드'
      }
    ],
    useCases: [
      {
        title: '명품 브랜드',
        description: '각 제품에 고유 번호를 부여하여 정품 인증 및 중고 거래 시 진위 여부 확인'
      },
      {
        title: '티켓 발급',
        description: '이벤트나 공연을 위한 위조 불가능한 디지털 티켓 생성 및 관리'
      }
    ],
    demoUrl: '/demo/generate-number'
  },
  { 
    id: 'build-community', 
    name: '커뮤니티 형성', 
    shortDescription: '관심사 기반 커뮤니티 구축',
    description: '피어몰 커뮤니티 기능을 통해 고객, 팬, 지지자들이 소통하고 교류할 수 있는 온라인 공간을 만들어보세요. 포럼, 그룹 채팅, 이벤트 등 다양한 상호작용 도구를 제공하여 활발한 커뮤니티를 구축하고 브랜드 충성도를 높일 수 있습니다.',
    icon: <Users className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&q=80&w=2074',
    features: [
      { 
        name: '멀티채널 커뮤니케이션',
        description: '포럼, 그룹 채팅, 댓글 등 다양한 소통 방식',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: '회원 등급 시스템',
        description: '참여도와 기여도에 따른 등급 부여와 혜택',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '이벤트 관리',
        description: '온/오프라인 이벤트 생성 및 참가 관리',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2070',
        caption: '커뮤니티 포럼 화면'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&q=80&w=2069',
        caption: '그룹 채팅 인터페이스'
      }
    ],
    useCases: [
      {
        title: '취미 클럽',
        description: '동일한 취미를 가진 사람들이 경험과 정보를 공유하는 커뮤니티 플랫폼'
      },
      {
        title: '브랜드 커뮤니티',
        description: '고객들이 제품 사용 경험을 공유하고 질문하는 브랜드 중심 커뮤니티'
      }
    ],
    demoUrl: '/demo/build-community'
  },
  { 
    id: 'direct-communication', 
    name: '다이렉트 통신', 
    shortDescription: '번호 기반 1:1 소통',
    description: '고유 번호를 활용한 안전한 1:1 통신 시스템으로 개인정보 노출 없이 직접적인 소통이 가능합니다. 이메일, 메시징, 화상 통화 등을 통해 비즈니스 파트너, 고객, 또는 지인과 안전하고 효과적으로 소통하세요.',
    icon: <MessageCircle className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2987',
    features: [
      { 
        name: '멀티미디어 메시징',
        description: '텍스트, 이미지, 영상, 파일 등 다양한 형태의 메시지 전송',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: '화상 회의',
        description: '고품질 영상 및 화면 공유 기능이 포함된 화상 회의',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '통신 보안',
        description: '종단간 암호화 및 임시 링크로 보안 강화',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070',
        caption: '메시징 인터페이스'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=2071',
        caption: '화상 통화 화면'
      }
    ],
    useCases: [
      {
        title: '고객 상담',
        description: '기업과 고객 간의 안전하고 효율적인 1:1 상담 시스템'
      },
      {
        title: '비즈니스 미팅',
        description: '파트너사와의 보안이 중요한 비즈니스 협상 및 미팅'
      }
    ],
    demoUrl: '/demo/direct-communication'
  },
  { 
    id: 'promote-content', 
    name: '콘텐츠 홍보', 
    shortDescription: '제품/서비스 효과적 노출',
    description: '콘텐츠 홍보 도구를 통해 제품, 서비스, 아이디어를 효과적으로 알리세요. 타겟 마케팅, 소셜 미디어 연동, 분석 도구 등을 활용하여 마케팅 효과를 극대화하고 잠재 고객의 관심을 끌어보세요.',
    icon: <Megaphone className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070',
    features: [
      { 
        name: '타겟팅 광고',
        description: '관심사, 위치, 행동 패턴 기반의 정확한 타겟팅',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: '소셜 미디어 연동',
        description: '주요 소셜 플랫폼과의 원활한 통합',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '성과 분석',
        description: '상세한 데이터와 시각적 대시보드로 마케팅 효과 측정',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
        caption: '광고 캠페인 대시보드'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=2070',
        caption: '성과 분석 리포트'
      }
    ],
    useCases: [
      {
        title: '신제품 출시',
        description: '새로운 제품을 시장에 소개하고 초기 인지도를 높이는 마케팅 캠페인'
      },
      {
        title: '이벤트 홍보',
        description: '세미나, 워크샵, 컨퍼런스 등 이벤트의 참가자 유치를 위한 홍보'
      }
    ],
    demoUrl: '/demo/promote-content'
  },
  { 
    id: 'shared-browsing', 
    name: '함께 보기', 
    shortDescription: '실시간 웹사이트 공유',
    description: '웹사이트 함께 보기 기능으로 실시간 협업과 공유의 효율성을 높이세요. 같은 화면을 보면서 상담, 교육, 협업이 가능하며 화면 공유, 포인터, 주석 등의 도구로 원활한 소통이 가능합니다.',
    icon: <Monitor className="w-8 h-8" />,
    bannerImageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=2070',
    features: [
      { 
        name: '실시간 화면 공유',
        description: '지연 없는 고품질 화면 공유와 동기화',
        icon: <Check className="w-5 h-5" />
      },
      { 
        name: '상호작용 도구',
        description: '포인터, 드로잉, 주석 등 다양한 상호작용 기능',
        icon: <Star className="w-5 h-5" />
      },
      { 
        name: '세션 기록',
        description: '공유 세션 녹화 및 저장 기능',
        icon: <Zap className="w-5 h-5" />
      }
    ],
    screenshots: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1600172454235-2b0a4e9a6338?auto=format&fit=crop&q=80&w=2087',
        caption: '공동 브라우징 인터페이스'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=2074',
        caption: '주석 및 드로잉 기능'
      }
    ],
    useCases: [
      {
        title: '원격 고객 지원',
        description: '고객과 동일한 화면을 보며 실시간으로 문제 해결을 돕는 고객 지원'
      },
      {
        title: '온라인 교육',
        description: '교사와 학생들이 같은 웹 페이지를 보며 진행하는 상호작용적 학습'
      }
    ],
    demoUrl: '/demo/shared-browsing'
  }
];

const ServiceSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="text-3xl font-bold text-text-100 mb-8 text-center">
        피어몰 핵심 서비스
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coreServices.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            icon={service.icon}
            description={service.shortDescription}
            onClick={() => handleServiceClick(service)}
          />
        ))}
      </div>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ServiceSection;
