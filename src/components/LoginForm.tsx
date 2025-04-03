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
    // Apply dark theme to Card
    <Card className="max-w-md w-full bg-gray-800/50 border-gray-700 text-gray-200">
      <CardHeader>
         {/* Update text colors */}
        <CardTitle className="text-2xl text-white">로그인</CardTitle>
        <CardDescription className="text-gray-400">
          {!isSent
            ? "이메일을 입력하시면 인증코드를 보내드립니다. 별도의 회원가입이 필요없습니다."
            : !isVerifying
              ? "이메일을 확인하고 인증을 진행해주세요."
              : "이메일로 받은 6자리 인증코드를 입력해주세요."
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6"> {/* Added top padding */}
        {!isSent ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-4">
              <div className="relative">
                 {/* Update icon color */}
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                 {/* Update input style */}
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

              {/* Update button style */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "전송 중..." : "인증코드 받기"}
              </Button>
            </div>
          </form>
        ) : !isVerifying ? (
          <div className="text-center py-4">
             {/* Update icon background/color */}
            <div className="mx-auto w-16 h-16 bg-green-900/50 border border-green-700 rounded-full flex items-center justify-center mb-5">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
             {/* Update text colors */}
            <h3 className="text-lg font-medium mb-2 text-gray-100">이메일을 확인해주세요</h3>
            <p className="text-gray-400 mb-6">
              {email}로 인증코드를 발송했습니다.
              이메일에서 인증코드를 확인한 후 계속 진행해주세요.
            </p>
            <div className="space-y-3">
               {/* Update button styles */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={startVerification}
              >
                인증코드 입력하기 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
                onClick={handleResendCode}
              >
                인증코드 재발송
              </Button>
              <Button
                variant="ghost"
                className="w-full text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                onClick={handleBackToEmail}
              >
                다른 이메일로 시도
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5"> {/* Increased spacing */}
            <div className="text-center mb-4">
               {/* Update text color */}
              <p className="text-sm text-gray-400 mb-2">
                {email}로 발송된 6자리 인증코드를 입력해주세요
              </p>
            </div>

            <div className="flex justify-center mb-5"> {/* Increased margin */}
               {/* Apply dark theme styles to InputOTP if needed (might inherit or need custom styling) */}
               {/* Assuming InputOTP slots might need styling, add classes if necessary */}
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                disabled={isLoading}
                // Add dark theme classes to InputOTPGroup and InputOTPSlot if needed
                // e.g., className="[&>div]:border-gray-600 [&>div]:bg-gray-700 [&>div]:text-white"
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
               {/* Update button styles */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || otpValue.length !== 6}
              >
                {isLoading ? "인증 중..." : "인증코드 확인"}
                {!isLoading && otpValue.length === 6 && <Check className="ml-1 h-4 w-4" />}
              </Button>
              <div className="flex gap-2">
                 {/* Update button styles */}
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  인증코드 재발송
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
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

      {/* Update footer text/link colors */}
      <CardFooter className="flex flex-col space-y-4 pt-6 border-t border-gray-700"> 
        <div className="text-sm text-gray-500 text-center w-full">
          로그인하시면 Peermall의 <a href="#" className="text-blue-400 hover:underline">이용약관</a>과 <a href="#" className="text-blue-400 hover:underline">개인정보처리방침</a>에 동의하게 됩니다.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
