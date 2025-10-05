import { FaPlus } from "react-icons/fa";
import product from '../../../assets/product.png'
export default function MenuGrid() {
    return (
        <div className="w-full flex justify-center gap-2 my-5">
            <div className="w-[95%] sm:w-[80%] rounded-xl">
                <h1 className="font-semibold text-xl my-3">เมนูแนะนำ</h1>

                <div className="w-full grid grid-cols-2 gap-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((value) => (
                        <div className="col-span-1 bg-gray-100 w-full p-2 flex flex-col items-center rounded-xl">
                            <div className="w-[95%] h-[150px] rounded-xl">
                                <img src={product} alt="" className="w-full h-full rounded-xl" />
                            </div>
                            <h1 className="my-2 text-md">ชื่อสินค้า {value}</h1>
                            <div className="w-[95%] flex justify-between items-end mt-2">
                                <div>
                                    <h1 className="text-md font-medium">{value * 100} บาท</h1>
                                </div>
                                <div className="w-7 h-7 bg-[#009D90] rounded-sm flex justify-center items-center"><FaPlus className="w-3 h-3å text-white" /></div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}
