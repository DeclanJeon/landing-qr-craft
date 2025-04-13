
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ServiceDetail } from '@/types/service';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-bg-100 border-bg-300 max-w-3xl p-0 overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary-100 to-primary-200 h-28 md:h-40">
          {service.bannerImageUrl && (
            <img
              src={service.bannerImageUrl}
              alt={`${service.name} banner`}
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-100/60 to-primary-200/60" />
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-primary-200/50 rounded-full h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-6 right-6 flex items-center">
            <div className="bg-bg-100 rounded-full p-3 mr-4 shadow-lg">
              {service.icon}
            </div>
            <div>
              <DialogTitle className="text-white text-2xl font-bold">{service.name}</DialogTitle>
              <p className="text-white/90 text-sm mt-1">{service.shortDescription}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text-100 mb-3">서비스 소개</h3>
            <p className="text-text-200 leading-relaxed">{service.description}</p>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-100 mb-3">주요 기능</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start bg-bg-200 p-4 rounded-lg">
                    <div className="text-accent-100 mr-3 mt-1">{feature.icon}</div>
                    <div>
                      <p className="font-medium text-text-100 mb-1">{feature.name}</p>
                      <p className="text-sm text-text-200">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.screenshots && service.screenshots.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-100 mb-4">스크린샷</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.screenshots.map((screenshot, index) => (
                  <div key={index} className="bg-bg-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={screenshot.imageUrl}
                      alt={screenshot.caption || `Screenshot ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    {screenshot.caption && (
                      <p className="p-2 text-sm text-text-200">{screenshot.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.useCases && service.useCases.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-100 mb-3">활용 사례</h3>
              <div className="bg-bg-200 rounded-lg p-4">
                <ul className="space-y-4">
                  {service.useCases.map((useCase, index) => (
                    <li key={index} className="pb-4 border-b border-bg-300 last:border-0 last:pb-0">
                      <p className="font-medium text-text-100 mb-2">{useCase.title}</p>
                      <p className="text-text-200 text-sm">{useCase.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
            {service.demoUrl && (
              <Button variant="outline" className="border-primary-100 text-primary-100 hover:bg-primary-100/10">
                데모 체험하기
              </Button>
            )}
            <Button className="bg-accent-100 hover:bg-accent-200 text-white">
              지금 시작하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
