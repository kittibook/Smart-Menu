import Slider, { type Settings } from "react-slick";
import clsx from "clsx";
type BannerImage = {
  src: string;
  alt?: string;
  href?: string;     // ถ้ามีจะคลิกแล้วลิงก์ไปหน้านั้น
  caption?: string;  // ข้อความทับบนรูป (ถ้าต้องการ)
};
type PromoBannerProps = {
  images: BannerImage[];
  className?: string;

  // options ที่คุมพฤติกรรมได้
  autoplay?: boolean;
  autoplaySpeed?: number;
  dots?: boolean;
  arrows?: boolean;
  swipe?: boolean;
  fade?: boolean;            // true = cross-fade แทนเลื่อน
  pauseOnHover?: boolean;

  // ขนาด/สัดส่วน
  height?: number;           // px ความสูงคงที่ (เช่น 150)
  rounded?: string;          // tailwind rounded เช่น "rounded-xl"
};

export default function PromoBanner({
  images,
  className,
  autoplay = true,
  autoplaySpeed = 3000,
  dots = true,
  arrows = false,
  swipe = true,
  fade = false,
  pauseOnHover = true,
  height = 150,
  rounded = "rounded-xl",
}: PromoBannerProps) {
  // กันเคสไม่มีรูป
  if (!images || images.length === 0) {
    return (
      <div className="w-full flex justify-center gap-2 my-5">
        <div
          className={clsx("w-[90%] sm:w-[400px] bg-gray-200 overflow-hidden", rounded, className)}
          style={{ height }}
        />
      </div>
    );
  }

  const settings: Settings = {
    dots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows,
    autoplay,
    autoplaySpeed,
    swipe,
    swipeToSlide: true,
    touchMove: true,
    pauseOnHover,
    adaptiveHeight: false,
    fade,                        // ถ้า true จะเป็น cross-fade
    cssEase: fade ? "linear" : "ease-in-out",
  };

  return (
    <div className="w-full flex justify-center gap-2 my-5">
      <div
        className={clsx("w-[90%] sm:w-[400px] overflow-hidden bg-gray-200", rounded, className)}
        style={{ height }}
      >
        <Slider {...settings}>
          {images.map((img, i) => {
            const imageEl = (
              <img
                src={img.src}
                alt={img.alt ?? `banner-${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            );

            return (
              <div key={i} style={{ height }}>
                <div className="relative w-full h-full">
                  {img.href ? (
                    <a href={img.href} className="block w-full h-full" aria-label={img.alt ?? `banner-${i}`}>
                      {imageEl}
                    </a>
                  ) : (
                    imageEl
                  )}

                  {/* caption (ถ้ามี) */}
                  {img.caption && (
                    <div className="absolute bottom-2 left-0 right-0 text-white text-sm bg-black/40 px-1 py-3 rounded-md">
                      {img.caption}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
