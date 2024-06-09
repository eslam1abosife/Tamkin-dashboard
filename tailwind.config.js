/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend:{
      colors: {
        tamkin : '#47BEB5',
        secondary_text:'#585b5b',
        light:'#d9d9d9'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}

