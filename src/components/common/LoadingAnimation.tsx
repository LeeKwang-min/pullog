import { ClockLoader } from "react-spinners";

function LoadingAnimation() {
  return (
    <div className="absolute top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-600 bg-opacity-50">
      <ClockLoader />
      <div className="absolute z-50 flex text-3xl font-semibold -translate-x-1/2 -translate-y-1/2 left-1/2 top-2/3">
        <span className="animate-bounce [animation-delay:0.1s]">L</span>
        <span className="animate-bounce [animation-delay:0.2s]">O</span>
        <span className="animate-bounce [animation-delay:0.3s]">A</span>
        <span className="animate-bounce [animation-delay:0.4s]">D</span>
        <span className="animate-bounce [animation-delay:0.5s]">I</span>
        <span className="animate-bounce [animation-delay:0.6s]">N</span>
        <span className="animate-bounce [animation-delay:0.7s]">G</span>
        <span className="animate-bounce [animation-delay:0.8s]">.</span>
        <span className="animate-bounce [animation-delay:0.9s]">.</span>
        <span className="animate-bounce [animation-delay:0.10s]">.</span>
      </div>
    </div>
  );
}

export default LoadingAnimation;
