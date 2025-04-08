
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight, Check, RefreshCw, ChevronLeft, LockKeyhole } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: number | null = null;
    if (countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

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
      setCountdown(180); // 3 minutes countdown

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
        localStorage.setItem('peermall-user-nickname', '사용자');

        // Redirect to home or dashboard after successful login
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
    if (countdown > 0) return;
    
    // Generate a new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setCountdown(180); // Reset countdown

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

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className="w-full max-w-md bg-gray-800/70 border border-gray-700 shadow-2xl backdrop-blur-sm text-gray-200 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-white">
          {!isSent ? "이메일로 인증하기" : !isVerifying ? "이메일을 확인해주세요" : "인증코드 입력"}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {!isSent
            ? "이메일을 입력하시면 인증코드를 보내드립니다. 별도의 회원가입이 필요없습니다."
            : !isVerifying
              ? "이메일을 확인하고 인증을 진행해주세요."
              : "이메일로 받은 6자리 인증코드를 입력해주세요."
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form 
              key="emailForm"
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailSubmit}
              className="space-y-4"
            >
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="example@peermall.com"
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 전송 중...</>
                ) : (
                  <>인증코드 받기 <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </motion.form>
          ) : !isVerifying ? (
            <motion.div 
              key="emailVerify"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4"
            >
              <div className="mx-auto w-20 h-20 bg-blue-900/30 border border-blue-700/50 rounded-full flex items-center justify-center mb-5">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              
              <h3 className="text-lg font-medium mb-2 text-gray-100">이메일을 확인해주세요</h3>
              <p className="text-gray-400 mb-6">
                <span className="font-medium text-blue-400">{email}</span>로 인증코드를 발송했습니다.
                이메일에서 인증코드를 확인한 후 계속 진행해주세요.
              </p>
              
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={startVerification}
                >
                  인증코드 입력하기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 group"
                  onClick={handleResendCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? (
                    <><RefreshCw className="mr-2 h-4 w-4" /> {formatCountdown()} 후 재전송 가능</>
                  ) : (
                    <>인증코드 재발송 <RefreshCw className="ml-2 h-4 w-4 group-hover:animate-spin" /></>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                  onClick={handleBackToEmail}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> 다른 이메일로 시도
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              key="otpForm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerifyOtp} 
              className="space-y-5"
            >
              <div className="text-center mb-4">
                <div className="mx-auto w-16 h-16 bg-purple-900/30 border border-purple-700/50 rounded-full flex items-center justify-center mb-4">
                  <LockKeyhole className="h-7 w-7 text-purple-400" />
                </div>
                
                <p className="text-sm text-gray-400 mb-2">
                  <span className="font-medium text-blue-400">{email}</span>로 발송된
                  <br />6자리 인증코드를 입력해주세요
                </p>
                
                {countdown > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    남은 시간: <span className="text-blue-400 font-mono">{formatCountdown()}</span>
                  </p>
                )}
              </div>

              <div className="flex justify-center mb-5">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  disabled={isLoading}
                  className="otp-input-dark gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                    <InputOTPSlot index={1} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                    <InputOTPSlot index={2} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                    <InputOTPSlot index={3} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                    <InputOTPSlot index={4} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                    <InputOTPSlot index={5} className="bg-gray-700 border-gray-600 text-white h-12 w-10 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  disabled={isLoading || otpValue.length !== 6}
                >
                  {isLoading ? (
                    <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> 인증 중...</>
                  ) : (
                    <>인증코드 확인 {otpValue.length === 6 && <Check className="ml-2 h-4 w-4" />}</>
                  )}
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    onClick={handleResendCode}
                    disabled={isLoading || countdown > 0}
                  >
                    {countdown > 0 ? formatCountdown() : "재발송"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                  >
                    이메일 수정
                  </Button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-6 border-t border-gray-700"> 
        <div className="text-sm text-gray-500 text-center w-full">
          로그인하시면 Peermall의 <a href="#" className="text-blue-400 hover:underline">이용약관</a>과 <a href="#" className="text-blue-400 hover:underline">개인정보처리방침</a>에 동의하게 됩니다.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
