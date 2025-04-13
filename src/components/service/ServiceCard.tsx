
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, icon, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-bg-200 rounded-xl p-6 border border-bg-300 hover:border-accent-100 hover:shadow-lg cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      <div className="mb-4 h-14 w-14 flex items-center justify-center bg-primary-100/20 text-primary-100 rounded-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-text-100 mb-2">
        {name}
      </h3>
      <p className="text-text-200 mb-4">
        {description}
      </p>
      <div className="flex items-center text-accent-100 font-medium">
        <span className="mr-1">자세히 보기</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
