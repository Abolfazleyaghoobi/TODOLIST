import { inpValidetion } from "./modules/inpValidetion.js";

const $ = document;
// select btn
//2 show modal add task
const SMAT = $.getElementById("addNewTask");
const modalTask = $.getElementById("modalTask");
const addTaskBTN = $.getElementById("addTask");
const cancelTaskBTN = $.getElementById("cancelTask");
// select input
const titleINP = $.getElementById("title");
const descriptionINP = $.getElementById("description");
const hardNumberINP = $.getElementById("hardNumber");
const hourseINP = $.getElementById("hourseINP");
const minINP = $.getElementById("minINP");
const secINP = $.getElementById("secINP");
// DTW=> do you want
const DYW = $.getElementById("DYW");
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
}
// DTW=> do you want
let isDYW = false;
DYW.addEventListener("input", () => {
  if (!isDYW) {
    timerINP.forEach((value) => {
      value.disabled = false;
      value.value="00"
      value.style.border = "2px solid green";
    });
    isDYW = true;
    
  } else {
    timerINP.forEach((value) => {
      value.disabled = true;
      value.value = "";
      value.style.border = "1px solid black";
    });
    isDYW = false;
  }
  console.log("isDYW: ", isDYW);
});
// add new tadk
addTaskBTN.addEventListener("click", () => {
  const isGo=inpValidetion(mainINP, timerINP, isDYW);
  if (isGo) {
    hiddenFlex();
  }
});
cancelTaskBTN.addEventListener("click", hiddenFlex);
timerINP.forEach((i)=>{
  i.addEventListener("input",()=>{
      if((i.id==="minINP"||i.id==="secINP")&&i.value>=59){
      i.value="59"
      
      
      }
     
  })
  i.addEventListener("focus", () => {
    i.select();
  });
})
hardNumberINP.addEventListener("input",()=>{
  if(hardNumberINP.value>5){
      hardNumberINP.value="5"
  }else if(hardNumberINP.value=="0"){
    hardNumberINP.value="1"
  }

})
hardNumberINP.addEventListener("focus",()=>{
  hardNumberINP.select();
})