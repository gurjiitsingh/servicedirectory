"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  editCategorySchema,
  TeditCategorySchema,
} from "@/lib/types/categoryType";
import { editCategory, fetchCategoryById } from "@/app/action/category/dbOperations";

const PageComp = () => {
  //const searchParams = useSearchParams();
  //const id = searchParams.get("id") || "";
  //const id = params.editform as string;

  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  // console.log("this is product edit---------------",id)

  //const [categories, setCategory] = useState<categoryTypeArr>([]);
  //const [product, setProduct] = useState({});
  const router = useRouter();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    // setError,
  } = useForm<TeditCategorySchema>({
    resolver: zodResolver(editCategorySchema),
  });
  
  

  useEffect(() => {
    let categoryData;
    async function prefetch() {
      categoryData = await fetchCategoryById(id);
      console.log("categoryData.id ----", id);
      setValue("id", id);
      setValue("name", categoryData.name);
      setValue("desc", categoryData.desc);
      setValue("oldImgageUrl", categoryData.image);
    }

    prefetch();
  }, []);

  async function onsubmit(data: TeditCategorySchema) {
    const formData = new FormData();
console.log("---------", data)
    formData.append("name", data.name);
    formData.append("oldImgageUrl",data.oldImgageUrl);
  
    formData.append("desc", data.desc);
    formData.append("image", data.image[0]);
   // formData.append("oldImgageUrl", data.oldImgageUrl!);
    formData.append("isFeatured",false)
    formData.append("id", data.id!);

    const result = await editCategory(formData);

    if (!result?.errors) {
      router.push("/admin/categories");
    } else {
      alert("Some thing went wrong");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Edit Category</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Category</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <input {...register("id")} hidden />

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input {...register("name")} className="input-style" />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
             
            </div>
            {/* End of left box */}
            <input {...register("oldImgageUrl")} hidden />
            <div className="flex-1 flex flex-col gap-5 h-full">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style"> Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select category image</span>}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1">
                  <label className="label-style">Category description</label>

                  <textarea
                    {...register(
                      "desc"
                      //   , {
                      //   validate: {
                      //     pattern: (value: string) => !/[!]/.test(value),
                      //   },
                      // }
                    )}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.desc && (
                      <span>Category description is required</span>
                    )}
                  </p>
                </div>

                
                <div className="flex    items-center gap-4">
                  <label className="label-style">Featured Category</label>
                  <input {...register("isFeatured")} type="checkbox" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.isFeatured?.message && (
                      <p>{errors.isFeatured?.message}</p>
                    )}
                  </p>
                </div>

                <Button className="bg-red-500" type="submit">
                  Edit Category{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PageComp;
