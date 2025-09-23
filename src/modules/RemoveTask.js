// import { GTFDB, initDB, removeTask } from "./createIndexDB/indexDB";
// import { showTask } from "./showTask";

// export async function RemoveModule(conItem) {
  
//   conItem.addEventListener("click",async (e) => {
//     let task = await initDB().then((res) => {
//       return GTFDB();
//     });
//     const id=e.target.id;
 

//     // removeTask
//     if (id==="removeTask") {
//       const taskItem = e.target.parentElement.parentElement.parentElement.parentElement;


//       const id = +taskItem.id
//       console.log('id: ', id);

//       task = task.filter((t) => t.id !== id);
//      removeTask(task)
//      showTask(conItem)

//     }
   
    
//   });
// } 

import { GTFDB, initDB, removeTask } from "./createIndexDB/indexDB";
import { showTask } from "./showTask";

export async function RemoveModule(conItem) {
  conItem.addEventListener("click", async (e) => {
    let task = await initDB().then(() => GTFDB());

    const id = e.target.id;

    if (id === "removeTask") {
      const taskItem = e.target.parentElement.parentElement.parentElement.parentElement;

      const taskId = +taskItem.id; // عددش کن
      console.log("taskId: ", taskId);

      await removeTask(taskId);   // ✅ فقط id رو بده
      showTask(conItem);
    }
  });
}
