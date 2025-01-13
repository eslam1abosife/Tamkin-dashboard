/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-in',
        slideOutLeft: 'slideOutLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        slideOutRight: 'slideOutRight 0.5s ease-in',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'custom-light': '1px 1px 11.5px 0px #A3F6F0',
      },
      order: {
        1: "1",
        2: "2",
      },
      direction: {
        rtl: "rtl",
      },
      screens: {
        xs: { min: "300px", max: "350px" },
        "ipad-min": "768px",
        "ipad-max": { min: "1023px", max: "1024px" },
        "ret-max": { min: "1381px", max: "1382px" },
        "3xl": { min: "1900px" ,max:"1900px"},
        "4xl": { min: "1920px" },
      },
      borderImage: {
        "gradient-to-b": "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%) 1",
      },
      colors: {
        tamkin: "#2DADA3",
        secondary_text: "#585b5b",
        light: "#A7A7A7",
        lightGrey: "#D9D9D9",
        darkGrey: "#585B5B",
        tamkinStart: "#2DADA3",
        tamkinEnd: "#71DAD2",
        tamkinLight: "#DAF3F1",
        whiteTamkin: "#FFFEFE",
        error: "#EA4335",
        tamkingErrorInput: "#EF7267",
        lightMenuBarColor: "#F2F2F2",
        linecolor: "#C5C5C5",
        darkTamkin: "#384558",
        darkSecondary: "#303E56",
        tamkinDarkPrimary: "#323E50",
        darkborder:'#8F8F8F'
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      backgroundImage: {
        "embded-code-gradient":
          "linear-gradient(90deg, #77A1D3 8.17%, #5DAEDD 25.67%, #35CCCA 42.67%, #E684AE 66.67%)",
        "custom-gradient": "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)",
        "bg-dashboard-gradient":
          "linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%)",
        "gradient-to-b": "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)",
        "tamkin-main-bg":
          "linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%)",
        "tamkin-main-bg-dark":
          "linear-gradient(180deg, #222f44 0%, #30475e 47.07%, #3b6978 72.04%, #464e59 100%)",
        "tamkin-primary":
          "linear-gradient(180deg, rgba(45, 173, 163, var(--tw-bg-opacity)) 0%, rgba(113, 218, 210, var(--tw-bg-opacity)) 100%)",
        "tamkin-disabled":
          "linear-gradient(180deg, rgba(171, 176, 176, var(--tw-bg-opacity)) 0%, rgba(171, 176, 176, var(--tw-bg-opacity)) 100%)",
        "accessNavbarbg":'linear-gradient( 180deg, #fefefe 0%, #eef5ff 47.07%, #f6f3fc 72.04%, #fef5f6 100% )',
        "tamkin-white": "   linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);",
        'tamkin-accessibility-navbar':'linear-gradient(180deg, #303E56 0%, #303E56 100%)',
        'gradient-services': 'linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%)',
      },
      backgroundColor: {
        "light-grey": "#D9D9D9", // Define the bg-light-grey class
      },
    },
  },
  variants: {
    extend: {
      order: ["responsive"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-extended-shadows"),
    // require('tailwind-scrollbar'),
    function ({ addVariant, e }) {
      addVariant("disabled:hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `disabled:hover${separator}${className}`
          )}:disabled:hover`;
        });
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        ".bg-gradient-checked": {
          "background-image":
            "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)",
        },
      });
    },
    function ({ addUtilities }) {
      const newUtilities = {
        ".direction-rtl": {
          direction: "rtl",
        },
        ".direction-ltr": {
          direction: "ltr",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
