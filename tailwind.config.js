/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "300px",
      tablet: "768px",
      desktop: "1000px",
    },
    container: {
      center: true,
      padding: 10,
      screens: {
        ssm: "450px",
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
    },
    backgroundImage: {
      "home-texture": "url('/images/gem.png')",
    },
    extend: {
      colors: {
        primary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#cce0ff",
          400: "#4c94ff",
          500: "#1975ff",
          700: "#0052cc",
        },
        indicator: {
          focused: {
            DEFAULT: "#4C94FF",
            alternative: "#CCE0FF",
          },
          white: "#FFFFFF",
          light: "#CED2DA",
          medium: "#97A1AF",
          normal: "#141C24",
          error: "#F64C4C",
          attention: "#FFB219",
          positive: "#40BF7F",
        },
      },
      textColor: {
        invert: "#ffffff",
        primary: "#141c24",
        secondary: "#344051",
        tertiary: "#637083",
        quartenery: "#97a1af",
        error: "#f64c4c",
        danger: {
          DEFAULT: "#FF1414",
          disabled: "#FF5A5A",
        },
        success: {},
        brand: {
          DEFAULT: "#1975ff",
          hover: "#0052CC",
          disabled: "#cce0ff",
        },
      },
      backgroundColor: {
        danger: {
          DEFAULT: "#FF3939",
          hover: "#FF4F4F",
          pressed: "#FF1E1E",
          disabled: "#FFCFCF",
        },
        primary: {
          DEFAULT: "#ffffff",
          pressed: "#1975ff",
          hover: "#0052cc",
        },
        secondary: "#f3f4f6",
        tertiary: "#f9fafb",
        disabled: "#f3f4f6",
        brand: {
          DEFAULT: "#1975ff",
          extralight: "#cce0ff",
        },
      },
      borderColor: {
        extralight: "#E3E5E5",
        light: "#CED2DA",
        medium: "#97A1AF",
      },
      outlineColor: {
        extralight: "#E3E5E5",
        light: "#CED2DA",
        medium: "#97A1AF",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
