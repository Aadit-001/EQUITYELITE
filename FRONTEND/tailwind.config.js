/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'backgroundColor': '#000000',
        'cardcolor': '#111010',  
      },
      backgroundImage:{
        'app-background': "url('./Homepageimage.png')",
        'signupwithgoogle' : "url('./SignUpWithGoogle.png')",
        'signinwithgoogle' : "url('./SignInWithGoogle.png')",
      },
      backgroundSize:{
        '17': "4.25rem",
      },
      fontSize:{
        'h-17' : "66px",
        'w-63' : "210",
      }
    },
  },
  plugins: [],
}