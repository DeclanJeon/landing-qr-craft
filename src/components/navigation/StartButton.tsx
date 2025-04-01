
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import PeermallCreateModal from '../PeermallCreateModal';

const StartButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={openModal} className="hidden md:flex bg-blue-600 hover:bg-blue-700">
        <span className="text-white flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          내 피어몰 만들기
        </span>
      </Button>
      
      <PeermallCreateModal open={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default StartButton;
