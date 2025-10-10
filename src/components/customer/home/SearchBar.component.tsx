import { FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className=" w-full flex justify-center gap-2">
            <div className="h-10 w-[70%] flex items-center rounded-2xl bg-[#D9F1EF] px-3">
                <input
                    type="text"
                    className="flex-1 bg-transparent outline-none placeholder-zinc-500 "
                    placeholder="ค้นหาเมนู"
                />
                {/* <FaSearch className="text-zinc-500" /> */}
            </div>
            <div className="h-10 w-10 flex items-center rounded-2xl bg-[#D9F1EF] px-3">
                {/* <FaFilter className="text-zinc-500" /> */}
                <FaSearch className="text-zinc-500" /> 
            </div>
        </div>
    );
}
