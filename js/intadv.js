const age = document.getElementById("ageIn");
const right = document.getElementById("rightIn");
const left = document.getElementById("leftIn");
const button = document.getElementById("startAdv");
let result = document.getElementById("result")


button.addEventListener("click", ()=>{
  let tempInt = Number(age.value);
  let rightCh = document.getElementById("rightChecked").checked;
  let leftCh = document.getElementById("leftChecked").checked;

  if(tempInt >= 18){
    let remove = document.getElementsByClassName('pClass');
    [...remove].forEach(el => el.remove());
    createP("You are " + tempInt + " years old, and prepare yourself for an adventure");
    rightLeft(right, left, rightCh, leftCh);
  }else{
    createP("You are too young");

  }
})

function rightLeft(right, left, rCh, lCh){
  let tempR = right.value;
  let tempL = left.value;
  if(rCh && lCh){
    createP("You are equipped with " + tempR + " in your right hand, and " + tempL + " in your left hand.");
  }else if(rCh){
    createP("You are equipped with " + tempR + " in your right hand.");
  }else if(lCh){
    createP("You are equipped with " + lCh + " in your left hand.");
  }else{
    createP("You're unarmed, yikees")
  }
}
function createP(string){
  let tempChild = document.createElement("p");
  tempChild.textContent = string;
  tempChild.classList.add('pClass');
  result.appendChild(tempChild);
}
function checkAge(age){
  return age >= 18;
}
