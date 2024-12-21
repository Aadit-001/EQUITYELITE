import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './layout';
// import { GlobalProvider } from './GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout userName={userName}/>}>
//       <Route path='' element={<App />} />
//       <Route path='home' element={<Home />} />
//       <Route path='stocks' element={<Stocks />} />
//       <Route path='community' element={<Community />} />
//       <Route path='learn' element={<Learn />} />     
//       <Route path='news' element={<News/>} />
//       <Route path='login' element={<Login setUserName={setUserName}/>} />  
//       <Route path='signup' element={<Signup />} />
//     </Route>  
//   )
// )


root.render(
  
      // <GlobalProvider>
  <React.StrictMode>
    <Router>
        <Layout />
    </Router>
  </React.StrictMode>
      // </GlobalProvider>
);
reportWebVitals();
