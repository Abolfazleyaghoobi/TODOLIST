import { GTFDB, initDB } from "./createIndexDB/indexDB.js";
function generatItemWithTimer(task) {

 
  // return `
  //   <li class="border rounded-xl p-4 mb-4 bg-white shadow-sm">
  //               <!-- Header -->
  //               <div class="flex justify-between items-center">
  //                 <h3 class="text-[30px] font-bold">${task.title}</h3>

  //                 <div class="flex items-center gap-2">
  //                   <span
  //                     class="bg-teal-100 text-teal-800 px-2 py-1 rounded text-[20px]"
  //                     >Hard: <b class="font-Laila">${task.hard}</b></span
  //                   >
  //                   ${
  //                     task.time?`
  //                     <span
  //                     class="flex bg-cyan-100 text-gray-800 px-2 py-1 rounded text-[20px]"
  //                     >Countdown:
  //                     <b class="font-Laila ml-1">
  //                       <span>${task.time.hourse}</span>
  //                       :
  //                       <span>${task.time.min}</span>
  //                       :
  //                       <span>${task.time.sec}</span>
  //                     </b>
  //                   </span>

  //                     `:""
  //                   }
  //                   <button
  //                     class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[20px] relative group"
  //                   >
  //                     S&S
  //                     <div class="absolute text-white bg-gray-700 w-24 rounded-[9px] p-1 top-[-42px] right-[-43px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-[-26px] transition-all duration-300">
  //                       Start And Stop
  //                     </div>
  //                   </button>
  //                   <button
  //                     class="px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200 text-[20px]"
  //                   >
  //                     Edit
  //                   </button>
  //                   <button
  //                     class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-[20px] removeTask  "
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               </div>

  //               <!-- Description -->
  //               <div class="mt-3 bg-yellow-50 rounded p-3">
  //                 <div class="flex justify-between items-center cursor-pointer">
  //                   <span class="font-semibold text-[25px] text-gray-800"
  //                     >Description</span
  //                   >
  //                   <span class="text-gray-600">
  //                     <img class="w-12" src="./public/icons/icons8_collapse_arrow_1.svg" alt="">
  //                   </span>
  //                 </div>
  //                 <p class="text-[20px] text-gray-700 mt-2">
  //                  ${task.desc}
  //                 </p>
  //               </div>
  //             </li>
  // `;
return `
 <li class="border rounded-xl p-4 mb-4  ${task.isCompleted?"bg-green-200":"bg-white"}  shadow-sm flex " id='${task.id}'>
              <!-- check box -->
              <div class=" pt-4 pr-3" >
                <input
                  class="scale-150 accent-green-600"
                  type="checkbox"
                  name=""
                  ${task.isCompleted?"checked":""}
                  id="checkTask"
                />
              </div>
              <div class="w-[100%]">
                <!-- Header -->
                <div class="flex justify-between items-center">
                  <h3 class="text-[30px] font-bold">${task.title}</h3>

                  <div class="flex items-center gap-2">
                    <span
                      class="bg-teal-100 text-teal-800 px-2 py-1 rounded text-[20px]"
                      >Hard: <b class="font-Laila">${task.hard}</b></span
                    >
                   ${
                    task.time?`
                     <span
                      class="flex bg-cyan-100 text-gray-800 px-2 py-1 rounded text-[20px]"
                      >Countdown:
                      <b class="font-Laila ml-1">
                        <span>${task.time.hourse}</span>
                        :
                        <span>${task.time.min}</span>
                        :
                        <span>${task.time.sec}</span>
                      </b>
                    </span>
                    `:""
                   }

                    <button
                      class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[20px] relative group"
                    >
                      S&S
                      <div
                        class="absolute text-white bg-gray-700 w-24 rounded-[9px] p-1 top-[-42px] right-[-43px] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:right-[-26px] transition-all duration-300"
                      >
                        Start And Stop
                      </div>
                    </button>
                    <button
                      class="px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200 text-[20px]"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-[20px] removeTask "
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <!-- Description -->
                <div class="mt-3 bg-yellow-50 rounded p-3">
                  <div class="flex justify-between items-center cursor-pointer">
                    <span class="font-semibold text-[25px] text-gray-800"
                      >Description</span
                    >
                    <span class="text-gray-600">
                      <img
                        class="w-12  transition-all duration-500 " 
                       
                        src="./public/icons/icons8_collapse_arrow_1.svg"
                        alt=""
                      id="showDesc"
                      />
                    </span>
                  </div>
                  <p id="contentDescTask" class="text-[20px] text-gray-700 mt-2 h-0 overflow-hidden   transition-all duration-500">
               ${task.desc}
                  </p>
                </div>
              </div>
            </li>
`
}
export async function showTask(conItem) {
  // let allTask;
  let task = await initDB().then((res) => {
    return GTFDB();
  });

  conItem.innerHTML = "";
  // console.log("task: ", task);

  task.forEach((t) => {
    if (t) {
      conItem.insertAdjacentHTML("beforeend", generatItemWithTimer(t));
    } else {
      conItem.innerHTML = `
        <p>not task</p>
        `;
    }
  });
}
