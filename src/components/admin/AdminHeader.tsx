
import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col w-full mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1 text-sm md:text-base">{subtitle}</p>}
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          {!isMobile ? (
            <>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                알림
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                설정
              </Button>
            </>
          ) : (
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Menu className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
