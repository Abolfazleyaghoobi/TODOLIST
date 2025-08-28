import { initDB, GTFDB } from "./createIndexDB/indexDB";

async function isCompleted(conItemChild,checkTask) {
  let res = await initDB().then((res) => {
    return GTFDB();
  });

  // check task handler
  checkTask.addEventListener("input", () => {
    conItemChild.style.background="#9aff83"
  });
}

export default isCompleted;
