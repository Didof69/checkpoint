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
// La fonction doit renvoyer un nouvel objet, basé sur celui passé en paramètre mais qui ne contient pas les
// clés/valeurs filtrées.
// Le filtrage se fait via un prédicat (fonction qui renvoie true ou false) passé en paramètre. La clé et la
// valeur sont fournies en tant que paramètres de ce prédicat.
function filterObject(object, predicat) {
  let newObject = {};
  for (const key in object) {
    console.log(predicat(key, object[key]));
    if (object.hasOwnProperty(key)) {
      if (predicat(key, object[key])) {
        newObject[key] = object[key];
      }
    }
    console.log(newObject);
  }
  return newObject;
}

console.log(
  filterObject(
    {
      foo: 1,
      bar: "hello",
      baz: true,
    },
    (key, value) => key === "foo" || value === "hello"
  )
);

assert.deepStrictEqual(
    filterObject(
        {
            foo: 1,
            bar: 'hello',
            baz: true
        },
        (key, value) => key === 'foo' || value === 'hello'
    ),
    {
        foo: 1,
        bar: 'hello'
    }
)
