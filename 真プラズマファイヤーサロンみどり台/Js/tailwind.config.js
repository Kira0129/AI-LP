tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          main: '#F08DA1',     /* 明るく親しみやすいピンク */
          light: '#FDF3F5',    /* 背景用の極薄ピンク */
          dark: '#D9657B',     /* 濃いめのピンク */
          accent: '#F2A65A',   /* アクセントのオレンジ */
          deco: '#9bc96f',     /* 装飾用の明るいグリーン */
          text: '#554A4B',     /* 柔らかいブラウン/チャコールグレー */
          bg: '#FFFDFD'        /* ページ全体の背景 */
        }
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      }
    }
  }
}
