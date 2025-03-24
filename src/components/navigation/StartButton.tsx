
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const StartButton = () => {
  return (
    <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">
      <Link to="/personal-lounge" className="text-white">내 피어몰 만들기</Link>
    </Button>
  );
};

export default StartButton;
