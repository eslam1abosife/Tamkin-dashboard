/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
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
        "3xl": { min: "1900px" },
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
        tamkinLight: "#DAF3F1",
        tamkingErrorInput: "#EF7267",
        lightMenuBarColor: "#F2F2F2",
        linecolor: "#C5C5C5",
        darkTamkin: "#384558",
        darkSecondary: "#303E56",
        tamkinDarkPrimary: "#323E50",
        darkborder:'#333333'
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
        'tamkin-accessibility-navbar':'linear-gradient(180deg, #303E56 0%, #303E56 100%)'
      },

      // backgroundImage: {
      //   'tamkin-gradient-btn': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
      // },
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
