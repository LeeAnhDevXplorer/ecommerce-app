import React, { useContext, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductZoom.css"
const ProductZoom = () => {
  
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSlider = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSlider.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className='productZoom'>
      
      <div className="productZoom position-relative">
              <div className="badge badge-primary">28%</div>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
                slidesPerGroup={1}
                modules={[Navigation]}
                className="zoomSliderBig"
                ref={zoomSliderBig}
              >
                <SwiperSlide>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="item">
                    <InnerImageZoom
                      zoomType="hover"
                      zoomScale={1}
                      src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              navigation={true}
              slidesPerGroup={1}
              modules={[Navigation]}
              className="zoomSlider"
              ref={zoomSlider}
            >
              <SwiperSlide>
                <div className={`item ${slideIndex === 0 && "item_active"}`}>
                  <img
                    className="w-100"
                    onClick={() => goto(0)}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`item ${slideIndex === 1 && "item_active"}`}>
                  <img
                    className="w-100"
                    onClick={() => goto(1)}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`item ${slideIndex === 2 && "item_active"}`}>
                  <img
                    className="w-100"
                    onClick={() => goto(2)}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`item ${slideIndex === 3 && "item_active"}`}>
                  <img
                    className="w-100"
                    onClick={() => goto(3)}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`item ${slideIndex === 4 && "item_active"}`}>
                  <img
                    className="w-100"
                    onClick={() => goto(4)}
                    src={`https://laurenashpole.github.io/react-inner-image-zoom/images/unsplash-1-large.jpg`}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
    </div>
  )
}

export default ProductZoom;