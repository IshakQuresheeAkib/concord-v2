import Lottie from 'lottie-react'
import loaderLottie from '@/assets/loader.json'

interface LoaderProps {
  /** Lottie animation width in rem */
  width?: number
  /** Container height as a CSS value — defaults to '100vh' (full screen) */
  height?: string
}

const Loader = ({ width = 13, height = '100vh' }: LoaderProps) => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height }}
    >
      <Lottie animationData={loaderLottie} style={{ width: `${width}rem` }} />
    </div>
  )
}

export default Loader
