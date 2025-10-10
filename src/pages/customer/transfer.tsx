import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import QR from "../../assets/qr.png"

export default function Transfer() {
    const navigate = useNavigate();

    // ธนาคาร/สลิป/จำนวนเงิน
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const [slipPreview, setSlipPreview] = useState<string>("");

    const onSlipChange = (f: File | null) => {
        setSlipFile(f || null);
        setSlipPreview(f ? URL.createObjectURL(f) : "");
    };


    return (
        <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#E8FFFA] to-white prompt-regular">
            <div className="sm:w-[450px] w-full h-dvh overflow-hidden relative rounded-t-3xl shadow-2xl bg-white">
                {/* Header */}
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
                    <div className="w-10" />
                </div>

                <div className="h-[80vh] overflow-y-auto px-5 py-5">
                    <h1 className="font-semibold text-2xl text-[#009D90]">โอนเงิน</h1>
                    <p className="text-gray-500 text-sm mb-3">สแกนเพื่อโอน</p>


                    <div className="bg-white border border-[#009D90] rounded-2xl p-4 flex flex-col items-center">
                        <div className="text-sm text-gray-600 mb-2">สแกนเพื่อโอน</div>
                        <div className="bg-white p-3 rounded-xl shadow-sm">
                            <img src={QR} alt="" />

                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            * ตัวอย่าง QR ข้อความ — ถ้าต้องการ PromptPay แนะนำใช้ payload มาตรฐาน EMVCo
                        </p>
                    </div>

                    <section className="mb-5">
                        <h2 className="text-xl font-semibold text-[#009D90] mb-2">แนบสลิป</h2>
                        <div className="grid gap-3">
                            <label className="h-12 px-3 rounded-xl border border-[#009D90] flex items-center justify-between cursor-pointer hover:bg-gray-50">
                                <span className="text-sm text-gray-700 truncate">
                                    {slipFile ? slipFile.name : "เลือกไฟล์ภาพสลิป .jpg / .png"}
                                </span>
                                <span className="text-xs text-[#009D90]">อัปโหลด</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => onSlipChange(e.target.files?.[0] ?? null)}
                                />
                            </label>

                            {slipPreview && (
                                <div className="relative">
                                    <img
                                        src={slipPreview}
                                        alt="สลิปโอนเงิน"
                                        className="w-full max-h-72 object-contain rounded-xl border border-[#009D90]"
                                    />
                                    <button
                                        onClick={() => onSlipChange(null)}
                                        className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/80 border border-[#009D90] rounded-md hover:bg-white"
                                    >
                                        ลบรูป
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <div className="w-full shadow-[0_-3px_15px_rgba(0,0,0,0.15)] absolute bottom-0 rounded-t-3xl bg-gradient-to-r from-[#E9FFF9] to-white">
                    <div className="w-full flex justify-center mt-2">
                        <div className="w-[20%] h-1 bg-gray-400 rounded-full" />
                    </div>

                    <div className="w-full flex justify-center mb-8 mt-4">
                        <button
                            className={`w-[85%] py-3 rounded-2xl text-center font-bold text-white text-2xl transition-all 
                                bg-gradient-to-r from-[#00B8A9] to-[#009D90] hover:scale-105 shadow-lg`}
                        >
                            ยืนยันการชำระเงิน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
