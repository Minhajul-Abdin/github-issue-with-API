## 1️⃣ What is the difference between var, let, and const?

--->

- **var** is function scoped and global scoped.
- **let** and **const** is blocked scoped
  **var** ,**let** ,**const** are Hoisted but var initializes as undifined which creates undetectable bugs
  where let and const is in **TDZ (temporal dead zone)** so we can understand where the error is coming from

## 2️⃣ What is the spread operator (...)?

--->
**spread operator (...)** spreads elements of an object or array into individual element

## 3️⃣ What is the difference between map(), filter(), and forEach()?

--->

- **map()** creates a new array for a given element for the given function
- **filter()** uses the given condition to match from the orignal array and returns a new array
- **forEach()** is kind of a loop which implements a given function for every element of an array

## 4️⃣ What is an arrow function?

--->
**Arrow function** uses variable like structure to create function and parameters

_`const sum = (a, b) => (parameter) => {function};`_

## 5️⃣ What are template literals?

--->
Using a **backtic (``)** to create string with variables and multi-line formating

_`let name = "Minhaj";`_\
_`console.log(`My name is ${name}`)`_
