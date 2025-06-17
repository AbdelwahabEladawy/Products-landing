import { useMemo } from "react";
import { Product } from "@/Types/product";
import { products } from "@/Data/products";

export const useProducts= ():Product[]=>{
const data = useMemo(()=> products,[])
return data
}