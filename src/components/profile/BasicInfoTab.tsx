
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Save, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const BasicInfoTab = () => {
  const [nickname, setNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    // Load saved nickname from localStorage
    const savedNickname = localStorage.getItem('peermall-user-nickname');
    if (savedNickname) {
      setNickname(savedNickname);
    }
    
    // Load saved profile image
    const savedProfileImage = localStorage.getItem('peermall-user-profile');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);
  
  const handleSaveNickname = () => {
    if (!nickname.trim()) {
      toast({
        title: "닉네임을 입력해주세요",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('peermall-user-nickname', nickname);
      setIsEditingNickname(false);
      toast({
        title: "닉네임이 변경되었습니다",
        description: `새로운 닉네임: ${nickname}`
      });
    }, 500);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "이미지 파일만 업로드 가능합니다",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate image upload by converting to data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      // Simulate API delay
      setTimeout(() => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
          localStorage.setItem('peermall-user-profile', reader.result);
          toast({
            title: "프로필 이미지가 업데이트되었습니다"
          });
        }
        setIsUploading(false);
      }, 1000);
    };
    
    reader.readAsDataURL(file);
  };
  
  const getInitials = () => {
    return nickname.substring(0, 2) || '사용자';
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-white mb-6">기본 정보</h2>
        
        <Card className="bg-gray-850 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-gray-700">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={nickname} />
                    ) : (
                      <AvatarFallback className="bg-blue-600 text-xl font-medium">
                        {getInitials()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Label 
                      htmlFor="profile-upload" 
                      className="rounded-full bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer shadow-lg transition-colors"
                    >
                      <Upload className="h-4 w-4 text-white" />
                    </Label>
                    <Input 
                      id="profile-upload" 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>
                </div>
                {isUploading && (
                  <p className="text-blue-400 text-sm animate-pulse">업로드 중...</p>
                )}
                <p className="text-gray-400 text-sm text-center max-w-[200px]">
                  프로필 이미지는 최대 5MB의 JPG, PNG 파일만 가능합니다
                </p>
              </div>
              
              {/* Nickname Section */}
              <div className="flex-1 space-y-6">
                <div>
                  <Label htmlFor="nickname" className="text-gray-300">닉네임</Label>
                  <div className="flex mt-1.5 gap-2">
                    <div className="relative flex-grow">
                      <Input 
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        disabled={!isEditingNickname}
                        className={`bg-gray-700 border-gray-600 text-white ${!isEditingNickname ? 'opacity-80' : ''}`}
                      />
                      {!isEditingNickname && (
                        <Button 
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() => setIsEditingNickname(true)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {isEditingNickname && (
                      <Button 
                        onClick={handleSaveNickname} 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4 mr-1" /> 저장
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5">
                    다른 사용자에게 표시될 이름입니다.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300">이메일 주소</Label>
                  <Input 
                    id="email"
                    value={localStorage.getItem('peermall-user-email') || ''}
                    disabled
                    className="mt-1.5 bg-gray-700 border-gray-600 text-white opacity-80"
                  />
                  <p className="text-gray-500 text-sm mt-1.5">
                    로그인 및 계정 복구에 사용됩니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white">계정 보안</h3>
        
        <Card className="bg-gray-850 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h4 className="font-medium text-white">로그인 이메일 주소 변경</h4>
                  <p className="text-gray-400 text-sm">인증코드 수신 및 로그인에 사용되는 이메일 주소를 변경합니다.</p>
                </div>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700/50">
                  이메일 변경
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <h4 className="font-medium text-white">계정 삭제</h4>
                  <p className="text-gray-400 text-sm">모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.</p>
                </div>
                <Button variant="destructive">계정 삭제</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BasicInfoTab;
