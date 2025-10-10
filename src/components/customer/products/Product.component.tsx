import { FaPlus } from "react-icons/fa";
import productpng from './../../../assets/product.png'
import { useNavigate } from "react-router";
import ProductOptionModal from "./ProductOptionModal.component";
import { useState } from "react";
import { ProductMock } from "../../../mock/mock.product";
import type { Product } from "../../../types/cart.type";
export default function ProductMenu({ id }: { id: string }) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product | null>(null)
    const openModal = (value : Product) => {
        setOpen(true)
        setProduct(value)
    }
    return (
        <div className="w-full flex justify-center gap-2 my-5">
            <div className="w-[95%] sm:w-[80%] rounded-xl">
                <h1 onClick={() => navigate('/')} className="font-semibold text-2xl my-3">เมนู หมวดหมู่ {id}</h1>

                <div className="w-full grid grid-cols-2 gap-5">
                    {ProductMock.map((value) => (
                        <div key={value.id} className="col-span-1 bg-gray-100 w-full p-2 flex flex-col items-center rounded-xl">
                            <div className="w-[95%] h-[150px] rounded-xl">
                                <img src={productpng} alt="" className="w-full h-full rounded-xl" />
                            </div>
                            <h1 className="my-2 text-md">ชื่อสินค้า {value.name}</h1>
                            <div className="w-[95%] flex justify-between items-end mt-2">
                                <div>
                                    <h1 className="text-md font-medium">{value.price} บาท</h1>
                                </div>
                                <div onClick={() => openModal(value)} className="w-7 h-7 bg-[#009D90] rounded-sm flex justify-center items-center"><FaPlus className="w-3 h-3å text-white" /></div>
                            </div>
                        </div>
                    ))}

                </div>

                <ProductOptionModal product={product} open={open} onClose={() => setOpen(false)} />
            </div>
        </div >
    );
}
