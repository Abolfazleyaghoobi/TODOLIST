import { alertSuccessFully, alertWarning } from "./alert.js";

export function inpValidetion(mainINP, timerINP, isDYW) {
  let mainNINP = mainINP.filter((inp) => !inp.value.trim()).length;
  console.log("mainNINP: ", mainNINP);
  // input not value
  let timerCount = 0;
  if (isDYW) {
    timerINP.forEach((inp) => {
      if (inp.value == "00") {
        timerCount++;
      }
    });
    console.log("timerCount: ", timerCount);
  }
  // regex
  const regex = /^3$/;
  // result regex number
  const RRNinput = regex.test(timerCount);
// if all input blank
  if (
    mainNINP === mainINP.length &&
    (!isDYW || (isDYW && timerCount === timerINP.length))
  ) {
    alertWarning("The main inputs still remain.");
    return false;

  } else if (mainNINP > 0) {
    // if were main inputs blank
    alertWarning("Some of the main inputs remain.");
    return false;

  } else if (isDYW && RRNinput) {
    // if were timer inputs blank
    alertWarning("Fill at least one of the timer inputs.");
    return false;
  } else {
    // if were both inputs[main input,,,,,timer input] not blank
    if (isDYW && !RRNinput) {
      alertSuccessFully();
      mainINP.forEach((v)=>{
        v.value=""
      })
      timerINP.forEach((v)=>{
        v.value=""
      })
    return true;

    } else {
      // if just were main inputs not blank
      alertSuccessFully();
      mainINP.forEach((v)=>{
        v.value=""
      })
    return true;

    }
  }
}

