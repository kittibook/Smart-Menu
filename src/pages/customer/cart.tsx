import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import productpnd from "../../assets/product.png";
import { useCart } from "../../Contexts/Cart/CartContext";
import type { Product } from "../../types/cart.type";
import { useNavigate } from "react-router";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
  const cart = useCart()
  const [price, setPrice] = useState<number>(0)
  const [product, setProduct] = useState<Product[]>([])
  const [productCount, setProductCount] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    setPrice(cart.cart?.price || 0)
    setProductCount(cart.cart?.count || 0)
    setProduct(cart.cart?.product || [])
  }, [cart.cart])


  return (
    <div className="min-h-dvh flex items-center justify-center prompt-regular">
      <div className="sm:w-[450px] w-full h-dvh overflow-hidden relative">
        <div className="h-dvh overflow-y-auto ">
          <div className="sticky top-0 z-50 bg-white py-3 flex justify-between items-center shadow-sm">
            <div onClick={() => navigate(-1)} className="flex ml-5 justify-center items-center w-8 h-8 rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 "
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            <h1 className="text-[#009D90] text-xl w-full text-center">ร้าน DEV KAKKAK เดฟ กากๆ</h1>
          </div>
          <div className="h-2" />
          <div className="w-full flex justify-center gap-2 my-5">
            <div className="w-[95%] h-[65vh] overflow-y-auto sm:w-[80%] rounded-xl">
              <h1 className="font-semibold text-2xl my-3">ตะกร้าสินค้า</h1>
              <div className="w-full grid grid-cols-1 gap-5">
                {product.map((item, key) => (
                  <div
                    key={item.id + key}
                    className="relative group col-span-1 bg-gray-100 rounded-2xl flex p-2 hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => cart.removeProduct(item)}
                      aria-label={`ลบ ${item.name} ออกจากตะกร้า`}
                      className="absolute top-2 right-2 rounded-full p-2 bg-red-100"
                    >
                      <IoTrash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">ลบสินค้า</span>
                    </button>
                    <div className="w-[30%] rounded-xl">
                      <img src={productpnd} alt={item.name} className="w-full h-full rounded-xl object-cover" />
                    </div>
                    <div className="w-[70%] p-3">
                      <h1 className="text-xl font-medium">{item.name}</h1>
                      {item.topping.map((topping) => (
                        <div key={topping.id} className="flex">
                          <span className="text-lg pr-2">{topping.name} :</span>
                          {topping.detail.map((detail) => (
                            <span key={detail.id} className="text-lg mr-2">{detail.name}</span>
                          ))}

                        </div>
                      ))}
                      <div className="flex justify-between mt-2">
                        <span className="text-lg font-bold">{item.price} บาท</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => cart.MinusCountProduct(item)}
                            className="p-2 bg-[#009D90] rounded-full hover:bg-gray-300 transition"
                            aria-label="ลดจำนวน"
                          >
                            <FaMinus className="h-3 w-3  text-white" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">{item.count}</span>
                          <button
                            onClick={() => cart.PlusCountProduct(item)}

                            className="p-2 bg-[#009D90] rounded-full hover:bg-gray-300 transition"
                            aria-label="เพิ่มจำนวน"
                          >
                            <FaPlus className="h-3 w-3  text-white" />
                          </button>
                        </div>
                      </div>


                    </div>
                  </div>
                ))}
                {product.length === 0 && (
                  <p className="text-center text-gray-500">ตะกร้าสินค้าว่างเปล่า</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-h-[30vh] z-[200] shadow-[0_-3px_15px_rgba(0,0,0,0.3)] absolute bottom-0 rounded-t-4xl ">
          <div className="w-full flex justify-center my-2"> <div className="w-[10%] h-2 bg-gray-400 rounded-full"></div></div>
          <div className="w-full flex justify-between px-4">
            <div className="w-1/2 text-xl">จำนวนสินค้า</div>
            <div className="w-1/2 text-xl text-end">{productCount} ชิ้น</div>
          </div>
          <div className="w-full flex justify-between px-4">
            <div className="w-1/2 text-xl">ราคารวม</div>
            <div className="w-1/2 text-xl text-end">{price} บาท</div>
          </div>
          <div className="w-full flex justify-center mb-10 mt-4">
            <div onClick={() => navigate('/payment')} className="w-[80%] hover:bg-green-600 hover:scale-105 bg-green-700 p-3 rounded-2xl text-center font-bold text-white text-2xl">
              สั่งซื้อสินค้า
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
