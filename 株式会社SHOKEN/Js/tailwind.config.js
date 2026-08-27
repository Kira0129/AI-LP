tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        en: ['Oswald', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#111111',     // スマートな漆黒
          green: '#00A86B',     // カジュアルでスマートなグリーン
          lightGreen: '#e6f7f0', // 薄いグリーン（背景用）
          white: '#ffffff',
          gray: '#f9f9f9',      // オフホワイト
          darkGray: '#444444'   // テキスト用グレー
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-bg': 'slideBg 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'fv-slide-1': 'fvSlide1 10s infinite',
        'fv-slide-2': 'fvSlide2 10s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideBg: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        fvSlide1: {
          '0%, 40%': { opacity: '1', transform: 'scale(1)' },
          '50%, 90%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fvSlide2: {
          '0%, 40%': { opacity: '0', transform: 'scale(1.05)' },
          '50%, 90%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  }
}
