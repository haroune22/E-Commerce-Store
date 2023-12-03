import { create } from "zustand";
import { Product } from "@/types";


interface PreviewModalStoreProps {
    isOpen:boolean,
    data?:Product,
    onOpen:(data:Product)=>void,
    onClose:()=>void,
}

const PreviewModalStore = create<PreviewModalStoreProps>((set)=> ({
    isOpen:false,
    data:undefined,
    onOpen:(data:Product)=>set({data, isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default PreviewModalStore