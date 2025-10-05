import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";


interface ShopContextType {

}
export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: PropsWithChildren) {
    const [shop, setShop] = useState<string | null>(null);


    return (
        <ShopContext.Provider
            value={{
                shop
            }}
        >
            {children}
        </ShopContext.Provider>
    )

}
export const useShop = () => {
    const ctx = useContext(ShopContext);
    if (!ctx) throw new Error("useShop must be inside ShopProvider");
    return ctx;
};