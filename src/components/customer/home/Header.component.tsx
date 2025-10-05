import { IoCart } from "react-icons/io5";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-white my-0 py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-[#009D90] text-xl w-full text-center">ร้าน DEV KAKKAK เดฟ กากๆ</h1>

      <button
        className="p-3 rounded-full bg-[#009D90] flex justify-center items-center mr-5 relative"
        aria-label="Open cart"
        type="button"
      >
        <IoCart className="h-4 w-4 text-white" />
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            1
          </span>
      </button>
    </div>
  );
}
