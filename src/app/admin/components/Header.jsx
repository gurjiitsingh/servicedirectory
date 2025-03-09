"use client";
import { Button } from "@/components/ui/button";
import { IoMdMenu } from "../../../../node_modules/react-icons/io";
import { UseSiteContext } from "@/SiteContext/SiteContext";
 
export default function Header() {
  const {  setAdminSideBarToggleG} = UseSiteContext();
 
  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3">
      <div className="flex justify-center items-center lg:hidden">
        <Button onClick={()=>{setAdminSideBarToggleG()}}>
        <IoMdMenu />
        </Button>
     
      </div>
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2 items-center">
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-sm font-semibold"></h1>
            <h1 className="text-xs text-gray-600"></h1>
          </div>
          {/* <Avatar size="sm" src={admin?.imageURL} /> */}
        </div>
      </div>
    </section>
  );
}
