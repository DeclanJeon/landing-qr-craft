
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";

interface LoginFormProps {
  onLoginSuccess?: () => void; // Make it optional to maintain compatibility
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle email submission
  const handleEmailSubmit = () => {
    if (!email.trim()) {
      toast({
        title: "이메일을 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.includes('@')) {
      toast({
        title: "유효한 이메일 주소를 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Generate a random 6-digit code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(randomCode);
    
    // Mock email sending with a log
    console.log('info: 인증코드:', randomCode);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      
      toast({
        title: "인증 코드가 발송되었습니다",
        description: "이메일로 전송된 6자리 코드를 입력해주세요.",
      });
    }, 1500);
  };
  
  // Handle verification code submission
  const handleVerificationSubmit = () => {
    if (!verificationCode.trim()) {
      toast({
        title: "인증 코드를 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Check if the entered code matches the generated code
    setTimeout(() => {
      setIsLoading(false);
      
      if (verificationCode === generatedCode) {
        // Store authentication state in localStorage
        localStorage.setItem('peermall-user-authenticated', 'true');
        localStorage.setItem('peermall-user-email', email);
        localStorage.setItem('peermall-user-nickname', email.split('@')[0]);
        
        // Show success message
        toast({
          title: "인증 완료",
          description: "성공적으로 로그인되었습니다.",
        });
        
        // Call the success callback if provided
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Fallback if no callback is provided (for backward compatibility)
          window.location.href = '/';
        }
      } else {
        toast({
          title: "인증 실패",
          description: "올바른 인증 코드를 입력해주세요.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-700"
    >
      <h2 className="text-xl font-semibold text-white mb-6">이메일 인증</h2>
      
      {step === 1 ? (
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
              placeholder="이메일 주소"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          
          <Button 
            onClick={handleEmailSubmit} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>처리 중...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>인증 코드 받기</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
          
          <div className="relative flex items-center gap-4 py-2">
            <Separator className="flex-1 bg-gray-700" />
            <span className="text-xs text-gray-500">또는</span>
            <Separator className="flex-1 bg-gray-700" />
          </div>
          
          <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
            소셜 로그인
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm mb-4">
            <span className="font-medium text-blue-400">{email}</span>로 6자리 인증 코드를 발송했습니다. 이메일을 확인하세요.
          </p>
          
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
              placeholder="6자리 인증 코드"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              disabled={isLoading}
            />
          </div>
          
          <Button 
            onClick={handleVerificationSubmit} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>인증 중...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>인증 코드 확인</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
          
          <div className="flex justify-between text-sm">
            <button 
              className="text-gray-400 hover:text-blue-400 transition-colors" 
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              이메일 변경
            </button>
            <button 
              className="text-gray-400 hover:text-blue-400 transition-colors"
              onClick={handleEmailSubmit}
              disabled={isLoading}
            >
              인증 코드 재발송
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LoginForm;
