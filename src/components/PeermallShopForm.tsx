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
    message: "피어몰 이름은 최소 2글자 이상이어야 합니다.",
  }),
  shopDescription: z.string().min(10, {
    message: "피어몰 소개글은 최소 10글자 이상이어야 합니다.",
  }).max(200, {
    message: "피어몰 소개글은 최대 200글자까지 입력 가능합니다.",
  }),
  shopUrl: z.string().min(3, {
    message: "피어몰 주소는 최소 3글자 이상이어야 합니다.",
  }).refine(value => /^[a-z0-9-]+$/.test(value), {
    message: "주소는 영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다.",
  }),
  contactNumber: z.string().min(10, {
    message: "연락처는 최소 10자리 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
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
  const [introImagePreview, setIntroImagePreview] = useState<string | null>(null); // State for intro image preview
  const [introImageFile, setIntroImageFile] = useState<File | null>(null); // State for intro image file
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: "",
      shopDescription: "",
      shopUrl: "",
      contactNumber: "",
      email: "",
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

  // Handler for intro image change
  const handleIntroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIntroImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIntroImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      console.log("[PeermallShopForm] onSubmit called with values:", values);

      const shopData: ShopData = {
        shopName: values.shopName,
        shopDescription: values.shopDescription,
        shopUrl: values.shopUrl,
        ownerName: values.ownerName,
        contactNumber: values.contactNumber,
        email: values.email,
        faviconUrl: faviconPreview || undefined,
        introImageUrl: introImagePreview || undefined, // Add intro image URL
        category: values.shopDescription.split(' ')[0],
        rating: 5.0,
        themeSettings: { primaryColor: "#3B82F6", secondaryColor: "#6366F1", fontFamily: "system-ui, sans-serif", borderRadius: "rounded-lg" },
        heroSettings: { background: "bg-gradient-to-r from-blue-500 to-indigo-600", title: `${values.shopName}에 오신 것을 환영합니다`, description: values.shopDescription, buttonText: "상품 구경하기", buttonColor: "bg-white text-blue-600 hover:bg-gray-100", imageUrl: "", imagePosition: "right", buttonIcon: true, buttonSize: "medium", buttonRadius: "rounded-full", showDecorations: true, widgets: { showProductCount: false, showRating: false, showBadge: false, badgeText: "신규" } },
        footerSettings: { background: "bg-gray-800", textColor: "text-white", ownerName: values.ownerName, contactNumber: values.contactNumber, email: values.email },
        adSettings: [],
        logoUrl: '',
      };
      
      console.log("[PeermallShopForm] Constructed shopData:", shopData);

      const uniqueShopKey = `peermallShopData_${values.shopUrl}`;
      const shopUrlsKey = 'peermallShopUrls';

      try {
        console.log(`[PeermallShopForm] Attempting to save data to localStorage with key: ${uniqueShopKey}`);
        localStorage.setItem(uniqueShopKey, JSON.stringify(shopData));
        console.log("[PeermallShopForm] Data saved to localStorage.");
      } catch (error) {
        console.error("[PeermallShopForm] Error saving shop data:", error);
        toast({ title: "오류", description: "피어몰 데이터를 저장하는 중 오류가 발생했습니다.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }

      try {
        console.log("[PeermallShopForm] Attempting to update shop URL list...");
        const existingUrlsString = localStorage.getItem(shopUrlsKey);
        const shopUrls: string[] = existingUrlsString ? JSON.parse(existingUrlsString) : [];
        
        if (!shopUrls.includes(values.shopUrl)) {
          shopUrls.push(values.shopUrl);
          localStorage.setItem(shopUrlsKey, JSON.stringify(shopUrls));
        }
        console.log("[PeermallShopForm] Shop URL list updated:", shopUrls);
      } catch (error) {
        console.error("[PeermallShopForm] Error updating shop URL list:", error);
        toast({ title: "오류", description: "피어몰 목록을 업데이트하는 중 오류가 발생했습니다.", variant: "destructive" });
      }
      
      console.log("[PeermallShopForm] Calling toast notification...");
      toast({
        title: "피어몰이 생성되었습니다!",
        description: `${values.shopName} 피어몰이 성공적으로 생성되었습니다.`,
      });
      
      if (onSuccessfulSubmit) {
        console.log("[PeermallShopForm] Calling onSuccessfulSubmit callback...");
        onSuccessfulSubmit();
      }
      
      console.log(`[PeermallShopForm] Scheduling navigation to /shop/${values.shopUrl}/home`);
      setTimeout(() => {
        navigate(`/shop/${values.shopUrl}/home`);
      }, 300);
    } catch (err) {
      console.error("[PeermallShopForm] Unexpected error during form submission:", err);
      toast({ 
        title: "오류가 발생했습니다", 
        description: "피어몰 생성 중 문제가 발생했습니다. 다시 시도해주세요.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">피어몰 기본 정보</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>피어몰 이름</FormLabel>
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
                  <FormLabel>피어몰 주소</FormLabel>
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
                <FormLabel>피어몰 소개글</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="피어몰에 대한 간단한 소개글을 작성해주세요." 
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

          {/* Introduction Image Upload Section */}
          <div className="space-y-4">
            <FormLabel>소개 이미지 (선택)</FormLabel>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-48 h-32 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50 flex-shrink-0">
                {introImagePreview ? (
                  <img
                    src={introImagePreview}
                    alt="소개 이미지 미리보기"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="w-full">
                <label htmlFor="intro-image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" className="relative w-full sm:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    소개 이미지 업로드
                    <input
                      id="intro-image-upload"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleIntroImageChange}
                    />
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  피어몰 목록 및 상단에 표시될 이미지입니다. (권장 비율 16:9)
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
        </div>
        
        <Button 
          type="submit" 
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700" 
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : '피어몰 생성하기'}
        </Button>
      </form>
    </Form>
  );
};

export default PeermallShopForm;
