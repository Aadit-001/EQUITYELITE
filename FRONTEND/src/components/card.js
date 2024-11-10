// export function Card(props) {
//     return (
//         <div className=" ml-8 mt-8 mb-8 w-40  rounded-md
//          flex-shrink-0 hover:ml-6 hover:mt-6 hover:mb-6 hover:h-48 hover:w-44 hover:ease-out transition-all
//          backdrop-blur-md shadow hover:shadow-blue-500 shadow-blue-50 p-1 group duration-300 ">
//             <div className="w-full pl-1 flex items-center font-bold h-8 text-lg  duration-300  text-white group-hover:h-9  transition-all">{props.val.ticker}</div>
//             <div className="w-full pl-1 flex items-top h-5  font-normal text-sm duration-300  text-white  transition-all">{props.val.name}</div>
//             <div className="w-full pl-1 flex items-center h-16  font-normal duration-300 rounded full bg-red-600 text-white transition-all group-hover:h-16">
//                 <img src={localStorage.getItem(props.val.ticker)} className="h-full w-full rounded-full  object-contain"/>    
//             </div>
//             <div className="w-full pl-1 flex items-center h-8  font-bold duration-300  text-white transition-all group-hover:h-9 group-hover:items-end">{props.val.price}</div>
//             <div className={`w-full pl-1 flex items-center h-5   duration-300 font-normal group-hover:h-6 ${props.val.red_green ? "text-green-600" : "text-red-600"} transition-all`}>{props.val.profit}</div>
//         </div>
//     );
// }


export function Card(props) {
    return (
      <div className="ml-8 mt-8 pl-2 pt-2 mb-8 w-48 rounded-md transition-transform transform hover:scale-[1.10] ease-in-out bg-[#131213]/30 flex-shrink-0  backdrop-blur-md shadow hover:shadow-blue-500 shadow-blue-50 p-1 group duration-300 ">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full">
            <img src={localStorage.getItem(props.val.ticker)} className="h-full w-full rounded-full object-contain" alt="Logo" />
          </div>
          <div className="ml-2 flex flex-col">
            <div className="font-bold text-lg text-white">{props.val.ticker}</div>
            <div className="font-normal text-sm text-white">{props.val.name}</div>
          </div>
        </div>
        <div className="flex ">
        <div className="mt-2 font-bold text-lg text-white">{props.val.price}</div>
        <div className={`mt-2 font-bold text-lg ml-6 ${props.val.red_green ? "text-green-600" : "text-red-600"}`}>
          {props.val.profit}
        </div>
        </div>
      </div>
    );
  }
  