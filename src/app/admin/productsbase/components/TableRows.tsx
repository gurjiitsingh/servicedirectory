import {
  //Table,
  //TableBody,
  TableCell,
  //TableHead,
  //TableHeader,
  TableRow,
  //TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import Image from "next/image";


import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { deleteProduct } from "@/app/action/productsbase/dbOperation";
import {  TproductSchema } from "@/lib/types/productType";
import { useRouter } from "next/navigation";
//import { deleteProduct } from "@/app/action/products/dbOperation";
//import { useRouter  } from "next/navigation";
function TableRows({ product }:{product:TproductSchema}){

const router = useRouter();

 async function handleDelete(product:TproductSchema) {
  // console.log("product to be deleted id",product.categoryId);
  const result = await deleteProduct(product.id!, product.image)
if(result.errors){
  alert(result.errors)
}else{
  // router.push('/admin/products')
   //   router.refresh()
   
    //  location.reload()
//    pathname: "/admin/products/editform",
//  query: {
//   id: product.id,
//  },
router.push(`/admin/productsbase?id=${product.categoryId}`);

}

  }
  
  const price = product.price.replace(/\./g, ',') 
  return (
    <TableRow key={product.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>
        <div className=" px-3 py-1 text-center min-w-[100px]">
          {product?.image&&
          <Image
            className="h-12 w-12 object-cover rounded-md border p-1"
            src={product?.image}
            width={100}
            height={100}
            alt={product.name}
          />}
        </div>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{price}</TableCell>
       {/* <TableCell>{product.productCat}</TableCell> */}
      {/* <TableCell></TableCell> */}
      <TableCell>{product.productDesc}</TableCell>
      <TableCell>       
        {product?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell>

      <TableCell>
        <p className="flex gap-3">
        <Link
            href={{
              pathname: `/admin/productsaddon/${product.id}`,
           // pathname: `/admin/${product.id}`,
            //  pathname: "/admin/products/editform",
            //   query: {
            //     id: product.id,
            //    },
            }
          }
          >
            <Button size="sm" className="bg-red-600 text-white px-1 py-0">
            Variants
            </Button>
          </Link>



          <Link
            href={{
              pathname: `/admin/productsbase/editform`,
            //  pathname: "/admin/products/editform",
              query: {
                id: product.id,
               },
            }
          }
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
              {" "}
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link>
          {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}

          <Button onClick={()=>handleDelete(product)} size="sm" className="bg-red-600 px-1 py-0 ">
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
