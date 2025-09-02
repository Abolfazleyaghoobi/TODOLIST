import { initDB, GTFDB, removeTask } from "./createIndexDB/indexDB";

async function isCompleted(e) {
  const id = e.target.id;

  if (id === "checkTask") {
    let res = await initDB().then((res) => {
      return GTFDB();
    });
    const id = +e.target.parentElement.parentElement.id;
    
    let task = res.find((ta) => ta.id == id);
    if (task && !task.isCompleted) {
      task.isCompleted = true;
      removeTask(res);
      e.target.parentElement.parentElement.style.background = "#B9F8CF";
    }
 
  }
}
// feat: implement task completion functionality with checkbox and update task display






export default isCompleted;

// res.map(task=>{

//   if (task.id===id&&!task.isCompleted) {
//     e.target.parentElement.parentElement.style.background="#26fc63"

//   }
// })
