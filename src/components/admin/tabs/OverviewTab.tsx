
import React from 'react';
import StatCard from '../dashboard/StatCard';
import ActivityCard from '../dashboard/ActivityCard';
import PopularMallsCard from '../dashboard/PopularMallsCard';

const OverviewTab: React.FC = () => {
  // Mock data for statistics
  const stats = [
    {
      title: "총 회원수",
      value: "8,249",
      trend: { value: "12.5% 증가", isPositive: true }
    },
    {
      title: "신규 주문",
      value: "382",
      trend: { value: "8.2% 증가", isPositive: true }
    },
    {
      title: "판매량",
      value: "₩12.4M",
      trend: { value: "3.1% 감소", isPositive: false }
    },
    {
      title: "방문자",
      value: "31,249",
      trend: { value: "24.5% 증가", isPositive: true }
    }
  ];

  // Mock data for activities
  const activities = [
    { type: '새로운 회원 가입', description: 'user123@example.com 님이 가입했습니다.', timeAgo: '15분 전' },
    { type: '새로운 회원 가입', description: 'user456@example.com 님이 가입했습니다.', timeAgo: '30분 전' },
    { type: '새로운 회원 가입', description: 'user789@example.com 님이 가입했습니다.', timeAgo: '45분 전' },
    { type: '새로운 회원 가입', description: 'user012@example.com 님이 가입했습니다.', timeAgo: '60분 전' }
  ];

  // Mock data for popular malls
  const popularMalls = [
    {name: "전자기기 피어몰", visits: "1,249", increase: "12.5%"},
    {name: "패션 피어몰", visits: "945", increase: "8.3%"},
    {name: "식품 피어몰", visits: "821", increase: "5.1%"},
    {name: "홈리빙 피어몰", visits: "675", increase: "3.7%"}
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityCard activities={activities} />
        <PopularMallsCard malls={popularMalls} />
      </div>
    </>
  );
};

export default OverviewTab;
