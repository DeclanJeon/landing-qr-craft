
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  
  // Function to handle successful login
  const handleLoginSuccess = () => {
    // Show success toast notification
    toast({
      title: "로그인 성공",
      description: "인증이 완료되었습니다.",
      variant: "default",
    });
    
    // Redirect to home page
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-center text-white mb-3 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Peermall 로그인
            </span>
          </h1>
          <p className="text-center text-gray-300 mb-10 leading-relaxed">
            이메일 인증으로 간편하게 로그인하세요. 별도의 회원가입이 필요하지 않습니다.
          </p>
          <div className="flex justify-center">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
