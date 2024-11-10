// import { useState } from 'react';
import './App.css';
import { HomePageStockSection } from './components/homepagestocksection.js';
// import {Login} from './components/login.js'
// import { Signup } from './components/signup.js';
import {Link} from 'react-router-dom'
// import { Card } from './components/card.js';


function App() {

// const [isLoginScreenVisible , setLoginMode] = useState(false);
// const [screenOpacity , setScreenOpacity] = useState('opacity-90');
// const [apidata, setapidata] = useState(null);


// const [isSignUpScreenVisible , setSignUpMode] = useState(false);

// useEffect(() => {
//   const getapidata = async () => {
//     const res = await fetch(`https://api.polygon.io/v1/open-close/AAPL/2024-09-13?adjusted=true&apiKey=rVhchUPwV9K0U8U8IsGwe4bvQLh0Mb5_`);
//     const result = res.json();
//     setapidata(result);
//   }

//   getapidata();
// },[apidata]);

// const signUpScreenPopUp = () => {
//   setScreenOpacity('opacity-20');
//   setSignUpMode(true);
// }
// const logInScreenPopUp = () => {
//   setScreenOpacity('opacity-20');
//   setLoginMode(true);
// }

  return (
    <>
    {/* {isLoginScreenVisible && <Login />}
    {isSignUpScreenVisible && <Signup />} */}
    {/* <Outlet /> */}
    <div className={`bg-app-background h-screen w-screen bg-[length:85%_180%] opacity-90 bg-center transition-opacity duration-200`}>
      <div className=" bg-gradient-to-b from-black/40 to-black h-full w-full">
        <div className="font-extrabold pt-44 ml-36 text-8xl text-white">
          EQUITYELITE
        </div> {/* jab element top pe ho toh margin top pe nhi dalna hai padding dalna hai */}
        <div className="font-bold mt-3 ml-40 text-md text-white/65">
              Your Ultimate Destination for Real-Time Market Insights and Trading Tools.
        </div>
        <div className='flex flex-row'>
          <Link className='bg-blue-800 hover:bg-blue-600 pb-1 text-white ml-40 mt-12 h-16 w-52 text-2xl font-bold rounded-xl hover:border flex justify-center items-center' to="signup">Get Started</Link>
          <Link className='bg-green-700 hover:bg-green-500 pb-1 text-white ml-20 mt-12 h-16 w-52 text-2xl font-bold rounded-xl hover:border flex justify-center items-center' to="login"> Log In</Link>
        </div>
        {/* {
          // apidata.map((card) => {
            apidata && <Card val={apidata} />
          // })
        } */}
        <HomePageStockSection />
      </div>
    </div>
    </>
    
  );
}

export default App;
