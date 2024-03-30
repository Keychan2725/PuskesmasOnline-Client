import React from "react";

const IconLoader = () => (
  <div
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    style={{ transform: "translate(-50%, -50%)" }}
  >
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-4 border-rose-500 border-t-transparent"></div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <svg
          className="absolute w-10 h-10 text-red-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 18.166c-.43 0-.86-.166-1.19-.5l-6.31-6.31c-.66-.66-.66-1.733 0-2.394.662-.66 1.734-.66 2.394 0l1.945 1.944 1.945-1.944c.66-.66 1.732-.66 2.394 0 .66.66.66 1.733 0 2.394l-6.31 6.31c-.33.332-.76.5-1.19.5zm-7.97-9.88a4.152 4.152 0 015.894-.073L10 8.073l1.075-1.075a4.152 4.152 0 015.894.073c1.63 1.63 1.63 4.285 0 5.915l-7.97 7.97-7.97-7.97c-1.63-1.63-1.63-4.285 0-5.915z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              // to="0 10 10"
              // from="360 10 10"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <path
            className="text-gray-200"
            strokeLinecap="round"
            strokeWidth="2"
            d="M3 10h14"
          >
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="M3 10h14;M3 10h3l2-4 2 4h3;M3 10h14"
            />
          </path>
        </svg>
      </div>
    </div>
  </div>
);

export default IconLoader;
