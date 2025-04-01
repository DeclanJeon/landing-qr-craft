
import React from 'react';

interface AboutIntroProps {
  shopName?: string;
}

const AboutIntro: React.FC<AboutIntroProps> = ({ shopName }) => {
  return (
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
  );
};

export default AboutIntro;
