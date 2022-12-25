const me = null;

// const myName = me.name;

// /* TypeError: Cannot read properties of null (reading 'name') */
// console.log(myName);


const myName = me && me.name;

console.log(myName); // null

function getStringLength(str) {
    console.log(str.length);
}

getStringLength("test"); // 4
/* TypeError: Cannot read properties of undefined (reading 'length') */
// getStringLength();

function getStringLength2(str) {
    const _str = str || "";
    console.log(_str.length);
}

getStringLength2(); // 0