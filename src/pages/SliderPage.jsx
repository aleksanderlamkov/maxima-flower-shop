import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const SliderPage = () => {
  const images = [
    'https://placekitten.com/250/250',
    'https://placekitten.com/250/250',
    'https://placekitten.com/250/250',
    'https://placekitten.com/250/250',
    'https://placekitten.com/250/250',
    'https://placekitten.com/250/250',
  ]

  return (
    <Swiper
      slidesPerView="3"
    >
      {images.map((imgSrc) => (
        <SwiperSlide>
          <img
            src={imgSrc}
            width="250"
            height="250"
            loading="lazy"
            data-fancybox="gallery"
            data-src="https://placekitten.com/1500/1500"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SliderPage