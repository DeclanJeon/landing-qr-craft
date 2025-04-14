
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';
import { Store, Hash, Users, MessageCircle } from 'lucide-react';

const ServiceSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);

  // 피어몰 핵심 서비스 카테고리
  const coreServices = [
    {
      id: 'create-mall',
      name: '피어몰 생성',
      description: '나만의 온라인 상점을 몇 분 안에 만들어보세요.',
      icon: <Store className="h-6 w-6" />
    },
    {
      id: 'generate-number',
      name: '고유번호 발급',
      description: '고객과 직접 연결되는 고유 번호를 발급받으세요.',
      icon: <Hash className="h-6 w-6" />
    },
    {
      id: 'build-community',
      name: '커뮤니티 구축',
      description: '고객과 소통할 수 있는 커뮤니티를 만들어보세요.',
      icon: <Users className="h-6 w-6" />
    },
    {
      id: 'direct-communication',
      name: '1:1 채팅 상담',
      description: '실시간으로 고객의 문의에 응답하세요.',
      icon: <MessageCircle className="h-6 w-6" />
    }
  ];

  const handleOpenServiceModal = (service: typeof coreServices[0]) => {
    setSelectedService(service);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-text-100 mb-2">피어몰 핵심 서비스</h2>
        <p className="text-lg text-text-200 max-w-2xl mx-auto">
          피어몰의 다양한 기능으로 온라인 비즈니스를 성장시켜 보세요
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreServices.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.name}
            description={service.description}
            onClick={() => handleOpenServiceModal(service)}
          />
        ))}
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default ServiceSection;
