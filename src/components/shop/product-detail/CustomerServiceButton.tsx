
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Video, 
  HeadphonesIcon,
  XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from '@/hooks/use-toast';

interface CustomerServiceButtonProps {
  onChatConsult: () => void;
  onVoiceConsult: () => void;
  onVideoConsult: () => void;
}

const CustomerServiceButton: React.FC<CustomerServiceButtonProps> = ({
  onChatConsult,
  onVoiceConsult,
  onVideoConsult
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          className="w-full" 
          variant="outline"
          size="lg"
        >
          <HeadphonesIcon className="h-5 w-5 mr-2" />
          고객 상담
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="center">
        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="ghost" 
            className="flex justify-start items-center"
            onClick={() => {
              onChatConsult();
              setIsOpen(false);
            }}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            채팅 상담
          </Button>
          <Button 
            variant="ghost" 
            className="flex justify-start items-center"
            onClick={() => {
              onVoiceConsult();
              setIsOpen(false);
            }}
          >
            <Phone className="h-4 w-4 mr-2" />
            음성 상담
          </Button>
          <Button 
            variant="ghost" 
            className="flex justify-start items-center"
            onClick={() => {
              onVideoConsult();
              setIsOpen(false);
            }}
          >
            <Video className="h-4 w-4 mr-2" />
            화상 상담
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomerServiceButton;
