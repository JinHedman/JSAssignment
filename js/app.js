
const removeRef = document.getElementById('para1');
removeRef.remove();
const wrapperRef = document.getElementById('wrapperDiv');
const leftRef = document.getElementById('checkbox1');



const button = document.getElementById('button1');
button.addEventListener('click', () => {
  let ageIn = document.getElementById('age');
  let checkbox = leftRef.checked;
  let age = ageIn.value;
  if(age > 10){
    createPTag("Hej du är tillräckligt ung");
  }else{
    createPTag("Hej du är för liten");
  }
})

function createPTag(stringIn){
  let para1 = document.createElement("p");
  para1.innerText = stringIn;
  para1.classList.add("remove");
  wrapperRef.appendChild(para1);
}

const button2 = document.getElementById('button2');
button2.addEventListener('click', () => {
  let removeElements = document.getElementsByClassName("remove");
  [...removeElements].forEach(el => el.remove());
})
