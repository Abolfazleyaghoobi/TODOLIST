import { GTFDB, initDB, removeTask } from "./createIndexDB/indexDB";
import { showTask } from "./showTask";

export async function RemoveModule(conItem) {
  let task = await initDB().then((res) => {
    return GTFDB();
  });

  conItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeTask")) {
      const taskItem = e.target.closest("li");

      const id = taskItem.id

      task = task.filter((t) => t.id !== +id);
     removeTask(task)
     showTask(conItem)

    }
    console.log(e.target);
    
  });
}
