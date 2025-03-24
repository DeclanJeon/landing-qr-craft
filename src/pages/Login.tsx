
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
            <h1 className="text-3xl font-bold text-center mb-8">Peermall 로그인</h1>
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
