module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#f8f8f8",
        txtBody: "#333",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dark", // or any other built-in themes you like
    ],
  },
};
