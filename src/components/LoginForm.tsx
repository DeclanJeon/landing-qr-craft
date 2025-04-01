
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      
      toast({
        title: "인증 링크 발송 완료",
        description: `${email}로 로그인 링크를 발송했습니다. 이메일을 확인해주세요.`,
      });
      
      // Save email for later use
      localStorage.setItem('peermall-user-email', email);
    }, 1500);
  };
  
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          이메일을 입력하시면 로그인 링크를 보내드립니다. 별도의 회원가입이 필요없습니다.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isSent ? (
          <form onSubmit={handleSubmit}>
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
                {isLoading ? "전송 중..." : "로그인 링크 받기"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">이메일을 확인해주세요</h3>
            <p className="text-gray-500 mb-4">
              {email}로 로그인 링크를 발송했습니다.
              이메일에서 링크를 클릭하여 로그인을 완료해주세요.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsSent(false)}
            >
              다른 이메일로 시도
            </Button>
          </div>
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
