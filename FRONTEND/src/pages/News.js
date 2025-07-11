import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { NewsCard } from "../components/NewsCard.js";
import LodingPage from "./LodingPage.js";
// import { useState ,useEffect } from "react";
// import GlobalContext from "../GlobalContext.js";

export default function News({setIsLoggedIn}) {
  axios.defaults.withCredentials = true; 
  const url = process.env.REACT_APP_API_BASE_URL;
  const [news, setNews] = useState([]);
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${url}/news`, {
          withCredentials: true, // Include credentials if needed
        });
        setNews(response.data.slice(0, 101)); // Correctly accessing response data
        console.log(response.data);
      } catch (error) {
        console.log("error in frontend", error);
      }
    };

    fetchNews();
  }, []); 
  
  // Add empty dependency array to avoid infinite loop

  //
  // const [userdata,setuserdata] = useState({});
    //isme agar user data mila tabhi hi user loggedin hai warna nhi hai

    const getUser = async()=>{
        try {
            const res = await axios.get(`${url}/login/success`,{withCredentials:true});
            console.log(res);
            // setuserdata(res.data.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getUser();
    },[])

  return (
    <div className="min-h-screen bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black">
      {/* Page Header */}
      <div className="pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
          Latest Market News
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mx-auto"></div>
      </div>
      
      {/* News Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div key={index} className="transform transition-transform duration-300 hover:scale-[1.02]">
                <NewsCard
                  image={article.image}
                  title={article.headline}
                  url={article.url}
                  summary={article.summary}
                />
              </div>
            ))}
          </div>
        ) : (
          // <div className="flex items-center justify-center min-h-[50vh]">
            <LodingPage />
          // </div>
        )}
      </div>
    </div>
    );
  }    