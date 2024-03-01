import assert from "assert";

//Exercice 1

function sayHi() {}

function categorize(values) {
  let object = {};
  values.forEach((element) => {
    let key = typeof element;
    if (object[key]) {
      let array = object[key];
      array.push(element);
      object[key] = array;
    } else {
      object[key] = [element];
    }
  });
  return object;
}

categorize([1, "hello", sayHi, "world", true, 0n, 1000]);

assert.deepStrictEqual(
  categorize([1, "hello", sayHi, "world", true, 0n, 1000]),
  {
    number: [1, 1000],
    string: ["hello", "world"],
    function: [sayHi],
    boolean: [true],
    bigint: [0n],
  }
);

//Exercice 2

Array.prototype.dedup = function () {
  let newArray = [];
  let newArrayIncludes = [];

  for (let i = 0; i < this.length; i++) {
    //avec le includes()
    if (i === 0) {
      newArrayIncludes.push(this[i]);
    } else {
      if (!newArrayIncludes.includes(this[i])) {
        newArrayIncludes.push(this[i]);
      }
    }

    //avec le ===
    if (newArray.indexOf(this[i]) === -1) {
      newArray.push(this[i]);
    }
  }
  // console.log(newArray);
  // console.log(newArrayIncludes);
  return newArray;
};

assert.deepStrictEqual(
  [1, 1, 6, 2, 3, 2, 2, 4, 6, 6, 1].dedup(),
  [1, 6, 2, 3, 4]
);

//Exercice 3


