import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { NewsCard } from "../components/NewsCard.js";
import LodingPage from "./LodingPage.js";
// import { useState ,useEffect } from "react";
// import GlobalContext from "../GlobalContext.js";

export default function News({setIsLoggedIn}) {
  axios.defaults.withCredentials = true; 
  const [news, setNews] = useState([]);
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`/news`, {
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
            const res = await axios.get(`/login/success`,{withCredentials:true});
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
    <div>
      <div className="  bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black flex flex-col pl-48 pr-48 pt-20 text-white">
        {news.length > 0 ? (
          news.map((article, index) => (
            <NewsCard
              key={index}
              image={article.image}
              title={article.headline}
              url={article.url}
              summary={article.summary} // Fixed typo from 'summery' to 'summary'
            />
          ))
        ) : (
          <LodingPage />
        )}
        </div>
      </div>
    );
  }    