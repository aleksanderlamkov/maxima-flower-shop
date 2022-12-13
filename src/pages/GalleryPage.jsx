import Fancybox from '../components/Fancybox/Fancybox'

const ImageSliderPage = () => {
  return (
    <Fancybox
      options={{
        infinite: true,
      }}
    >
      <img
        src="https://placekitten.com/250/250"
        width="250"
        height="250"
        loading="lazy"
        data-fancybox="gallery"
        data-src="https://placekitten.com/1500/1500"
      />

      <img
        src="https://placekitten.com/250/250"
        width="250"
        height="250"
        loading="lazy"
        data-fancybox="gallery"
        data-src="https://placekitten.com/1500/1500"
      />

      <img
        src="https://placekitten.com/250/250"
        width="250"
        height="250"
        loading="lazy"
        data-fancybox="gallery"
        data-src="https://placekitten.com/1500/1500"
      />
    </Fancybox>
  )
}

export default ImageSliderPage