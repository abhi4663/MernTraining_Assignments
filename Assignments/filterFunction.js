//Array.protoype.
//(Otherwise js interpreter will print the TyperError which tells us that mfilter is not a function because it cannot be found in Array.prototype)
//We are sending the function to Array.prototype.mfilter
// and we must receive that function as a parameter.
Array.prototype.mfilter = function (fun) {
  var filtered = []; //blank array for result
  for (let i = 0; i < this.length; i++) {
    if (fun(this[i], i, this)) filtered.push(this[i]);
  }
  return filtered;
};

var returnedArr = [1, 2, 3, 4, 5, 6].mfilter(function (element, index, arr) {
  return element < 5; //return elements >5
});

console.log(returnedArr);
