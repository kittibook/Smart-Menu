import { createContext, useContext, useState, useCallback, type PropsWithChildren } from "react";
import type { Cart, Product } from "../../types/cart.type";

interface CartCtx {
  cart: Cart | null;
  addToCart: (p: Product) => void;
  removeProduct: (p: Product) => void;
  MinusCountProduct: (p: Product) => void;
  PlusCountProduct: (p: Product) => void;
  clearCart: () => void;
}

const Ctx = createContext<CartCtx | undefined>(undefined);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Cart>({ price: 0, count: 0, product: [] });

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const Products = prev.product.find((v) => {
        const sameName = v.name === p.name
        const sameToppings = JSON.stringify(v.topping) === JSON.stringify(p.topping)
        const isSame = sameName && sameToppings


        return isSame
      })

      if (Products) {
        const updatedProducts = prev.product.map((item) => {
          const sameToppings = JSON.stringify(item.topping) === JSON.stringify(p.topping)
          if (item.name === Products.name && sameToppings) {
            const newCount = item.count + 1
            return { ...item, count: newCount }
          }
          return item
        })
        const totalCount = updatedProducts.reduce((sum, i) => sum + i.count, 0)
        const totalPrice = updatedProducts.reduce((sum, i) => sum + (i.price * i.count), 0)
        return {
          ...prev,
          product: updatedProducts,
          count: totalCount,
          price: totalPrice
        }
      }


      return {
        ...prev,
        price: prev.price + p.price,
        count: prev.count + p.count,
        product: [...prev.product, p],
      }
    })
  }, [])

  const removeProduct = useCallback((p: Product) => {
    setCart((prev) => {
      const updatedProducts = prev.product.map((item) => {
        if (item.name === p.name && item.topping === p.topping) {
          const newCount = 0
          return { ...item, count: newCount }
        }
        return item
      })
      const totalCount = updatedProducts.reduce((sum, i) => sum + i.count, 0)
      const totalPrice = updatedProducts.reduce((sum, i) => sum + (i.price * i.count), 0)

      return {
        ...prev,
        count: totalCount,
        price: totalPrice,
        product: prev.product.filter((item) => item !== p),
      }
    });
  }, []);

  const MinusCountProduct = useCallback((p: Product) => {
    setCart((prev) => {
      if (!prev || !prev.product) return prev
      const updatedProducts = prev.product.map((item) => {
        if (item.name === p.name && item.topping === p.topping) {
          const newCount = item.count > 1 ? item.count - 1 : 1
          return { ...item, count: newCount }
        }
        return item
      })
      const totalCount = updatedProducts.reduce((sum, i) => sum + i.count, 0)
      const totalPrice = updatedProducts.reduce((sum, i) => sum + (i.price * i.count), 0)
      return {
        ...prev,
        product: updatedProducts,
        count: totalCount,
        price: totalPrice
      }
    })
  }, [setCart, cart])


  const PlusCountProduct = useCallback((p: Product) => {
    setCart((prev) => {
      if (!prev || !prev.product) return prev
      const updatedProducts = prev.product.map((item) => {
        if (item.name === p.name && item.topping === p.topping) {
          const newCount = item.count + 1
          return { ...item, count: newCount }
        }
        return item
      })
      const totalCount = updatedProducts.reduce((sum, i) => sum + i.count, 0)
      const totalPrice = updatedProducts.reduce((sum, i) => sum + (i.price * i.count), 0)
      return {
        ...prev,
        product: updatedProducts,
        count: totalCount,
        price: totalPrice
      }
    })
  }, [setCart, cart])

  const clearCart = useCallback(() => setCart({ price: 0, count: 0, product: [] }), []);

  return <Ctx.Provider value={{ cart, addToCart, clearCart, removeProduct, MinusCountProduct, PlusCountProduct }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("must be inside Provider");
  return ctx;
};
