import Header from "./components/customer/home/Header.component"
import MenuGrid from "./components/customer/home/MenuGrid.component"
import Category from "./components/customer/home/CategoryStrip.component"
import PromoBanner from "./components/customer/home/PromoBanner.component"
import SearchBar from "./components/customer/home/SearchBar.component"
type BannerImage = {
  src: string;
  alt?: string;
  href?: string;     // ถ้ามีจะคลิกแล้วลิงก์ไปหน้านั้น
  caption?: string;  // ข้อความทับบนรูป (ถ้าต้องการ)
};
import promoweb from './assets/promo-web.png'
function App() {
const banners: BannerImage[] = [
  { src: promoweb, alt: "โปรเปิดร้าน", href: "/promo/opening", caption: "ลด 20% เมนูใหม่!" },
  { src: promoweb, alt: "เมนูแนะนำ", caption: "เมนูขายดีประจำสัปดาห์" },
  { src: promoweb, alt: "โค้ดส่วนลด", href: "/coupon" },
];
  return (
    <div className="min-h-dvh flex items-center justify-center prompt-regular">
      <div className="sm:w-[450px]  w-full h-dvh overflow-hidden">
        <div className="h-dvh overflow-y-auto">
          <Header />
          <div className="h-5"></div>
          <SearchBar />
          {/* โฆษณา */}
          <PromoBanner
            images={banners}
            autoplay
            autoplaySpeed={3000}
            dots
            arrows={false}
            swipe
            fade={false}    // ถ้าอยากฟีลสตอรี่ให้เป็น true
            pauseOnHover
            height={150}
            rounded="rounded-xl"
          />
          {/* หมวดหมู่ */}
          <Category />
          <MenuGrid />
        </div>
      </div>
    </div>
  )
}

export default App
