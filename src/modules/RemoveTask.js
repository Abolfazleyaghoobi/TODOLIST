import { GTFDB, initDB, removeTask } from "./createIndexDB/indexDB";
import { showTask } from "./showTask";

export async function RemoveModule(conItem) {
  let task = await initDB().then((res) => {
    return GTFDB();
  });

  conItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeTask")) {
      const taskItem = e.target.closest("li");

      const dataId = taskItem.getAttribute("data-id");

      task = task.filter((t) => t.id !== +dataId);
     removeTask(task)
     showTask(conItem)
    }
  });
}
