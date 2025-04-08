import React from 'react';
import InquiryBoard from '@/components/community/InquiryBoard'; // Import the new component

const CustomerService = () => {
  return (
    // Keep the dark theme consistent
    <div className="min-h-screen bg-gray-900 text-gray-300 pt-24 md:pt-32 pb-16"> 
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Keep the page title and description */}
            <h1 className="text-3xl font-bold tracking-tight text-white">고객센터</h1> 
            <p className="text-gray-400 mt-2 max-w-[600px]"> 
              질문이나 문제가 있으신가요? 문의를 남겨주시면 빠르게 답변해드리겠습니다.
            </p>
          </div>
          
          {/* Render the InquiryBoard component */}
          <InquiryBoard /> 
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
