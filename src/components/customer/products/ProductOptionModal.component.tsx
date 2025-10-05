import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  open: boolean;
   onClose: () => void;
};
export default function ProductOptionModal({open, onClose } : Props) {
    const [levelId, setLevelId] = useState<number | null>(null);

    const levels = [
        { id: 1, name: "เผ็ดน้อย", price: 0 },
        { id: 2, name: "เผ็ดกลาง", price: 5 },
        { id: 3, name: "เผ็ดมาก", price: 10 },
    ];

    useEffect(()=> {
        if (!open) {
            setLevelId(null)
        }
    },[open])

    const selectedLevel = levels.find((l) => l.id === levelId);
    const total = 100 + (selectedLevel?.price ?? 0);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center ">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 w-[90%] max-w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden animate-in fade-in duration-200">
                <div className="flex items-center justify-between px-4 py-3 ">
                    <h2 className="text-xl sm:text-2xl font-extrabold">productName</h2>
                    <button
                        className="p-2 rounded-lg bg-zinc-100 hover:bg-red-100"
                        aria-label="close"
                        type="button"
                    >
                        <IoMdClose className="w-5 h-5" onClick={onClose} />
                    </button>
                </div>

                <div className="p-4 max-h-[30vh] overflow-y-auto ">
                    <div className=" space-y-2 bg-zinc-100 p-4 rounded-2xl">
                        <h1 className="text-xl font-medium">ระดับความเผ็ด</h1>
                        {levels.map((levels) => (
                            <label
                                key={levels.id}
                                className="flex items-center gap-3 bg-white border rounded-xl px-3 py-2"
                            >
                                <input
                                    type="radio"
                                    name="level"
                                    className="size-4 accent-[#009D90]"
                                    checked={levelId === levels.id}
                                    onChange={() => setLevelId(levels.id)}
                                />
                                <div className="flex-1 flex justify-between text-sm">
                                    <span>{levels.name}</span>
                                    <span className="text-zinc-500">
                                        {levels.price !== 0 ? `+${levels.price} ฿` : "รวมในราคา"}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="px-4 py-3 bg-white flex items-center justify-between">
                    <div className="text-lg font-extrabold">{total.toLocaleString()} บาท</div>
                    <button

                        className="px-5 h-9 rounded-md bg-[#009D90] text-white font-bold text-sm active:scale-[0.97]"
                        type="button"
                    >
                        เพิ่ม
                    </button>
                </div>
            </div>
        </div>
    )
}