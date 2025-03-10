import { z } from "zod";

export type productT = {
  id: string;
  Desc: string;
  category: string;
  image: string;
  isFeatured: boolean;
  name: string;
  price: string;
};

export type productTArr = {
  id: string;
  Desc: string;
  category: string;
  image: string;
  isFeatured: boolean;
  name: string;
  price: string;
}[];

export type ProductType = {
  id: string | undefined;
  name: string;
  price: string;
  quantity:number;
  productDesc: string;
  productCat: string;
  image: string;
  isFeatured: boolean;
  flavors:string;
 
};



export type ProductTypeArr = {
  name: string;
  price: string;
  productCat: string;
  productDesc: string;
  // image?: any; id?: string | undefined;
  image: string;
  isFeatured: boolean;
}[];

const productSchema = z.object({
  id:z.string().optional(),
  name: z.string().min(4, { message: "Name is required" }),
  price: z
    .string()
   // .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    .refine((value) =>/[.,\d]+/.test(value), "Invalid Sr no."),
  //productCat: z.string().min(1, { message: "Please select category" }),
  categoryId:z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Description is required" }),
  //  brand: z.string().min(1, { message: "Please select category" }),
  //  dimensions:z.string().optional(),
  //weight:z.string().optional(),
  isFeatured: z.boolean().optional(),

 // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
 image:z.any().optional(),
 baseProductId:z.string().optional(),
 flavors:z.boolean().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});
export type TproductSchema = z.infer<typeof productSchema>;


export const newPorductSchema = z.object({
  id:z.string().optional(),
  name: z.string().min(4, { message: "Name is required" }),
  price: z
    .string()
   // .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    .refine((value) =>/[.,\d]+/.test(value), "Invalid Sr no."),
  //productCat: z.string().min(1, { message: "Please select category" }),
  categoryId:z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Description is required" }),
  //  brand: z.string().min(1, { message: "Please select category" }),
  //  dimensions:z.string().optional(),
  //weight:z.string().optional(),
  isFeatured: z.boolean().optional(),

 // image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
 image:z.any().optional(),
 baseProductId:z.string().optional(),
 flavors:z.boolean().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TnewProductSchema = z.infer<typeof newPorductSchema>;
export type ShowPorductT = {
  id: string;
  name: string;
  price: string;
  Desc: string;
  productCat: string;
  productDesc: string;
  isFeatured: boolean;
  image: string;
};

export const editPorductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "Product name is required" }),
  price: z
    .string()
    .refine((value) =>/[.,\d]+/.test(value), "Invalid product price"),
   // .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  productCat: z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Product description is required" }),
  // brand: z.string().optional(),
  // dimensions:z.string().optional(),
  // weight:z.string().optional(),
  isFeatured: z.boolean().optional(),
  baseProductId: z.string().optional(),
  image: z.any().optional(),
  oldImgageUrl: z.string().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TeditProductSchema = z.infer<typeof editPorductSchema>;

export default productSchema;

export type TProduct = {
  name: string;
  id: string;
  image: string;
  category: string;
};


 type editProductType = {
  name: string;
  price: string;
  productDesc: string;
  productCat: string;
  id?: string | undefined;
  isFeatured?: boolean | undefined;
  image?: any;
  baseProductId?: string | undefined;
  oldImgageUrl?: string | undefined;
}