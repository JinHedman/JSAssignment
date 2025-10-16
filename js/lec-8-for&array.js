/*
for(let i = 1; i <= 1024 ; i*=2){
  console.log(i);
}

i*=2
i = i*2
for(let i = 10; i >= 0; --i){

  console.log(i);
}


function numPow(num1, num2){
  let sum = 1;
  for(let i = 1; i <= num2; ++i){
    sum = sum * num1;
  }
  return sum;
}
console.log(numPow(2, 24));


let listEx = [1,"Hello",2,3,5,8];
listEx[1] = 1;

for(let i = 0; i < listEx.length; i++){
  console.log(listEx[i]);
}

listEx.forEach(el => console.log(el));

      */

let randNumList = [];
const numMax = 10000;
for(let i = 0; i < numMax; i++){
  randNumList.push(Math.round(Math.random()*10));
}
// iterate through the numbers 0 to 10, which is represented by i
for(let i = 0; i <= 10; i++){
  // add a counter which will keep track of how many times a number has occured
  let sumRes = 0;
  // iterate through the list of 10000 random numbers
  for(let j = 0; j < randNumList.length; j++){
    // if the number we are on in the external for-loop (represented by i) is equal to the number of the element
    // on the internal for-loop (represented by randNumList[j]) is equal to each other we add 1 to sumRes
    if(i == randNumList[j]){
      ++sumRes;
    }
  }
  // before the end of the external for-loop we print how many times a number (i) has occured
  console.log(i + " has occured :" + sumRes);
}
// so for each number from 0 to 10 we will go through the array/list randNumList
// which will give us 10*10000 iterations in total, 10 from the external for-loop and 10000 from the internal for-loop


// Example how to do the same operation (count occurrences of a number in a more efficient way)
// didn't go through it during the lecture:
let randNumList = [];
const numMax = 10000;
for(let i = 0; i < numMax; i++){
  randNumList.push(Math.round(Math.random()*10));
}

let objNum = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};

for (let i = 0; i<numMax; i++){
  objNum[randNumList[i]] += 1;
}
console.log(objNum);
