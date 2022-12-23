function say_hello() {
    var varInFunction = "hello";
    console.log(varInFunction); // hello
}

for (let i = 0; i < 2; i++) {
    var varInFor = "가";
    let letInFor = "나";
    const constInFor = "다";

    console.log(varInFor + letInFor + constInFor);
}

/* ReferenceError: a is not defined */
// console.log(varInFunction);

console.log(varInFor); // 가
/* ReferenceError: letInFor is not defined */
// console.log(letInFor);
/* ReferenceError: constInFor is not defined */
// console.log(constInFor);

/* -------------------------------------------------------------------------- */
/*                                   변수 호이스팅                                  */
/* -------------------------------------------------------------------------- */

/* ReferenceError: Cannot access 'testA' before initialization */
console.log(testA);
let testA = "test";

/* ReferenceError: Cannot access 'testB' before initialization */
console.log(testB);
let testB = "test";
