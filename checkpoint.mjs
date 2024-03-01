import assert from "assert";
import { log } from "console";

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

function filterObject(object, predicat) {
  let newObject = {};
  for (const key in object) {
    // console.log(predicat(key, object[key]));
    if (object.hasOwnProperty(key)) {
      if (predicat(key, object[key])) {
        newObject[key] = object[key];
      }
    }
    // console.log(newObject);
  }
  return newObject;
}

assert.deepStrictEqual(
  filterObject(
    {
      foo: 1,
      bar: "hello",
      baz: true,
    },
    (key, value) => key === "foo" || value === "hello"
  ),
  {
    foo: 1,
    bar: "hello",
  }
);

//Exercice 4

// ne pas toucher
const asyncJob = (n) =>
  Math.random() > 0.5 ? Promise.resolve(n + 1) : Promise.reject(Error("boom"));
// a transformer
asyncJob(0)
  .then((i) => asyncJob(i))
  .then((i) => Promise.all([asyncJob(i), asyncJob(i), asyncJob(i)]))
  .then(([x, y, z]) => asyncJob(x + y + z))
  .then((total) => console.log(total))
  .catch((err) => console.error(`gestion erreur globale: ${err.message}`));

  asyncJob(0)
    .then(async (i) => {
      i = await asyncJob(i);
      const results = await Promise.all([
        asyncJob(i),
        asyncJob(i),
        asyncJob(i),
      ]);
      const total = await asyncJob(results[0] + results[1] + results[2]);
      console.log(total);
    })
    .catch((err) => console.error(`gestion erreur globale: ${err.message}`));
