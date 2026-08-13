tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#006a9c',       /* 指定のブルー */
        primaryLight: '#e6f3f8',  /* 薄いブルー（背景やホバー用） */
        beige: '#fdfbf9',         /* 非常に薄いベージュ（ベース背景用） */
        beigeDark: '#f4ede4',     /* 少し濃いベージュ（アクセント背景用） */
        line: '#06C755',          /* LINEグリーン */
        textMain: '#333333',
        textLight: '#666666',
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,106,156,0.1)',
      }
    }
  }
}
