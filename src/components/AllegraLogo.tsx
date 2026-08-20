import React from 'react';

interface AllegraLogoProps {
  className?: string;
  size?: number;
  variant?: 'dark' | 'light' | 'gold' | 'monochrome';
  showText?: boolean;
}

export const AllegraLogo: React.FC<AllegraLogoProps> = ({
  className = '',
  size = 48,
  variant = 'dark',
  showText = false,
}) => {
  // Color palette according to variant
  const isDark = variant === 'dark';
  const isLight = variant === 'light';
  const isGold = variant === 'gold';

  const strokeColor = isLight ? '#FFFFFF' : isGold ? '#C8A96B' : '#2D2825';
  const textColor = isLight ? '#FFFFFF' : isGold ? '#C8A96B' : '#2D2825';
  const bgColor = isLight ? 'rgba(255, 255, 255, 0.08)' : isGold ? 'rgba(200, 169, 107, 0.1)' : '#F5EFEB';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Circular paths for curved text */}
          <path
            id="top-circle-path"
            d="M 45 150 A 105 105 0 0 1 255 150"
            fill="none"
          />
          <path
            id="bottom-circle-path"
            d="M 255 150 A 105 105 0 0 1 45 150"
            fill="none"
          />
        </defs>

        {/* Soft elegant background disk */}
        <circle cx="150" cy="150" r="142" fill={bgColor} />

        {/* Outer Scalloped / Wavy Flower Seal Border (16 scallops) */}
        <path
          d="
            M 150 12
            C 162 12, 172 17, 180 26
            C 192 23, 204 27, 212 36
            C 223 38, 233 46, 237 57
            C 248 64, 254 76, 254 88
            C 263 98, 266 111, 263 123
            C 269 135, 268 149, 263 161
            C 265 174, 261 187, 252 197
            C 250 209, 242 220, 231 227
            C 225 238, 214 246, 202 249
            C 193 258, 180 263, 168 261
            C 156 268, 144 268, 132 261
            C 120 263, 107 258, 98 249
            C 86 246, 75 238, 69 227
            C 58 220, 50 209, 48 197
            C 39 187, 35 174, 37 161
            C 32 149, 31 135, 37 123
            C 34 111, 37 98, 46 88
            C 46 76, 52 64, 63 57
            C 67 46, 77 38, 88 36
            C 96 27, 108 23, 120 26
            C 128 17, 138 12, 150 12 Z
          "
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner thin circular guiding ring */}
        <circle cx="150" cy="150" r="118" stroke={strokeColor} strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
        <circle cx="150" cy="150" r="88" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.25" fill="none" />

        {/* Top Arc Text: ALLEGRA ACADEMY */}
        <text fill={textColor} fontSize="17.5" fontWeight="600" letterSpacing="4.5">
          <textPath href="#top-circle-path" startOffset="50%" textAnchor="middle">
            ALLEGRA ACADEMY
          </textPath>
        </text>

        {/* Side decorative dots */}
        <circle cx="48" cy="150" r="3.2" fill={strokeColor} />
        <circle cx="252" cy="150" r="3.2" fill={strokeColor} />

        {/* Center Monogram Geometric Figure */}
        {/* Horizontal top bar */}
        <g stroke={strokeColor} strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter">
          {/* Top 'roof' bar of the 7 / LM */}
          <path d="M 142 110 L 198 110 L 198 138" fill="none" strokeWidth="5.5" strokeLinecap="square" />

          {/* Left vertical column (A / L stem) */}
          <line x1="108" y1="110" x2="108" y2="190" strokeWidth="5.5" />

          {/* Right vertical column */}
          <line x1="192" y1="110" x2="192" y2="190" strokeWidth="5.5" />

          {/* Main crossbar crossing horizontally */}
          <path d="M 82 128 L 218 128" strokeWidth="5" strokeLinecap="round" />

          {/* Central curving loop / arch connecting the monogram */}
          <path
            d="M 108 138 C 122 172, 142 188, 150 190 C 158 188, 178 172, 192 138"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Sub-label: MASTER */}
        <text
          x="150"
          y="214"
          textAnchor="middle"
          fill={textColor}
          fontSize="14.5"
          fontWeight="700"
          letterSpacing="4"
          fontFamily="'Montserrat', sans-serif"
        >
          MASTER
        </text>

        {/* Bottom Arc Text: LETICIA MOCTEZUMA */}
        <text fill={textColor} fontSize="15.5" fontWeight="600" letterSpacing="4">
          <textPath href="#bottom-circle-path" startOffset="50%" textAnchor="middle">
            LETICIA MOCTEZUMA
          </textPath>
        </text>
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-heading text-xl font-bold tracking-wider uppercase leading-none" style={{ color: textColor }}>
            Allegra Salon
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium mt-1" style={{ color: isLight ? '#E8DDD4' : '#C8A96B' }}>
            Master Leticia Moctezuma
          </span>
        </div>
      )}
    </div>
  );
};
