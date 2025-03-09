import { z } from "../../node_modules/zod";



export type ShowPorductT ={
  id:string;
  name:string;
  price:string;
  categoryId:string;
 // productCat: string;
  productDesc:string;
  isFeatured:boolean;
  image:string;
}

export const editPorductSchema = z.object({
  id:z.string().optional(),
  name: z.string().min(4, { message: "Product name is required" }),
  price: z
    .string()
    //.refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    .refine((value) => /^\d*[.,]?\d*$/.test(value), "Invalid product price"), // Refinement
                      //  ^\d*[.,]?\d*$
  // price: z
  //   .string()
  //   .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  categoryId:z.string().min(1, { message: "Please select category" }),
 // productCat: z.string().min(1, { message: "Please select category" }),
  productDesc: z
    .string()
    .min(2, { message: "Product productDescription is required" }),
   // brand: z.string().optional(),
   // dimensions:z.string().optional(),
 // weight:z.string().optional(),
  isFeatured: z.boolean().optional(),
  
  image: z.any().optional(),
  oldImgageUrl:z.string().optional(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TeditProductSchema = z.infer<typeof editPorductSchema>;

export default productSchema;

export type TProduct = {
  product: {
    name: string;
    id: string;
    image: string;
    category: string;
  };
};

export type Timage = {
  size?: number;
  type?: string;
  name?: string;
  lastModified?: number;
};

const ImageSchema = z.object({
  size: z.number().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  lastModified: z.number().optional(),
});

// Now add this object into an array
const ImagesSchema = z.array(ImageSchema);

const MAX_FILE_SIZE = 1024 * 1024 * 6; // 3MB
// const ACCEPTED_IMAGE_TYPES = ['image/jpg','image/jpg','image/jpeg'];

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}
//image: ImageSchema.optional(),

export type TOrderProduct = {
   addressId: string;
    customerName: string;
    id: string;
    time: string;
    userId: string;
};



 




export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .optional(),
    //image: z.any().refine((file: File) => file?.length !== 0, "File is required"),
    image:z.any().optional(),
});

export type TbrandSchema = z.infer<typeof brandSchema>;

export const editBrandSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" }),
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(30, { message: "Category name is to long" }),
  productDesc: z
    .string()
    .min(4, { message: "productDescrition of product is needed" })
    .max(100, { message: "productDescription is too long" }),
    slug: z
    .string()
    .optional(),
    image: z.any().optional(),
    oldImgageUrl:z.any().optional(),
});

export type TeditBrandSchema = z.infer<typeof editBrandSchema>;





export const userSchima = z.object({
  username: z
  .string()
  .trim()
  .min(2, { message: "User name is very short" })
  .max(30, { message: "User name is very long" }),
  password:z.string().optional(),
  confirmPassword:z.string().optional(),
   email: z.string().min(2, { message: "Email is required" }),
 
});

export type TuserSchem = z.infer<typeof userSchima>;





  


  

 



 

