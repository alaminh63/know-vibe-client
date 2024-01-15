import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const slider = [
    {
      id: 1,
      image:
        "https://www.ineteconomics.org/uploads/featured/iStock-1171902434.jpg",
      title: "Gateway to Adventure",
      heading: "Explore the Technology",
      subheading: "Learn more and make success the result of perfection.",
    },
    {
      id: 2,
      image:
        "https://www.amscreators.com/sites/default/files/2021-08/slider_1.png",
      title: "video courses on almost any topic",
      heading: "Find Your Perfect Courses  ",
      subheading:
        "Start learning with our experts and give a new way to your career.",
    },
    {
      id: 3,
      image:
        "https://png.pngtree.com/background/20210710/original/pngtree-company-profile-corporate-culture-brochure-cross-page-design-background-material-picture-image_1011696.jpg",
      title: "Learn from industry experts",
      heading: "Improve Your Skills",
      subheading:
        "You will get your own pace where you can find all the relevant courses for you. ",
    },
  ];

  return (
    <div>
      <Swiper
        className="mySwiper h-[80vh]"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {slider.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              backgroundImage: `linear-gradient(38deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 100%), url(${item.image})`,
            }}
            className="w-full bg-center bg-cover "
          >
            <div className="max-w-screen-xl mx-auto px-5 flex  h-full items-center ">
              <div className="md:w-1/2 flex flex-col gap-3">
                <h5 className="text-[#FF5522] font-semibold italic">
                  {item.title}
                </h5>
                <h1 className="text-5xl font-bold text-white">
                  {item.heading}
                </h1>
                <p className="text-white text-base">{item.subheading}</p>
                <Link
                  to={"/destination"}
                  className="bg-[#FF5522]  flex justify-center py-2 rounded-md text-white hover:bg-[#ec7551] transition-all w-32"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
