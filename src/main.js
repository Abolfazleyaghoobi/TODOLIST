import { initDB } from "./modules/createIndexDB/indexDB.js";
import { inpValidetion } from "./modules/inpValidetion.js";
import isCompleted from "./modules/isCompleted.js";
import { RemoveModule } from "./modules/RemoveTask.js";
import { showTask } from "./modules/showTask.js";
// *______________________________________________________________________________
const $ = document;
// select btn
//2 show modal add task
const SMAT = $.getElementById("addNewTask");
const modalTask = $.getElementById("modalTask");
const addTaskBTN = $.getElementById("addTask");
const cancelTaskBTN = $.getElementById("cancelTask");
// container item task
const conItem = $.getElementById("conItem");
const conItemChild = $.querySelectorAll("#conItem>li");

// conItem.insertAdjacentHTML("")
// select input
const titleINP = $.getElementById("title");
const descriptionINP = $.getElementById("description");
const hardNumberINP = $.getElementById("hardNumber");
const hourseINP = $.getElementById("hourseINP");
const minINP = $.getElementById("minINP");
const secINP = $.getElementById("secINP");

// DTW=> do you want
const DYW = $.getElementById("DYW");
// show more desc icon
const showMoreDesc = $.querySelector("#showDesc");
// show content desc
const contentDescTask = $.querySelector("#contentDescTask");
// check task
const checkTask = $.getElementById("checkTask");

// *______________________________________________________________________________
//@ Arrays input
const mainINP = [titleINP, descriptionINP, hardNumberINP];
const timerINP = [hourseINP, minINP, secINP];
//2 show modal add task
SMAT.addEventListener("click", () => {
  modalTask.classList.remove("hidden");
  modalTask.classList.add("flex");
});
// fun add hidden and remove flex
function hiddenFlex() {
  modalTask.classList.add("hidden");
  modalTask.classList.remove("flex");
  mainINP.forEach((v) => {
    v.value = "";
  });
  timerINP.forEach((v) => {
    v.disabled = true;
    v.value = "";
    v.style.border = "1px solid black";
  });
  isDYW = false;
  DYW.checked = false;
}
// DTW=> do you want
let isDYW = false;
DYW.addEventListener("input", () => {
  if (!isDYW) {
    timerINP.forEach((i) => {
      i.disabled = false;
      i.value = "00";
      i.style.border = "2px solid green";
    });
    isDYW = true;
  } else {
    timerINP.forEach((i) => {
      i.disabled = true;
      i.value = "";
      i.style.border = "1px solid black";
    });
    isDYW = false;
  }
  console.log("isDYW: ", isDYW);
});
//% add new tadk
addTaskBTN.addEventListener("click", () => {
  const isGo = inpValidetion(mainINP, timerINP, isDYW);
  if (isGo == "Timer") {
    const newValue = {
      title: titleINP.value,
      desc: descriptionINP.value,
      hard: +hardNumberINP.value,
      isCompleted: false,
      time: {
        hourse: hourseINP.value,
        min: minINP.value,
        sec: secINP.value,
      },
    };

    //@ sent data to dataBase
    initDB(newValue);
    //! black inputs
    mainINP.forEach((v) => {
      v.value = "";
    });
    timerINP.forEach((v) => {
      v.disabled = true;
      v.value = "";
      v.style.border = "1px solid black";
    });
    isDYW = false;
    DYW.checked = false;
    hiddenFlex();

    // ! ____________________________________________________
  } else if (isGo == "maim") {
    const newValue = {
      title: titleINP.value,
      desc: descriptionINP.value,
      hard: +hardNumberINP.value,
    };
    //@ sent data to dataBase
    initDB(newValue);
    // !blank inputs
    mainINP.forEach((v) => {
      v.value = "";
    });
    // !___________________________________________
    hiddenFlex();
  }
  showTask(conItem);
});
//~~ cansel btn
cancelTaskBTN.addEventListener("click", hiddenFlex);
// validation inputs
timerINP.forEach((i) => {
  i.addEventListener("input", () => {
    if (+i.value) {
      if ((i.id === "minINP" || i.id === "secINP") && i.value >= 59) {
        i.value = "59";
      }
    } else {
      i.value = "";
    }
  });
  i.addEventListener("focus", () => {
    i.select();
  });
});
// validation hardNumberINP
hardNumberINP.addEventListener("input", () => {
  if (+hardNumberINP.value) {
    if (hardNumberINP.value > 5) {
      hardNumberINP.value = "5";
    } else if (hardNumberINP.value == "0") {
      hardNumberINP.value = "1";
    }
  } else {
    hardNumberINP.value = "";
  }
});
hardNumberINP.addEventListener("focus", () => {
  hardNumberINP.select();
});
// init database
initDB();
// show task
showTask(conItem);
// colled removeModule
RemoveModule(conItem);
// && show more desc icon
conItem.addEventListener("click", (e) => {
  if (e.target.id === "showDesc") {
    const div = e.target.parentElement.parentElement;
    const p = div.nextElementSibling;

    // چرخش آیکن
    e.target.classList.toggle("rotate-180");

    // باز و بسته کردن توضیحات
    if (p.style.height && p.style.height !== "0px") {
      p.style.height = "0px";
    } else {
      p.style.height = p.scrollHeight + "px";
    }
  }
});
// 

// run func isCompleted
isCompleted(conItemChild, checkTask);
