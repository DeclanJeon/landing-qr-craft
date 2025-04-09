
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// If using zod schema validation, update the schema to include title:
const productSchema = z.object({
  name: z.string().min(1, { message: "상품명은 필수입니다." }),
  title: z.string().optional(), // Add title field
  price: z.string().min(1, { message: "가격은 필수입니다." }),
  imageUrl: z.string().min(1, { message: "이미지 URL은 필수입니다." }),
  externalUrl: z.string().url({ message: "유효한 URL을 입력해주세요." }),
  brandUrl: z.string().url({ message: "유효한 URL을 입력해주세요." }).optional().or(z.literal('')),
  distributor: z.string().optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.number().default(1)
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductRegistrationFormProps {
  onSuccessfulSubmit?: () => void;
}

const ProductRegistrationForm: React.FC<ProductRegistrationFormProps> = ({ onSuccessfulSubmit }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // When initializing the form, include title with default value:
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      title: "", // Add default title
      price: "",
      imageUrl: "",
      externalUrl: "",
      brandUrl: "",
      distributor: "",
      manufacturer: "",
      description: "",
      categoryId: 1
    }
  });

  const onSubmit = (data: ProductFormValues) => {
    setIsSubmitting(true);

    try {
      // Get existing products or initialize empty array
      const existingProducts = localStorage.getItem('peermall-products');
      const products = existingProducts ? JSON.parse(existingProducts) : [];
      
      // Create new product with all required fields including title
      const newProduct = {
        id: products.length + 1,
        name: data.name,
        title: data.title || data.name, // Use title or fallback to name
        price: data.price,
        imageUrl: data.imageUrl,
        externalUrl: data.externalUrl,
        brandUrl: data.brandUrl,
        categoryId: data.categoryId,
        distributor: data.distributor,
        manufacturer: data.manufacturer,
        description: data.description
      };
      
      products.push(newProduct);
      
      // Save updated products to localStorage
      localStorage.setItem('peermall-products', JSON.stringify(products));
      
      // Generate QR code for the product
      const existingQRCodes = localStorage.getItem('peermall-qrcodes');
      const qrCodes = existingQRCodes ? JSON.parse(existingQRCodes) : [];
      
      const newQRCode = {
        id: uuidv4(),
        name: data.name,
        content: data.externalUrl,
        type: 'product',
        createdAt: new Date().toISOString()
      };
      
      qrCodes.push(newQRCode);
      localStorage.setItem('peermall-qrcodes', JSON.stringify(qrCodes));
      
      // Show success message
      toast({
        title: "상품 등록 성공",
        description: "상품이 성공적으로 등록되었습니다.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
      
      // Call onSuccessfulSubmit callback if provided
      if (onSuccessfulSubmit) {
        onSuccessfulSubmit();
      }
    } catch (error) {
      console.error("상품 등록 오류:", error);
      toast({
        title: "상품 등록 실패",
        description: "상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">기본 정보</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품명 *</FormLabel>
                  <FormControl>
                    <Input placeholder="상품명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 제목 (선택사항)</FormLabel>
                  <FormControl>
                    <Input placeholder="상품 제목을 입력하세요" {...field} />
                  </FormControl>
                  <FormDescription>
                    제목이 없을 경우 상품명이 사용됩니다.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>가격 *</FormLabel>
                  <FormControl>
                    <Input placeholder="상품 가격을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카테고리</FormLabel>
                  <Select 
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">전자제품</SelectItem>
                      <SelectItem value="2">의류</SelectItem>
                      <SelectItem value="3">식품</SelectItem>
                      <SelectItem value="4">가구</SelectItem>
                      <SelectItem value="5">화장품</SelectItem>
                      <SelectItem value="6">도서</SelectItem>
                      <SelectItem value="7">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">상세 정보</h3>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 설명</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="상품에 대한 자세한 설명을 입력하세요" 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">이미지 및 URL</h3>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이미지 URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="이미지 URL을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="externalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="상품 판매 페이지 URL을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brandUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브랜드 URL</FormLabel>
                  <FormControl>
                    <Input placeholder="브랜드 웹사이트 URL을 입력하세요 (선택사항)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">추가 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제조사</FormLabel>
                    <FormControl>
                      <Input placeholder="제조사를 입력하세요 (선택사항)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="distributor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>유통사</FormLabel>
                    <FormControl>
                      <Input placeholder="유통사를 입력하세요 (선택사항)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              초기화
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "등록 중..." : "상품 등록하기"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductRegistrationForm;
