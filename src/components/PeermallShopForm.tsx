
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image } from 'lucide-react';
import { ShopData } from '@/types/shop';

const formSchema = z.object({
  shopName: z.string().min(2, {
    message: "쇼핑몰 이름은 최소 2글자 이상이어야 합니다.",
  }),
  shopDescription: z.string().min(10, {
    message: "쇼핑몰 소개글은 최소 10글자 이상이어야 합니다.",
  }).max(200, {
    message: "쇼핑몰 소개글은 최대 200글자까지 입력 가능합니다.",
  }),
  shopUrl: z.string().min(3, {
    message: "쇼핑몰 주소는 최소 3글자 이상이어야 합니다.",
  }).refine(value => /^[a-z0-9-]+$/.test(value), {
    message: "주소는 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다.",
  }),
  contactNumber: z.string().min(10, {
    message: "연락처는 최소 10자리 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  address: z.string().min(5, {
    message: "주소는 최소 5글자 이상이어야 합니다.",
  }),
  ownerName: z.string().min(2, {
    message: "대표자 이름은 최소 2글자 이상이어야 합니다.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface PeermallShopFormProps {
  onSuccessfulSubmit?: () => void;
}

const PeermallShopForm: React.FC<PeermallShopFormProps> = ({ onSuccessfulSubmit }) => {
  const navigate = useNavigate();
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: "",
      shopDescription: "",
      shopUrl: "",
      contactNumber: "",
      email: "",
      address: "",
      ownerName: "",
    },
  });

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: FormValues) => {
    // Fix: Ensure all required properties are provided
    const shopData: ShopData = {
      shopName: values.shopName,
      shopDescription: values.shopDescription,
      shopUrl: values.shopUrl,
      ownerName: values.ownerName,
      contactNumber: values.contactNumber,
      email: values.email,
      address: values.address,
      faviconUrl: faviconPreview || undefined,
      location: values.address.split(' ')[0],
      category: values.shopDescription.split(' ')[0],
      rating: 5.0
    };
    
    // Store the shop data in localStorage (for demo purposes)
    localStorage.setItem('peermallShopData', JSON.stringify(shopData));
    
    // Also add to peermall list
    import('@/utils/peermallStorage').then(({ addPeermall }) => {
      addPeermall(shopData);
    });
    
    toast({
      title: "피어몰이 생성되었습니다!",
      description: `${values.shopName} 피어몰이 성공적으로 생성되었습니다.`,
    });
    
    // Call onSuccessfulSubmit callback if provided
    if (onSuccessfulSubmit) {
      onSuccessfulSubmit();
    }
    
    // Navigate to the generated shop page with new URL structure
    navigate(`/shop/${values.shopUrl}/home`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">쇼핑몰 기본 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>쇼핑몰 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="나만의 피어몰" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="shopUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>쇼핑몰 주소</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">peermall.com/</span>
                      <Input {...field} />
                      <span className="text-sm text-gray-500 ml-2">/home</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="shopDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>쇼핑몰 소개글</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="쇼핑몰에 대한 간단한 소개글을 작성해주세요." 
                    className="resize-none" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormDescription>최대 200자까지 입력 가능합니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <FormLabel>파비콘 (Favicon)</FormLabel>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
                {faviconPreview ? (
                  <img 
                    src={faviconPreview} 
                    alt="Favicon preview" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <label htmlFor="favicon-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="relative">
                    <Upload className="w-4 h-4 mr-2" />
                    파비콘 업로드
                    <input
                      id="favicon-upload"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFaviconChange}
                    />
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  권장 크기: 32x32 픽셀, .ico, .png, .svg 파일
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold">연락처 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>대표자 이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input placeholder="01012345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주소</FormLabel>
                <FormControl>
                  <Input placeholder="서울특별시 강남구..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
          피어몰 생성하기
        </Button>
      </form>
    </Form>
  );
};

export default PeermallShopForm;
