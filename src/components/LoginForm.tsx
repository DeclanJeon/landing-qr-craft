
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, Check } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "유효한 이메일을 입력해주세요",
        description: "로그인을 위해 올바른 이메일 형식이 필요합니다.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      
      toast({
        title: "인증코드 발송 완료",
        description: `${email}로 인증코드를 발송했습니다. 이메일을 확인해주세요.`,
      });
      
      // For demo purposes, show the OTP in console
      console.log(`인증코드: ${otp}`);
      
      // Save email for later use
      localStorage.setItem('peermall-user-email', email);
    }, 1500);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpValue.length !== 6) {
      toast({
        title: "인증코드 오류",
        description: "6자리 인증코드를 모두 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Verify OTP
    setTimeout(() => {
      setIsLoading(false);
      
      if (otpValue === generatedOtp) {
        toast({
          title: "로그인 성공",
          description: "인증이 완료되어 로그인되었습니다.",
        });
        
        // Store authentication state
        localStorage.setItem('peermall-user-authenticated', 'true');
        
        // Redirect to home or dashboard
        window.location.href = '/';
      } else {
        toast({
          title: "인증코드 불일치",
          description: "입력한 인증코드가 올바르지 않습니다. 다시 확인해주세요.",
          variant: "destructive"
        });
      }
    }, 1000);
  };
  
  const handleResendCode = () => {
    // Generate a new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    toast({
      title: "인증코드 재발송 완료",
      description: `${email}로 새 인증코드를 발송했습니다.`,
    });
    
    // For demo purposes, show the OTP in console
    console.log(`새 인증코드: ${newOtp}`);
  };
  
  const handleBackToEmail = () => {
    setIsSent(false);
    setIsVerifying(false);
    setOtpValue('');
  };
  
  const startVerification = () => {
    setIsVerifying(true);
  };
  
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          {!isSent 
            ? "이메일을 입력하시면 인증코드를 보내드립니다. 별도의 회원가입이 필요없습니다."
            : !isVerifying 
              ? "이메일을 확인하고 인증을 진행해주세요."
              : "이메일로 받은 6자리 인증코드를 입력해주세요."
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isSent ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="example@peermall.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "전송 중..." : "인증코드 받기"}
              </Button>
            </div>
          </form>
        ) : !isVerifying ? (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">이메일을 확인해주세요</h3>
            <p className="text-gray-500 mb-4">
              {email}로 인증코드를 발송했습니다.
              이메일에서 인증코드를 확인한 후 계속 진행해주세요.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={startVerification}
              >
                인증코드 입력하기 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleResendCode}
              >
                인증코드 재발송
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={handleBackToEmail}
              >
                다른 이메일로 시도
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-2">
                {email}로 발송된 6자리 인증코드를 입력해주세요
              </p>
            </div>
            
            <div className="flex justify-center mb-4">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || otpValue.length !== 6}
              >
                {isLoading ? "인증 중..." : "인증코드 확인"}
                {!isLoading && otpValue.length === 6 && <Check className="ml-1 h-4 w-4" />}
              </Button>
              <div className="flex gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  인증코드 재발송
                </Button>
                <Button 
                  type="button"
                  variant="ghost" 
                  className="flex-1"
                  onClick={handleBackToEmail}
                  disabled={isLoading}
                >
                  이메일 다시 입력
                </Button>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 text-center w-full">
          로그인하시면 Peermall의 <a href="#" className="text-blue-600 hover:underline">이용약관</a>과 <a href="#" className="text-blue-600 hover:underline">개인정보처리방침</a>에 동의하게 됩니다.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
