
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
