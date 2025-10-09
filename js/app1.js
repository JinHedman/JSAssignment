let temp = document.getElementById('temp');
const buttonClick = document.getElementById('button');

buttonClick.addEventListener('click', (e) => {
  changeText();
})

function changeText() {
  temp.innerHTML = "HELLO CLASS";
}


const button = document.getElementById('buttonAdd');
let i = 0;
button.addEventListener('click', () => {
  const newParagraph = document.createElement('p');

  newParagraph.textContent = 'This is a new paragraph created with JavaScript!';

  newParagraph.id = 'newP'+i;
  newParagraph.classList.add('pClass');
  i++;
  document.body.appendChild(newParagraph);
});

const fruits = ["Apple", "Banana", "Cherry", "Mango"];
function createInContainer(){
  const container = document.getElementById('container');

  const ul = document.createElement('ul');

  fruits.forEach(fruit => {
    const li = document.createElement('li');
    li.textContent = fruit;

    ul.appendChild(li);
  });

  container.appendChild(ul);
}
createInContainer()
