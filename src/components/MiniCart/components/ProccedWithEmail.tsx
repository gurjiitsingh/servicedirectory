"use client";
import React from "react";
import { useForm } from "react-hook-form"; //, Controller
import { zodResolver } from "@hookform/resolvers/zod";
import { emailZ, TemailZ } from "@/lib/types/addressType";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
//import { useSearchParams } from "next/navigation";
//import {  searchAddressEmail } from "@/app/action/address/dbOperations";
import { useRouter } from "next/navigation";
// import { resolve } from "path";

//import CartContext from "@/store/CartContext";
import { UseSiteContext } from "@/SiteContext/SiteContext";

const ProccedWithEmail = () => {
  //const { cartData } = useContext(CartContext);
  const { emailFormToggle, setCustomerEmailG, chageDeliveryType } =
    UseSiteContext();
  // const {  sideBarToggle } = UseSiteContext();
  const { data: session } = useSession();
  // const [addressFound, setAddressFound] = useState(false);
  const router = useRouter();

  // chageDeliveryType("pickup")
  // console.log("session ----------", session)
  async function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {}

  const {
    register,
    formState: { errors }, //, isSubmitting
    handleSubmit,
    // reset,
    setValue,
    // getValues,
    // setError,
  } = useForm<TemailZ>({
    resolver: zodResolver(emailZ),
  });
  const userEmail = session?.user?.email as string;
  if (session !== null) {
    setValue("email", userEmail);
  }

  async function onSubmit(data: TemailZ) {
    const formData = new FormData();
    //     console.log("data.userId --------------", data)
    formData.append("email", data.email);
    // formData.append("mobNo", data.mobNo);
    // const customAddress = {
    //     email: data.email,
    // //  mobNo: data.mobNo,
    //   };
    emailFormToggle(false);
    setCustomerEmailG(data.email);
    // sideBarToggle(false)
    //   router.push(`/checkout?email=${data.email}&deliverytype=${deliveryType}`)
    router.push(`/checkout?email=${data.email}`);
  }

  return (
    <div className="z-50 absolute mx-auto h-full flex items-center justify-center backdrop-blur-lg  p-12 w-full">
      <div className="w-full md:w-[50%] lg:w-[30%]   rounded-2xl mx-auto flex flex-col items-center justify-center bg-green-50 border">
        <div className="flex flex-col  w-full px-2 p-2">
          <div className="flex justify-end w-full">
            <div>
              <button
                className="px-2 py-1 bg-slate-200 rounded-md w-fit"
                onClick={() => {
                  emailFormToggle(false);
                }}
              >
                <IoClose />
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-5 text-slate-500 font-semibold ">
              Email for checkout
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input {...register("orderDetail")} hidden /> */}
            <div className="flex w-full flex-col gap-2  my-1  ">
              <div className="flex flex-col gap-1">
                <label className="label-style">
                  Email<span className="text-red-500"></span>
                </label>
                <input
                  {...register("email", {
                    onChange: (e) => {
                      handleEmailChange(e);
                    },
                  })}
                  className="input-style"
                />
                <span className="text-[0.8rem] font-medium text-destructive">
                  {errors.email?.message && (
                    <span>{errors.email?.message}</span>
                  )}
                </span>
              </div>

              {/* <div className="flex flex-col gap-1">
              <label className="label-style">
                Mob no.<span className="text-red-500">*</span>{" "}
              </label>
              <input {...register("mobNo")} className="input-style" />
              <span className="text-[0.8rem] font-medium text-destructive">
                {errors.mobNo?.message && <span>{errors.mobNo?.message}</span>}
              </span>
            </div> */}

              <Button
                className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProccedWithEmail;
