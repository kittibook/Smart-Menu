import { useNavigate } from 'react-router';
import category from '../../../assets/category.png'

export default function Category() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-center gap-2 my-5">
      <div className="w-[80%] rounded-xl">
        <h1 className="font-semibold text-xl">หมวดหมู่</h1>

        <div className="my-3 flex overflow-x-auto gap-4 no-scrollbar">
          {[1,2,3,4,5,6,7,8,9,0].map((cat) => (
            <button
            onClick={() => navigate('/product/' + cat)}
              className="flex flex-col items-center gap-3 px-2 shrink-0"
              aria-label={`เลือกหมวดหมู่ ${cat}`}
              type="button"
            >
              <div className="w-[50px] h-[50px] bg-gray-200 rounded-sm" >
                <img src={category} alt="" className="w-[50px] h-[50px]  rounded-sm"  />
              </div>    
              <span className="text-sm whitespace-nowrap">หมวดหมู่ {cat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
