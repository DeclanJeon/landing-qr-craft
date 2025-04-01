
import React from 'react';
import AboutIntro from './about/AboutIntro';
import FeaturesSection from './about/FeaturesSection';
import BenefitsSection from './about/BenefitsSection';
import CallToAction from './about/CallToAction';

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
      
      <AboutIntro shopName={shopData.shopName} />
      <FeaturesSection />
      <BenefitsSection />
      <CallToAction />
    </div>
  );
};

export default AboutPage;
