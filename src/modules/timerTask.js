// import { initDB, GTFDB, updateTask } from "./createIndexDB/indexDB";
// import { showTask } from "./showTask";

// async function timerTask(e, conItem) {
//   const res = await initDB().then(() => GTFDB());
//   const id = +e.target.parentElement.parentElement.parentElement.parentElement.id;

//   const tagB = e.target.previousElementSibling?.firstElementChild;
//   if (!tagB) {
//     console.log("tagB پیدا نشد");
//     return;
//   }

//   const task = res.find((t) => t.id === id);
//   if (!task || !task.time) {
//     alert("این تسک تایمر نداره");
//     return;
//   }

//   // نمایش اولیه
//   tagB.textContent = `${task.time.hourse} : ${task.time.min} : ${task.time.sec}`;

//   // شروع تایمر
//   let timer = setInterval(async () => {
//     if (task.time.sec > 0) {
//       task.time.sec--;
//     } else if (task.time.min > 0) {
//       task.time.min--;
//       task.time.sec = 59;
//     } else if (task.time.hourse > 0) {
//       task.time.hourse--;
//       task.time.min = 59;
//       task.time.sec = 59;
//     }else {
//       clearInterval(timer);
//       console.log("زمان تموم شد");
    
//       task.isExpired = true;
//       task.isCompleted = true;   // ✅ تیک چک‌باکس رو هم فعال کن
//       await updateTask(task);
//       showTask(conItem);
//       return;
//     }
  
//     // 👇 فقط وقتی هنوز تایمر ادامه داره آپدیت کن
//     tagB.textContent = `${task.time.hourse} : ${task.time.min} : ${task.time.sec}`;
//     await updateTask(task);
//     showTask(conItem);
//   }, 1000);
  
// }

// export default timerTask;
import { initDB, GTFDB, updateTask } from "./createIndexDB/indexDB";
import { showTask } from "./showTask";

// برای نگه‌داشتن تایمرها (هر تسک ID خودش رو داره)
const timers = new Map();

async function timerTask(e, conItem) {
  const res = await initDB().then(() => GTFDB());
  const id = +e.target.parentElement.parentElement.parentElement.parentElement.id;
  const tagB = e.target.previousElementSibling?.firstElementChild;

  if (!tagB) {
    console.log("tagB پیدا نشد");
    return;
  }

  const task = res.find((t) => t.id === id);
  if (!task || !task.time) {
    alert("این تسک تایمر نداره");
    return;
  }

  // اگه تایمر در حال اجرا باشه → متوقفش کن
  if (timers.has(id)) {
    clearInterval(timers.get(id));
    timers.delete(id);
    console.log(`⏸️ تایمر ${id} متوقف شد`);
    return;
  }

  // نمایش اولیه
  tagB.textContent = `${task.time.hourse} : ${task.time.min} : ${task.time.sec}`;

  // شروع تایمر
  const timer = setInterval(async () => {
    if (task.time.sec > 0) {
      task.time.sec--;
    } else if (task.time.min > 0) {
      task.time.min--;
      task.time.sec = 59;
    } else if (task.time.hourse > 0) {
      task.time.hourse--;
      task.time.min = 59;
      task.time.sec = 59;
    } else {
      clearInterval(timer);
      timers.delete(id);
      task.isExpired = true;
      task.isCompleted = true;
      await updateTask(task);
      showTask(conItem);
      return;
    }

    tagB.textContent = `${task.time.hourse} : ${task.time.min} : ${task.time.sec}`;
    await updateTask(task);
    showTask(conItem);
  }, 1000);

  timers.set(id, timer);
  console.log(`▶️ تایمر ${id} شروع شد`);
}

export default timerTask;
