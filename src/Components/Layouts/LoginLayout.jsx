import { Icon } from "@iconify/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Ornament from "../Assets/Pictures/LoginOrnament.png";
import "./swiper.css";

export default function LoginLayout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideProps = [
    {
      img: "https://picsum.photos/200/300",
      title: "Knowledge Management System",
      description: "Lorem ipsum lorem ipsum lorem ipsum",
    },
    {
      img: "https://picsum.photos/200/300",
      title: "Learning Management System",
      description: "Lorem ipsum lorem ipsum lorem ipsum",
    },
    {
      img: "https://picsum.photos/200/300",
      title: "Talent Management System",
      description: "Lorem ipsum lorem ipsum lorem ipsum",
    },
  ];

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col justify-between items-center pb-5 pt-16 px-16 w-5/12">
        <Outlet />
        <p className="text-grey2 font-semibold">
          Powered by KMPlus Consulting | 2022
        </p>
      </div>
      <div
        className="w-7/12 min-h-screen relative"
        style={{
          background:
            "linear-gradient(156.04deg, #016DB2 0%, #003F80 100%)",
        }}
      >
        <div className="relative flex flex-col gap-8 items-center text-center text-white z-[2]">
          <div className="relative items-center justify-between w-3/4 mt-10">
            <Swiper
              slidesPerView={1}
              navigation={{
                prevEl: `#login-button-prev`,
                nextEl: `#login-button-next`,
              }}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              //   pauseOnMouseEnter: true,
              // }}
              loop
              pagination={{
                el: "#login-bullets",
                clickable: true,
              }}
              onSlideChange={(swiper) => {
                const swiperIndex = swiper.activeIndex;
                const index = (() => {
                  if (swiperIndex === 4) return 0;
                  if (swiperIndex === 0) return 2;
                  return swiperIndex - 1;
                })();
                setActiveIndex(index);
              }}
              modules={[Pagination, Navigation]}
              className="rounded-lg"
            >
              {slideProps.map((item, i) => (
                <SwiperSlide
                  className="w-full flex justify-center"
                  key={i}
                >
                  <img
                    className="cursor-pointer w-full h-[40vh] rounded-lg object-cover"
                    src={item.img}
                    alt={`slide-${i}`}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <p className="font-medium text-lg mb-1">
              {slideProps[activeIndex].title}
            </p>
            <p>{slideProps[activeIndex].description}</p>
          </div>

          <div className="flex gap-2 items-center">
            <button id="login-button-prev" type="button">
              <Icon icon="ic:round-chevron-left" width={20} />
            </button>
            <div
              id="login-bullets"
              className="flex gap-2 items-center"
            />
            <button id="login-button-next" type="button">
              <Icon icon="ic:round-chevron-right" width={20} />
            </button>
          </div>
        </div>
        <img
          src={Ornament}
          alt="ornament"
          className="absolute bottom-0 right-0 z-[1]"
        />
      </div>
    </div>
  );
}
