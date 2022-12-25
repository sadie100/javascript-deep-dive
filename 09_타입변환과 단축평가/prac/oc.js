const target1 = "";
const target2 = null;

/* -------------------------------------------------------------------------- */
/*                                    단축 평가                                   */
/* -------------------------------------------------------------------------- */
const len1 = target1 && target1.length;
const len2 = target2 && target2.length;

console.log(len1); // 예상: 0, 실제: "" 🙅🏻‍♀️
console.log(len2); // null

/* -------------------------------------------------------------------------- */
/*                                   옵셔널 체이닝                                  */
/* -------------------------------------------------------------------------- */
const len3 = target1?.length;
const len4 = target2?.length;

console.log(len3); // 예상: 0, 실제: 0 🎉
console.log(len4); // undefined
