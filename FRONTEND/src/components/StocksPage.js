import React from "react";
// import { Search, UserCircle } from "lucide-react";


// Section Component for Stock Data and Recent News
// function Section({ title, itemCount }) {
//   return (
//     <section className="space-y-4">
//       <h2 className="text-2xl font-semibold mb-2">{title}</h2>
//       <div className="space-y-4">
//         {[...Array(itemCount)].map((_, i) => (
//           <div
//             key={i}
//             className={`h-24 bg-gradient-to-br ${
//               title === "Stock Data"
//                 ? "from-pink-600/20 to-purple-600/20"
//                 : "from-blue-600/20 to-purple-600/20"
//             } rounded-2xl border ${
//               title === "Stock Data" ? "border-pink-500/10" : "border-blue-500/10"
//             } backdrop-blur-sm shadow-lg`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// Main Component
export default function Component({post}) {
  return (
    <>
      <div className="h-auto p-4 mt-5 rounded-md border border-purple-500/10 bg-[#131213]/40  shadow-lg overflow-hidden">
            <div className="username-and-logo h-16 w-full p-2 flex items-center mb-2">
                <div className="logo h-14 w-14 rounded-full pb-1 bg-red-500 text-white text-3xl font-bold flex justify-center items-center cursor-pointer">{post.owner.username.charAt(0).toUpperCase()}</div>
                <div className="Name text-3xl pl-4 text-white ">{post.owner.username}</div>
            </div>
            <hr className="border-1 border-slate-600"></hr>
            <div className="post-title mt-2 mb-2 w-full h-auto pl-4 text-white text-2xl">
              {post.title}
            </div>
            <div className="post-image w-full p-1">
              {post.postFile && <img src={post.postFile} alt="Post media" />}
            </div>
            <div className="post-description w-full p-2 h-auto text-gray-500 ">
                {post.description}
            </div>
      </div>
    </>
  );
}