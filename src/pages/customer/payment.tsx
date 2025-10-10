import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useCart } from "../../Contexts/Cart/CartContext"
import type { Product } from "../../types/cart.type"
import productpnd from "../../assets/product.png";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Summary() {
    const navigate = useNavigate()
    const cart = useCart()

    const [price, setPrice] = useState<number>(0)
    const [productCount, setProductCount] = useState<number>(0)
    const [product, setProduct] = useState<Product[]>([])
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer" | null>(null)
    const [discountCode, setDiscountCode] = useState<string>("")
    const [discountPercent, setDiscountPercent] = useState<number>(0)
    const [discountMsg, setDiscountMsg] = useState<{ text: string; ok: boolean } | null>(null)

    useEffect(() => {
        setPrice(cart.cart?.price || 0)
        setProductCount(cart.cart?.count || 0)
        setProduct(cart.cart?.product || [])
    }, [cart.cart])

    const discountAmount = useMemo(() => Math.round(price * discountPercent), [price, discountPercent])
    const finalPrice = useMemo(() => Math.max(price - discountAmount, 0), [price, discountAmount])

    const applyDiscount = () => {
        const code = discountCode.trim().toUpperCase()
        setDiscountPercent(0)
        setDiscountMsg(null)

        if (code === "HIDAY") {
            if (price >= 500) {
                setDiscountPercent(0.5)
                setDiscountMsg({ text: "โค้ดส่วนลดถูกต้อง! ลด 50%", ok: true })
            } else if (price >= 300) {
                setDiscountPercent(0.3)
                setDiscountMsg({ text: "โค้ดส่วนลดถูกต้อง! ลด 30%", ok: true })
            } else {
                setDiscountMsg({ text: "ยอดยังไม่ถึงขั้นต่ำสำหรับโค้ดนี้ (ขั้นต่ำ 300 บาท)", ok: false })
            }
        } else if (code.length === 0) {
            setDiscountMsg({ text: "กรุณากรอกโค้ดส่วนลด", ok: false })
        } else {
            setDiscountMsg({ text: "โค้ดไม่ถูกต้อง", ok: false })
        }
    }

    const clearDiscount = () => {
        setDiscountCode("")
        setDiscountPercent(0)
        setDiscountMsg(null)
    }

    const goToPage = () => {
  if (paymentMethod === 'transfer') {
    navigate('/transfer') 
  } else if (paymentMethod === 'cash') {
    navigate('/cash')    
  }
}


    return (
        <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#E8FFFA] to-white prompt-regular">
            <div className="sm:w-[450px] w-full h-dvh overflow-hidden relative shadow-2xl rounded-t-3xl bg-white">
                <div className="h-dvh ">
                    {/* HEADER */}
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
                        <h1 className="text-xl font-semibold w-full text-center drop-shadow-md text-[#009D90]">
                            ร้าน DEV KAKKAK เดฟ กากๆ
                        </h1>
                        <div className="w-10" /> {/* spacer */}
                    </div>

                    <div className="px-5 mt-5 w-[95%] h-[58vh] overflow-y-auto">
                        {/* สินค้า */}
                        <h1 className="font-semibold text-2xl text-[#009D90]">สินค้า</h1>
                        <p className="text-gray-500 text-sm mb-3">ตรวจสอบสินค้าก่อนทำการชำระเงิน</p>

                        <div className="space-y-4">
                            {product.map((item) => (
                                <div key={item.id} className="bg-gradient-to-br from-white to-[#F0FFFB] rounded-2xl flex p-3 shadow-sm hover:shadow-md transition relative">
                                    <img src={productpnd} alt={item.name} className="w-[30%] h-[120px] rounded-xl object-cover" />
                                    <div className="w-[70%] px-3">
                                        <h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
                                        {item.topping.map((topping) => (
                                            <div key={topping.id} className="text-gray-700 text-sm">
                                                <span className="font-semibold">{topping.name}:</span>{" "}
                                                {topping.detail.map((detail) => (
                                                    <span key={detail.id} className="mr-1">{detail.name}</span>
                                                ))}
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-end mt-3">
                                            <div className="text-[#009D90] font-bold text-lg">{item.price} บาท</div>

                                        </div>
                                        <div className="flex gap-2 items-center absolute top-[5%] right-[2%]">
                                            <div className="bg-[#009D90] text-white w-7 h-7 flex justify-center items-center rounded-full">{item.count}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {product.length === 0 && (
                                <p className="text-center text-gray-400 italic py-6">ตะกร้าสินค้าว่างเปล่า</p>
                            )}
                        </div>

                        {/* ช่องทางชำระเงิน */}
                        <h1 className="font-semibold text-2xl text-[#009D90] mt-8">ช่องทางการชำระเงิน</h1>
                        <p className="text-gray-500 text-sm mb-3">กรุณาเลือกช่องทางการชำระเงิน</p>

                        <div className="flex flex-col gap-4">
                            {[
                                { type: "transfer", label: "โอนเงินผ่านธนาคาร" },
                                { type: "cash", label: "ชำระด้วยเงินสด" },
                            ].map((m) => (
                                <button
                                    key={m.type}
                                    onClick={() => setPaymentMethod(m.type as "transfer" | "cash")}
                                    className={`p-4 border-2 rounded-2xl text-lg font-medium text-start transition
                                        ${paymentMethod === m.type
                                            ? "border-[#009D90] bg-[#E6F8F6] text-[#009D90]"
                                            : "border-gray-300 hover:border-[#00B8A9]"
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>

                        {/* โค้ดส่วนลด */}
                        <h1 className="font-semibold text-2xl text-[#009D90] mt-8">โค้ดส่วนลด</h1>
                        <p className="text-gray-500 text-sm mb-3">กรอกโค้ดส่วนลดของท่าน</p>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="กรอกโค้ด เช่น HIDAY"
                                className="flex-1 border rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#00B8A9]"
                            />
                            <button
                                onClick={applyDiscount}
                                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00B8A9] to-[#009D90] text-white font-semibold hover:opacity-90"
                            >
                                ใช้โค้ด
                            </button>
                            {discountPercent > 0 && (
                                <button
                                    onClick={clearDiscount}
                                    className="px-4 py-3 rounded-xl border font-semibold hover:bg-gray-50"
                                >
                                    ล้าง
                                </button>
                            )}
                        </div>

                        {discountMsg && (
                            <p className={`mt-2 text-sm ${discountMsg.ok ? "text-green-600" : "text-red-600"}`}>
                                {discountMsg.text}
                            </p>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="w-full shadow-[0_-3px_15px_rgba(0,0,0,0.15)] absolute bottom-0 rounded-t-3xl bg-gradient-to-r from-[#E9FFF9] to-white">
                    <div className="w-full flex justify-center mt-2">
                        <div className="w-[20%] h-1 bg-gray-400 rounded-full" />
                    </div>

                    <div className="w-full px-5 space-y-1 mt-3 text-gray-800">
                        <div className="flex justify-between text-lg">
                            <div>จำนวนสินค้า</div>
                            <div>{productCount} ชิ้น</div>
                        </div>
                        <div className="flex justify-between text-lg">
                            <div>ราคารวม</div>
                            <div>{price.toLocaleString()} บาท</div>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <div>ส่วนลด {discountPercent > 0 ? `(${(discountPercent * 100).toFixed(0)}%)` : ""}</div>
                            <div>-{discountAmount.toLocaleString()} บาท</div>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                            <div className="text-2xl font-bold text-[#009D90]">ยอดสุทธิ</div>
                            <div className="text-2xl font-bold text-[#009D90]">{finalPrice.toLocaleString()} บาท</div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center mb-8 mt-4">
                        <button
                            disabled={!paymentMethod}
                            onClick={goToPage}
                            className={`w-[85%] py-3 rounded-2xl text-center font-bold text-white text-2xl transition-all 
                                ${paymentMethod
                                    ? "bg-gradient-to-r from-[#00B8A9] to-[#009D90] hover:scale-105 shadow-lg"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {paymentMethod ? "ยืนยันการชำระเงิน" : "เลือกช่องทางก่อน"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
