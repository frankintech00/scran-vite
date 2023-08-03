module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#018489",
          secondary: "#002b5c",
          accent: "#0000ff",
          neutral: "#1d1825",
          "base-100": "#fcfcfc",
          info: "#3295f1",
          success: "#19be94",
          warning: "#ff0000",
          error: "#fa0f13",
        },
      },
    ],
  },
  media: false, // Disable dark mode
};
