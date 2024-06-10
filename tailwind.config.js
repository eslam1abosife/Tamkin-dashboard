/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend:{
      colors: {
        tamkin : '#47BEB5',
        secondary_text:'#585b5b',
        light:'#d9d9d9',
        lightGrey:'#fffefe'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}

