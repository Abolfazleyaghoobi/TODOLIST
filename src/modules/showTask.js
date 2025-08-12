import { GTFDB, initDB } from "./createIndexDB/indexDB.js";
function generatItemWithTimer(task) {
  return `
    <li
  class="flex justify-between border-b-[black] border-b border-solid pb-2"
  dataId="${task.id}" id="${task.id}" name="taskItem">
  <!-- show title and Description -->
  <div class=" relative">
    <h1 class="font-black">${task.title}</h1>
    <p class="relative  w-87 h-7  overflow-hidden">
      
    ${task.desc}


    </p>
  </div>
  <!-- hard todo -->
  <div class="relative left-[-52px] flex-col flex">
    <!-- icon -->
    <span class="bg-gray-300 text-right">
      <i class="bi bi-caret-down-fill text-[18px]"></i>
    </span>
    <h2 class="p-[3px] bg-amber-50 rounded-[9px]">Hard:${task.hard}</h2>
  </div>
  <!-- edit and delet and timer -->
  <div
    class="justify-between items-center flex w-80 border-l-[black] border-l border-solid pl-1"
  >
    <!-- show timer -->
 ${
   task.time
     ? `
       <div class="text-[19px]">
      <span>${task.time.hourse}</span>
      :
      <span>${task.time.min}</span>
      :
      <span>${task.time.sec}</span>
    </div>
     <!-- stop and start BTN -->
    <div class="">
      <button class="bg-purple-50 p-1 rounded-[9px]">
        Start & Stop
      </button>
    </div>
    `
     : ""
 }
   
    <!-- edit and delet BTN -->
    <div class="">
      <span class="text-[23px] mr-4">
        <i class="bi bi-pencil-fill"></i>
      </span>
      <span class="text-[23px]">
        <i class="bi bi-trash-fill removeTask"   dataId="${task.id}"></i>
      </span>
    </div>
  </div>
</li>
    `;
}
export async function showTask(conItem) {
  // let allTask;
  let task = await initDB().then((res) => {
    return GTFDB();
  });

  conItem.innerHTML = "";
  console.log("task: ", task);

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
