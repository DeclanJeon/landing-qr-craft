
import React from 'react';
// Removed redundant Navigation import
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    // Apply dark theme background and adjust padding
    <div className="min-h-screen bg-gray-900 pt-24 md:pt-32 pb-16"> 
      {/* Removed extra div wrapper */}
      <div className="container mx-auto px-6"> {/* Consistent padding */}
        <div className="max-w-xl mx-auto">
           {/* Update text colors for dark theme */}
          <h1 className="text-3xl font-bold text-center text-white mb-3">Peermall 로그인 / 가입</h1> 
          <p className="text-center text-gray-400 mb-10">이메일 인증으로 간편하게 로그인하세요. 별도의 회원가입이 필요하지 않습니다.</p> 
          <div className="flex justify-center">
            <LoginForm /> {/* LoginForm will need styling updates too */}
          </div>
        </div>
      </div>
      {/* Added missing closing div */}
    </div>
  );
};

export default Login;
