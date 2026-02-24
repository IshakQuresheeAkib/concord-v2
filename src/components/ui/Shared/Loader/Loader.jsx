import Lottie from "lottie-react";
import loaderLottie from '@/assets/loader.json';

const Loader = ({width,height}) => {
    return (
        <div className={`${height || "h-screen"} flex justify-center  items-center`}>
          <Lottie animationData={loaderLottie} className={`w-${width}`}></Lottie>
        </div>
    )}
export default Loader;