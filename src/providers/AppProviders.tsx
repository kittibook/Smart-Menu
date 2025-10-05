import type { PropsWithChildren } from "react";
import { ShopProvider } from "../Contexts/ Shop/ ShopContext";

export function AppProviders({ children }: PropsWithChildren) {
    return (
        <ShopProvider>
            {children}
        </ShopProvider>
    );
}
