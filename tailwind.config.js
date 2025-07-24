module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: true, // ✅ 테마 적용 로그 확인 가능
    themes: ['light', 'dark'],
  },
};
