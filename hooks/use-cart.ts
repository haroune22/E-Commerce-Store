import { create } from "zustand";
import { Product } from "@/types";
import { persist , createJSONStorage } from "zustand/middleware"
import toast from "react-hot-toast";
import { Info } from "lucide-react";


interface CartProps {
    items:Product[],
    addItem:(data:Product)=>void,
    removeItem:(id:string)=>void,
    removeAll:()=> void
}

const useCart  = create(
    persist<CartProps>((set,get)=> ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);
            
            if (existingItem) {
              return toast('Item already in cart.',{
                style: {
                  border: '1px solid black',
                },
              });
            }
        
            set({ items: [...get().items, data] });
            toast.success('Item added to cart.');
          },
          removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success('Item removed from cart.');
          },
          removeAll: () => set({ items: [] }),
        }), {
          name: 'cart-storage',
          storage: createJSONStorage(() => localStorage)
        }));

export default useCart 