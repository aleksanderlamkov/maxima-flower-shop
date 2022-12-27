import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const CompareSliderPage = () => {
  return (
    <div>
      <h1>CompareSliderPage</h1>
      <ReactCompareSlider
        position={30}
        itemOne={<ReactCompareSliderImage src="https://picsum.photos/500/300" alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="https://picsum.photos/500/301" alt="Image two" />}
      />
    </div>
  )
}

export default CompareSliderPage