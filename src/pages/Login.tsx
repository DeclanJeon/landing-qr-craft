
import React from 'react';
import Navigation from '@/components/Navigation';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Peermall 로그인 / 가입</h1>
            <p className="text-center text-gray-500 mb-8">이메일 인증으로 간편하게 로그인하세요. 별도의 회원가입이 필요하지 않습니다.</p>
            <div className="flex justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
