
import React from 'react';
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  shopName: z.string().min(2, {
    message: "쇼핑몰 이름은 최소 2글자 이상이어야 합니다.",
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
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: "",
      shopUrl: "",
      contactNumber: "",
      email: "",
      address: "",
      ownerName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real application, you would send this data to your backend
    console.log("Form values:", values);
    
    // Store the shop data in localStorage (for demo purposes)
    localStorage.setItem('peermallShopData', JSON.stringify(values));
    
    toast({
      title: "피어몰이 생성되었습니다!",
      description: `${values.shopName} 피어몰이 성공적으로 생성되었습니다.`,
    });
    
    // Call onSuccessfulSubmit callback if provided
    if (onSuccessfulSubmit) {
      onSuccessfulSubmit();
    } else {
      // Navigate to the generated shop page
      navigate(`/shop/${values.shopUrl}/home`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <span className="text-sm text-gray-500 mr-2">https://</span>
                    <Input {...field} />
                    <span className="text-sm text-gray-500 ml-2">.peermall.com</span>
                  </div>
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
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>주소</FormLabel>
                <FormControl>
                  <Input placeholder="서울특별시 강남구..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
        </div>
        
        <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
          피어몰 생성하기
        </Button>
      </form>
    </Form>
  );
};

export default PeermallShopForm;
