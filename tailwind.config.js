/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend:{
      screens: {
        'ipad-min': '768px',
        
        'ipad-max': {'min': '1023px','max':'1024px'},
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
        linecolor:"#C5C5C5"
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
      },
      // backgroundImage: {
      //   'tamkin-gradient-btn': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
      // },
      backgroundColor: {
        'light-grey': '#D9D9D9', // Define the bg-light-grey class
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}

