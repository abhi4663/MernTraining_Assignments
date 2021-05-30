let arr = [1,2,3,4];

Array.prototype.ownMap = function(callback) {
  let mappedArr = [];
  for(let i=0; i < this.length; i++) {
    mappedArr.push(callback(this[i], i)) // we defined i as second argument
  }
  return mappedArr;
}

let newArr = arr.ownMap(function(element, index) {
  return element + index;
});

console.log('arr: ', arr);
// not mutated and returns [1, 2, 3, 4]
console.log('newArr: ', newArr);
// returns [1, 3, 5, 7]