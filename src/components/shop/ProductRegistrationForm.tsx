import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Link, ShoppingBag, Truck, Factory, Check, QrCode, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/shop";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Generate a QR code URL for the product
const generateQrCodeUrl = (url: string) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
};

// Define form schema
const productSchema = z.object({
  name: z.string().min(1, { message: "상품명은 필수입니다." }),
  price: z.string().min(1, { message: "가격은 필수입니다." }),
  imageUrl: z.string().min(1, { message: "이미지 URL은 필수입니다." }),
  externalUrl: z.string().url({ message: "유효한 URL을 입력해주세요." }),
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
  const [products, setProducts] = useState<Product[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isExtractingImage, setIsExtractingImage] = useState(false);
  
  // Load existing products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('peermall-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      imageUrl: "",
      externalUrl: "",
      distributor: "",
      manufacturer: "",
      description: "",
      categoryId: 1
    }
  });

  // Watch for image URL changes to update preview
  const watchImageUrl = form.watch("imageUrl");
  const watchExternalUrl = form.watch("externalUrl");
  
  useEffect(() => {
    if (watchImageUrl) {
      setPreviewImage(watchImageUrl);
    }
  }, [watchImageUrl]);

  useEffect(() => {
    if (watchExternalUrl) {
      setQrCodeUrl(generateQrCodeUrl(watchExternalUrl));
    }
  }, [watchExternalUrl]);

  // Extract image from URL (simulated function)
  const extractImageFromUrl = async () => {
    const externalUrl = form.getValues("externalUrl");
    if (!externalUrl) {
      toast({
        title: "URL을 입력해주세요",
        description: "이미지를 추출할 외부 URL을 먼저 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsExtractingImage(true);
    
    // Simulate API call to extract image
    try {
      // In a real implementation, this would be an API call to a service that extracts images from URLs
      // For demo purposes, we'll simulate a delay and return a placeholder image
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Determine a placeholder image based on the URL domain
      const url = new URL(externalUrl);
      let imageUrl: string;
      
      if (url.hostname.includes('amazon')) {
        imageUrl = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7';
      } else if (url.hostname.includes('apple')) {
        imageUrl = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b';
      } else if (url.hostname.includes('samsung')) {
        imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475';
      } else {
        // Default image
        imageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d';
      }
      
      // Update the form with the extracted image URL
      form.setValue("imageUrl", imageUrl);
      setPreviewImage(imageUrl);
      
      toast({
        title: "이미지 추출 완료",
        description: "외부 URL에서 대표 이미지를 추출했습니다.",
      });
    } catch (error) {
      toast({
        title: "이미지 추출 실패",
        description: "이미지를 추출하는 중 오류가 발생했습니다. 수동으로 이미지 URL을 입력해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsExtractingImage(false);
    }
  };

  // Handle form submission
  const onSubmit = (data: ProductFormValues) => {
    const newProduct: Product = {
      id: Date.now(), // Use timestamp as unique ID
      name: data.name,
      price: data.price,
      imageUrl: data.imageUrl,
      externalUrl: data.externalUrl,
      categoryId: data.categoryId,
      distributor: data.distributor,
      manufacturer: data.manufacturer,
      description: data.description
    };

    // Add product to array
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    
    // Save to localStorage
    localStorage.setItem('peermall-products', JSON.stringify(updatedProducts));
    
    // Save QR code to QR codes list
    const qrCodeImage = generateQrCodeUrl(data.externalUrl);
    const storedQRCodes = localStorage.getItem('peermall-qrcodes');
    const qrCodes = storedQRCodes ? JSON.parse(storedQRCodes) : [];
    
    const newQRCode = {
      name: data.name,
      content: data.externalUrl,
      image: qrCodeImage,
      type: "URL",
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('peermall-qrcodes', JSON.stringify([...qrCodes, newQRCode]));
    
    // Display success toast
    toast({
      title: "상품이 등록되었습니다",
      description: "상품 목록과 QR 코드 목록에 추가되었습니다.",
    });
    
    // Reset form
    form.reset();
    setPreviewImage("");
    setQrCodeUrl("");
    
    // Call the callback if provided
    if (onSuccessfulSubmit) {
      onSuccessfulSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>가격 *</FormLabel>
                    <FormControl>
                      <Input placeholder="가격을 입력하세요 (예: ₩30,000)" {...field} />
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
                    <FormLabel>판매 URL *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="https://example.com/product" {...field} />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={extractImageFromUrl}
                        disabled={isExtractingImage || !field.value}
                      >
                        {isExtractingImage ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Image className="h-4 w-4 mr-2" />
                        )}
                        이미지 추출
                      </Button>
                    </div>
                    <FormDescription>
                      실제 상품이 판매되는 URL을 입력하고, "이미지 추출" 버튼을 클릭하여 대표 이미지를 자동으로 추출할 수 있습니다.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이미지 URL *</FormLabel>
                    <FormControl>
                      <Input placeholder="상품 이미지 URL을 입력하세요" {...field} />
                    </FormControl>
                    <FormDescription>
                      "이미지 추출" 기능을 사용하면 자동으로 채워집니다. 수동으로 입력할 수도 있습니다.
                    </FormDescription>
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
                      <Input placeholder="유통사 정보를 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제조사</FormLabel>
                    <FormControl>
                      <Input placeholder="제조사 정보를 입력하세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상품 설명</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="상품에 대한 추가 설명을 입력하세요" 
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" size="lg">
                <Check className="mr-2 h-4 w-4" />
                상품 등록하기
              </Button>
            </form>
          </Form>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">미리보기</h3>
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="상품 이미지 미리보기" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Image className="h-12 w-12 mb-2" />
                    <p>이미지 미리보기</p>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg">
                  {form.watch("name") || "상품명"}
                </h3>
                <p className="text-blue-600 font-bold mt-1">
                  {form.watch("price") || "가격"}
                </p>
                
                {(form.watch("distributor") || form.watch("manufacturer")) && (
                  <div className="mt-2 space-y-1 text-sm text-gray-500">
                    {form.watch("distributor") && (
                      <div className="flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>{form.watch("distributor")}</span>
                      </div>
                    )}
                    {form.watch("manufacturer") && (
                      <div className="flex items-center">
                        <Factory className="h-3 w-3 mr-1" />
                        <span>{form.watch("manufacturer")}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center text-sm text-blue-500">
                    <Link className="h-3 w-3 mr-1" />
                    <span>외부 링크</span>
                  </div>
                  <div>
                    <ShoppingBag className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <QrCode className="h-5 w-5 mr-2 text-blue-500" />
              <h3 className="font-medium">QR 코드 미리보기</h3>
            </div>
            
            <div className="flex justify-center bg-white p-4 rounded-md mb-3">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="QR 코드" 
                  className="w-32 h-32" 
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-gray-400">
                  QR 코드
                </div>
              )}
            </div>
            
            <p className="text-sm text-center text-gray-500">
              상품 URL을 입력하면 자동으로 QR 코드가 생성됩니다.
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">최근 등록된 상품</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {products.slice(-3).reverse().map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="flex items-center p-3">
                    <div className="h-12 w-12 bg-gray-100 mr-3 flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.name}</h4>
                      <p className="text-sm text-blue-600">{product.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {products.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  등록된 상품이 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;
