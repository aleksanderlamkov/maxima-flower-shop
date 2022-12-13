import { Swiper, SwiperSlide } from 'swiper/react'
import Fancybox from '../components/Fancybox/Fancybox'
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
    <Fancybox
      options={{
        infinite: true,
      }}
    >
      <Swiper
        slidesPerView="1"
      >
        {images.map((imgSrc) => (
          <SwiperSlide>
            <img
              src={imgSrc}
              width="250"
              height="400"
              loading="lazy"
              data-fancybox="gallery"
              data-src="https://placekitten.com/1500/1500"
              style={{
                width: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fancybox>
  )
}

export default SliderPage