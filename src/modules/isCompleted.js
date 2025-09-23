// import { initDB, GTFDB, removeTask } from "./createIndexDB/indexDB";
// import { showTask } from "./showTask";

// async function isCompleted(e) {
//   const id = e.target.id;

//   if (id === "checkTask") {
//     let res = await initDB().then((res) => {
//       return GTFDB();
//     });
//     const id = +e.target.parentElement.parentElement.id;
    
//     let task = res.find((ta) => ta.id == id);
//     if (task && !task.isCompleted) {
//       task.isCompleted = true;
//       removeTask(res);
//       e.target.parentElement.parentElement.style.background = "#B9F8CF";
//       // showTask(conItem);
//     }else{
//       task.isCompleted = false;
//       removeTask(res);
//       e.target.parentElement.parentElement.style.background = "#FFFFFF";
//       // showTask(conItem);
//     }
 
//   }
// }






// export default isCompleted;

// // res.map(task=>{

// //   if (task.id===id&&!task.isCompleted) {
// //     e.target.parentElement.parentElement.style.background="#26fc63"

// //   }
// // })
import { initDB, GTFDB, updateTask } from "./createIndexDB/indexDB";
import { showTask } from "./showTask";

async function isCompleted(e) {
  const id = e.target.id;

  if (id === "checkTask") {
    let res = await initDB().then(() => GTFDB());

    const taskId = +e.target.parentElement.parentElement.id;
    let task = res.find((ta) => ta.id == taskId);

    if (task) {
      task.isCompleted = !task.isCompleted; // برعکس کن
      await updateTask(task);               // ✅ فقط همون تسک رو آپدیت کن

      e.target.parentElement.parentElement.style.background =
        task.isCompleted ? "#B9F8CF" : "#FFFFFF";
    }
  }
}

export default isCompleted;
