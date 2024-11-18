import Image from "next/image";

export default function BackgroundContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-steelGray">
      <svg
        width="1227"
        height="725"
        viewBox="0 0 1227 725"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed pointer-events-none"
      >
        <g filter="url(#filter0_f_131_1958)">
          <path
            d="M764.305 155.845C971.197 93.2941 924.862 -65.566 916.279 -109.023L16.4648 -121.894L5.80219 413.571C27.2983 433.091 82.4352 440.587 131.014 314.414C191.737 156.698 505.69 234.033 764.305 155.845Z"
            fill="url(#paint0_linear_131_1958)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_131_1958"
            x="-294.198"
            y="-421.894"
            width="1520.89"
            height="1146.53"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur_131_1958"
            />
          </filter>
          <linearGradient
            id="paint0_linear_131_1958"
            x1="77.0009"
            y1="392.709"
            x2="937.35"
            y2="148.72"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0385781" stopColor="#0A51A5" />
            <stop offset="1" stopColor="#C54FC8" />
            <stop offset="1" stopColor="#821A84" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        width="755"
        height="258"
        viewBox="0 0 755 258"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed bottom-0 right-0"
      >
        <g opacity="0.8" filter="url(#filter0_f_131_1959)">
          <ellipse
            cx="600.483"
            cy="570.281"
            rx="399.846"
            ry="318.467"
            transform="rotate(-33.8767 600.483 570.281)"
            fill="#A287F4"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_131_1959"
            x="0.335861"
            y="0.840775"
            width="1200.29"
            height="1138.88"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="111.812"
              result="effect1_foregroundBlur_131_1959"
            />
          </filter>
        </defs>
      </svg>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
