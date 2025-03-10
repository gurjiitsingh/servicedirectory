"use server";
import {
  newPorductSchema,
  editPorductSchema,
  TproductSchema,
  TnewProductSchema,
  // TnewProductSchema,
  // ShowPorductT,
} from "@/lib/types/productType";

//import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/lib/firebaseConfig";
//import { product } from "@/--------db/schema";
// import { Weight } from "lucide-react";
// import { revalidatePath } from "next/cache";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
 query,
 // query,
  setDoc,
  where,
} from "@firebase/firestore"; //doc, getDoc,


import {
 
  ProductType,


} from "@/lib/types/productType";


//productT,productTs, productTsArr, TproductSchemaArr

//from "@/lib/firestore/products/write";

export async function addNewProduct(formData: FormData) {
  let featured_img: boolean = false;
  console.log("cate form data inside dbO-------", formData)
  console.log(formData.get("name"));
  console.log(formData.get("price"));
  //console.log(formData.get("brand"));
  // console.log(formData.get("weight"));
  // console.log(formData.get("dimensions"));
  console.log(formData.get("categoryId"));
  console.log(formData.get("productDesc"));
  console.log(formData.get("image"));
  console.log(formData.get("isFeatured"));

  if (formData.get("isFeatured") === "ture") featured_img = true;

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    // brand: formData.get("brand"),
    // weight: formData.get("weight"),
    // dimensions: formData.get("dimensions"),
    productCat: formData.get("categoryId"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = newPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  const image = formData.get("image");
  let imageUrl;
  try {
    imageUrl = await upload(image);
    console.log(imageUrl);
  } catch (error) {
   // throw new Error("error");
    console.log(error);
    return { errors: "image cannot uploaded" };
  }

  //imageUrl =  "https://res.cloudinary.com/dyhs5oy4s/image/upload/v1740024698/nextjs-course-mutations/opoym0wtoa9ijdfiqzjp.jpg";

  // const name = formData.get("name");
  // const price = formData.get("price");
  // const productCat = formData.get("productCat");
  // const productDesc = formData.get("productDesc");
  // const featured = formData.get("isFeatured");
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: imageUrl,
    isFeatured: featured_img,
  };

  try {
    const docRef = await addDoc(collection(db, "product"), data);
    console.log("Document written with ID: ", docRef.id);
    // Clear the form
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return { message: "Product saved" };
}




type rt = {
  errors:string;
}



export async function deleteProduct(id:string, oldImgageUrl:string) {

 const docRef = doc(db, "product", id);
   await deleteDoc(docRef);                     
   //return { errors: "Delete not implimented jet" };
   // if (result?.rowCount === 1) {

    const imageUrlArray = oldImgageUrl.split("/");
    console.log(imageUrlArray[imageUrlArray.length - 1]);
    const imageName =
      imageUrlArray[imageUrlArray.length - 2] +
      "/" +
      imageUrlArray[imageUrlArray.length - 1];

    const image_public_id = imageName.split(".")[0];
    console.log(image_public_id);
    try {
      const deleteResult = await deleteImage(image_public_id);
      console.log("image delete data", deleteResult);
    } catch (error) {
      console.log(error);
      return {errors:"Somthing went wrong, can not delete product picture"}
    }

       return {
      message: { sucess: "Deleted product" },
    };
  // }else{
  //   return {errors:"Somthing went wrong, can not delete product"}
  // }

}

export async function editProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl") as string;
  const featured_img: boolean = false;
 // featured_img = formData.get("oldImgageUrl");

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = editPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  let imageUrl;
  if (image === "undefined" || image === null) {
    imageUrl = oldImgageUrl;
  //  console.log("----------------not change image")
  } else {
  //  console.log("---------------- change image")
    try {
      imageUrl = (await upload(image)) as string;
      console.log(imageUrl);
    } catch (error) {
      //  throw new Error("error")
      console.log(error);
      return { errors: "image cannot uploaded" };
    }
    const d = false;
    if (d) {
      const imageUrlArray = oldImgageUrl?.split("/");
      console.log("old image url", imageUrlArray);
      const imageName =
        imageUrlArray[imageUrlArray.length - 2] +
        "/" +
        imageUrlArray[imageUrlArray.length - 1];

      const image_public_id = imageName.split(".")[0];
      console.log("image_public_id ---", image_public_id);
      try {
        const deleteResult = await deleteImage(image_public_id);
        console.log(deleteResult);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const productUpdtedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: imageUrl,
    isFeatured: featured_img,
  };
  //console.log("update data ------------", productUpdtedData)
  // update database
  try {
    const docRef = doc(db,"product", id);
   await setDoc(docRef, productUpdtedData);

  } catch (error) {
    console.log("error", error);
    return { errors: "Cannot update" };
  }
}

export async function fetchProducts(): Promise<TnewProductSchema[]> {
  // const result = await getDocs(collection(db, "product"))
  // let data = [];
  // result.forEach((doc) => {
  //   data.push({id:doc.id, ...doc.data()});
  // });
  //  return data;

  const result = await getDocs(collection(db, "product"));

  let data = [] as TnewProductSchema[];
  result.forEach((doc) => {
    const pData = { id: doc.id, ...doc.data() } as TnewProductSchema;
    data.push(pData);
  });
  return data;
  // let data = [] as ProductType[];
  //   const q = query(collection(db, "product"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const ab = doc.data() as ProductType;
  //     data.push(ab);
  //   });
  //   return data;
}

export async function fetchProductCategoryById(id: string): Promise<TproductSchema[]> {
 // console.log("this is sauce action-------------",id)
 const q = query(collection(db, "product"), where("categoryId", "==", id));
   const querySnapshot = await getDocs(q);
 
   const data = [] as TproductSchema[];
   querySnapshot.forEach((doc) => {
     const datas = doc.data() as TproductSchema;
     data.push(datas);
   });
   //console.log("-----------", data);
   return data;


}


export async function fetchProductById(id: string): Promise<TproductSchema[]> {
  // console.log("this is sauce action-------------",id)
  const q = query(collection(db, "product"), where("categoryId", "==", id));
    const querySnapshot = await getDocs(q);
  
    const data = [] as TproductSchema[];
    querySnapshot.forEach((doc) => {
      const datas = doc.data() as TproductSchema;
      data.push(datas);
    });
    return data;

 
}




 //console.log("Foorm data ---------",formData.get("oldImgageUrl"));
  // console.log(formData.get("price"));
  // console.log(formData.get("productCat"));
  // console.log(formData.get("productDesc"));
  // console.log(formData.get("image"));
  // console.log("is featured =======",formData.get("isFeatured"));
  // featured_img = formData.get("isFeatured");
  // if (formData.get("isFeatured").toString() === "true") {
  //   featured_img = true;
  // }