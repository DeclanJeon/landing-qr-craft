
import React from 'react';
import { QrCode, Shield, Key, Users, FileCheck } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-6">피어몰의 주요 기능</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* QR코드 생성 */}
        <FeatureCard 
          icon={<QrCode className="h-8 w-8 text-blue-500" />}
          title="QR코드 생성"
          listItems={[
            "사용자 정의 QR코드 생성",
            "스토어 QR코드 생성",
            "제품 QR코드 생성",
            "Call QR코드 생성",
            "Email QR코드 생성"
          ]}
        />
        
        {/* 진품인증 */}
        <FeatureCard 
          icon={<Shield className="h-8 w-8 text-blue-500" />}
          title="진품인증"
          description="제품이 진품인지 아닌지를 인증하는 기능입니다. 피어몰은 신뢰할 수 있는 제품 인증 시스템을 통해 고객에게 진품을 보장합니다."
        />
        
        {/* 소유권 인증 */}
        <FeatureCard 
          icon={<Key className="h-8 w-8 text-blue-500" />}
          title="소유권 인증"
          description="제품의 소유권이 어디에 있는지 본인인지 아니면 다른 사람인지 그 사람은 누구인지에 대한 내용을 보여주며 자신의 소유라면 UI/UX로 나타납니다."
        />
        
        {/* 커뮤니티 */}
        <FeatureCard 
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="커뮤니티"
          listItems={[
            "게시판, 채팅, 음성채팅, 화상채팅",
            "화이트보드, 회의, 미팅",
            "비밀 채팅"
          ]}
        />
        
        {/* QR코드 검증 */}
        <FeatureCard 
          icon={<FileCheck className="h-8 w-8 text-blue-500" />}
          title="QR코드 검증"
          description="피어몰은 QR코드의 진위여부를 검증하는 기능을 제공합니다. 파일 검증을 통해 안전한 QR코드 사용 환경을 조성합니다."
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
