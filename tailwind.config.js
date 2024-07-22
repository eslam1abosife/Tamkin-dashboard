/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [],
  theme: {
    extend:{
      order: {
        '1': '1',
        '2': '2',
      },
      direction: {
        'rtl': 'rtl',
      },
      screens: {
        'ipad-min': '768px',
        
        'ipad-max': {'min': '1023px','max':'1024px'},
        'ret-max': {'min': '1381px','max':'1382px'},
        '3xl': {'min': '1900px'},
      },
      borderImage: {
        'gradient-to-b': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%) 1'
      },
      colors: {
        
        tamkin : '#2DADA3',
        secondary_text:'#585b5b',
        light:'#A7A7A7',
        lightGrey:'#D9D9D9',
        darkGrey:'#585B5B',
        tamkinStart: '#2DADA3',
        tamkinEnd: '#71DAD2',
        tamkinLight:'#DAF3F1',
        whiteTamkin:'#FFFEFE',
        error:'#EA4335',
        tamkinLight:'#DAF3F1',
        tamkingErrorInput:"#EF7267",
        lightMenuBarColor:"#F2F2F2",
        linecolor:"#C5C5C5",
        darkTamkin:'#222f44'
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      backgroundImage: {
        'embded-code-gradient': 'linear-gradient(90deg, #77A1D3 8.17%, #5DAEDD 25.67%, #35CCCA 42.67%, #E684AE 66.67%)',
        'custom-gradient': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
        'bg-dashboard-gradient': 'linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%)',
        'gradient-to-b': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
'tamkin-main-bg': 'linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%)',
        'tamkin-main-bg-dark': 'linear-gradient(180deg, #222f44 0%, #30475e 47.07%, #3b6978 72.04%, #464e59 100%)',
      },
      
      // backgroundImage: {
      //   'tamkin-gradient-btn': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
      // },
      backgroundColor: {
        'light-grey': '#D9D9D9', // Define the bg-light-grey class
      },
    },
  

  },
  variants: {
    extend: {
      order: ['responsive'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwind-extended-shadows"),
    function ({ addUtilities }) {
      addUtilities({
        '.bg-gradient-checked': {
          'background-image': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
        },
      });
    },
    function ({ addUtilities }) {
      const newUtilities = {
        '.direction-rtl': {
          direction: 'rtl',
        },
        '.direction-ltr': {
          direction: 'ltr',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}

