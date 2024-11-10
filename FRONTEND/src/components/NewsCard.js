import React from "react";

export function NewsCard({ image, title, url, summary }) {
  return (
    <div className="p-4 group transition-transform transform hover:scale-[1.04] duration-300 ease-in-out">
      <div className="bg-[#131213] shadow-lg rounded-lg overflow-hidden flex">
        <figure className="w-1/3 h-full p-2 flex justify-center items-center">
          <img src={image} alt={title} className="max-w-full h-auto rounded-md" />
        </figure>
        <div className="p-6 w-2/3 flex flex-col">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xl">
            <div className="font-extrabold text-purple-500 hover:text-green-600 text-2xl">{title}</div>
          </a>
          <p className="text-slate-200 text-md mt-2">{summary}</p>
        </div>
      </div>
    </div>
  );
}

//transition-transform transform hover:scale-104 duration-300 ease-in-out">
//tailwind mai kisi bhi chiz ka size badhana hai toh
