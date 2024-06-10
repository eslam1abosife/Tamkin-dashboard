/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend:{
      colors: {
        
        tamkin : '#2DADA3',
        secondary_text:'#585b5b',
        light:'#A7A7A7',
        lightGrey:'#D9D9D9',
        darkGrey:'#585B5B',
        tamkinStart: '#2DADA3',
        tamkinEnd: '#71DAD2',
        tamkinLight:'#DAF3F1'
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      // backgroundImage: {
      //   'tamkin-gradient-btn': 'linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)',
      // },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}

