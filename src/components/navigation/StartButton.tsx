
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const StartButton = () => {
  return (
    <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">
      <Link to="/personal-lounge" className="text-white flex items-center">
        <Plus className="h-4 w-4 mr-1" />
        내 피어몰 만들기
      </Link>
    </Button>
  );
};

export default StartButton;
