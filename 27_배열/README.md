참고:
[27장 예제코드](https://github.com/wikibook/mjs/blob/master/27.md).
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

---

27.9 ~ 27.9.5 by 정병휘 (ByeonghwiJeong)

## 27.9 배열 고차 함수

- 고차 함수 : 함수를 인수로 전달받거나 함수를 반환하는 함수
  - 함수는 일급객체라 값처럼 전달 가능
- 함수형 프로그래밍
  - 순수 함수와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태변경을 피하려는 프로그래밍 패러다임
  - **외부상태**를 갖지 않는 함수들의 연속으로 프로그래밍을 하는 패러다임
  - `외부상태`를 갖지 않는다는 의미
    - 같은 입력을 넣었을 때 언제나 같은 출력을 내보낸다.
    - 즉, 함수의 입/출력 영향을 주는 외부 요인이 없습니다.
  - `불변성` : 함수형 프로그랭 코드에서는 한 번 초기화 한변수는 변하지 않습니다.
    - 안정성을 얻을 수 있음

```js
c = 1

def func(a: int, b: int) -> int:
    return a + b + c  # c 라는 외부 값, 상태가 포함되어 있기에 함수형이 아닙니다.
```

- **순수함수** : 부수 효과 최대한 억제

```js
def func(a: int, b: int, c: int) -> int:
    return a + b + c  # 주어진 파라미터만 사용합니다. 별도의 상태가 없습니다.
```

### 27.9.1 `Array.prototype.sort`

- `sort 메서드` : 원본 배열을 직접 변경
- **오름차순 `default`**

```javascript
const fruits = ["Banana", "Orange", "Apple"];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']
```

- **내림차순 `reverse 메소드`**

```javascript
const fruits = ["Banana", "Orange", "Apple"];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메서드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']

// 내림차순(descending) 정렬
fruits.reverse();

// reverse 메서드도 원본 배열을 직접 변경한다.
console.log(fruits); // ['Orange', 'Banana', 'Apple']
```

- **< 숫자 요소 정렬시 주의 >**
  - 유니코드 포인트의 순서를 기준
  - 숫자 요소 정렬 : `sort메서드`정렬 순서를 정의하는 비교함수를 인수로 전달
    - 비교함수는 양수, 음수, 0반환
    - 반환값이 0보다 작으면 첫번째 인수 우선 정렬

```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]
```

```javascript
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소/최대값 취득
console.log(points[0], points[points.length]); // 1

// 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```

- **< 객체 요소 정렬 >**

```javascript
const todos = [
  { id: 4, content: "JavaScript" },
  { id: 1, content: "HTML" },
  { id: 2, content: "CSS" },
];

// 비교 함수. 매개변수 key는 프로퍼티 키다.
function compare(key) {
  // 프로퍼티 값이 문자열인 경우 - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
  // 비교 함수는 양수/음수/0을 반환하면 되므로 - 산술 연산 대신 비교 연산을 사용할 수 있다.
  return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
}

// id를 기준으로 오름차순 정렬
todos.sort(compare("id"));
console.log(todos);
/*
[
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
]
*/

// content를 기준으로 오름차순 정렬
todos.sort(compare("content"));
console.log(todos);
/*
[
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
]
*/
```

### 27.9.2 `Array.prototype.forEach`

- 함수형프로그래밍 관점에서 for문은 반복을 위한 변수를 선언해야하므로 조건에 부합하지않는다.
- `forEach 메서드`: for문을 대체할 수 있는 고차함수
  - 배열을 순회하면서 수행 할 처리를 콜백 함수로 전달받아 반복 호출
  - `this` : 호출한 배열
  - forEach메서드는 3개인수(요소값, 인덱스, this)의 인수를 전달

```javascript
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 배열 순회
for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]
```

```javascript
const numbers = [1, 2, 3];
let pows = [];

// forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
numbers.forEach((item) => pows.push(item ** 2));
console.log(pows); // [1, 4, 9]
```

```javascript
// forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].forEach((item, index, arr) => {
  console.log(
    `요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/
```

```javascript
const numbers = [1, 2, 3];

// forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
// 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
// 따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
numbers.forEach((item, index, arr) => {
  arr[index] = item ** 2;
});
console.log(numbers); // [1, 4, 9]
```

- forEach메서드의 반환값은 언제나 undefined

```javascript
const result = [1, 2, 3].forEach(console.log);
console.log(result); // undefined
```

- forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용한 객체를 전달할 수 있다.
  - forEach메서드의 콜백함수는 일반함수로 호출되므로 콜백 함수 내부의 this는 undefined를 가르킨다. this가 전역 객체가 아닌 undefined를 가리키는 이유는 클래스 내부의 모든코드에는 암묵적으로 strict mode가 적용되기 대문이다.
  - 콜백 함수 내부의 this와 multiply 메서드 내부의 this를 일치시키려면 forEach 메서드의 두 번째 인수로 forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달한다.
  - 화살표 함수를 사용하면 mulitply 메서드 내부의 this를 그대로 참조
    - 화살표 함수는 함수 자체의 this바인딩을 갖지않아서, 상위 스코프를 참조

```javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      // TypeError: Cannot read property 'numberArray' of undefined
      this.numberArray.push(item * item);
    });
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
```

```javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      this.numberArray.push(item * item);
    }, this); // forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

- forEach메서드의 동작을 이해하기 위해 forEach메서드의 폴리필을 살펴보자
  - `폴리필` : 최신사양 기능을 지원하지않는 부라우저를 위해 누락된 최신기능 구현하여 추가
- `break` `continue` 사용불가
- 희소 배열의 경우 존재하지않는 요소는 순회 대상에서 제외 - `map` `filter` `reduce`

```javascript
// 만약 Array.prototype에 forEach 메서드가 존재하지 않으면 폴리필을 추가한다.
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    // 첫 번째 인수가 함수가 아니면 TypeError를 발생시킨다.
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // this로 사용할 두 번째 인수를 전달받지 못하면 전역 객체를 this로 사용한다.
    thisArg = thisArg || window;

    // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
    for (var i = 0; i < this.length; i++) {
      // call 메서드를 통해 thisArg를 전달하면서 콜백 함수를 호출한다.
      // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
      callback.call(thisArg, this[i], i, this);
    }
  };
}
```

```javascript
[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) break; // SyntaxError: Illegal break statement
});

[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) continue;
  // SyntaxError: Illegal continue statement: no surrounding iteration statement
});
```

```javascript
// 희소 배열
const arr = [1, , 3];

// for 문으로 희소 배열을 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, undefined, 3
}

// forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
arr.forEach((v) => console.log(v)); // 1, 3
```

- 성능이 for문에 비해 좋지 않지만 가독성이 좋아서 대단히 많은 배열을 순회하거나 시간이 많이 걸리는 복잡한 코드 또는 높은 성능이 필요한 경우가 아니라면 for문 대신 forEach를 사용하자

### 27.9.3 `Array.prototype.map`

- `map 메서드` : 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다. 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다. 이때 원본 배열은 변경되지 않는다.

```javascript
const numbers = [1, 4, 9];

// map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
const roots = numbers.map((item) => Math.sqrt(item));

// 위 코드는 다음과 같다.
// const roots = numbers.map(Math.sqrt);

// map 메서드는 새로운 배열을 반환한다
console.log(roots); // [ 1, 2, 3 ]
// map 메서드는 원본 배열을 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]
```

- **forEach & map 공통점**
  - 자신이 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복 호출한다는 것
- **forEach & map 차이점**
  - `forEach` : undefined 반환
    - 단순히 반복문을 대체하기 위한 고차함수
  - `map` : 콜백 함수의 반환값들로 구성된 새로운 배열을 반환
    - 요소값을 다른 값으로 메핑한 새로운 배열을 생성하기 위한 고차 함수다.
- map메서드애서 반환하는 새로운 배열의 **length 프로퍼티 값**은 메서드를 호출한 배열의 **length 프로퍼티 값**과 반드시 일치한다.
- map메서드는 3개인수(요소값, 인덱스, this)의 인수를 전달

```javascript
// map 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].map((item, index, arr) => {
  console.log(
    `요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
  return item;
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/
```

- map메서드의 두 번째 인수로 map메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다.

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function (item) {
      // 외부에서 this를 전달하지 않으면 this는 undefined를 가리킨다.
      return this.prefix + item;
    }, this); // map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
// ['-webkit-transition', '-webkit-user-select']
```

- 화살표 함수 사용 ( 상위 스코프 this )

```javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
// ['-webkit-transition', '-webkit-user-select']
```

## 29.9.4 `Array.prototype.filter`

- 자신이 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출
  > **콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열 반환**
- 원본 배열 변경 X

```javascript
const numbers = [1, 2, 3, 4, 5];

// filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
// 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
// 다음의 경우 numbers 배열에서 홀수인 요소만을 필터링한다(1은 true로 평가된다).
const odds = numbers.filter((item) => item % 2);
console.log(odds); // [1, 3, 5]
```

- filter메서드는 콜백함수 반환값이 true인 요소만 추출한 새로운 배열을 반환
- filter메서드는 3개인수(요소값, 인덱스, this)의 인수를 전달

```javascript
// filter 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].filter((item, index, arr) => {
  console.log(
    `요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
  return item % 2;
});
/*
요소값: 1, 인덱스: 0, this: [1,2,3]
요소값: 2, 인덱스: 1, this: [1,2,3]
요소값: 3, 인덱스: 2, this: [1,2,3]
*/
```

- filter메서드의 두 번째 인수로 filter메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
- 화살표 함수가 더 좋은 방법ㅇ
- filter 메서드는 자신을 호출한 배열에서 특정요소를 제거하기 위해 사용할 수 있음

```javascript
class Users {
  constructor() {
    this.users = [
      { id: 1, name: "Lee" },
      { id: 2, name: "Kim" },
    ];
  }

  // 요소 추출
  findById(id) {
    // id가 일치하는 사용자만 반환한다.
    return this.users.filter((user) => user.id === id);
  }

  // 요소 제거
  remove(id) {
    // id가 일치하지 않는 사용자를 제거한다.
    this.users = this.users.filter((user) => user.id !== id);
  }
}

const users = new Users();

let user = users.findById(1);
console.log(user); // [{ id: 1, name: 'Lee' }]

// id가 1인 사용자를 제거한다.
users.remove(1);

user = users.findById(1);
console.log(user); // []
```

- filter 메서드 사용하여 중복요소 제거시 그 요소가 여러개있다면 모두 제거됨
- 하나만 제거하려면 indexOf메서드를 통해 특정 요소의 인덱스를 취득한다음 splice 메서드 사용

### 27.9.5 `Array.prototype.reduce`

- 자신이 호출한 배열의 모든 요소를 순회하며 인수로 전달 받은 콜백함수를 반복 호출
- 콜백 함수의 반환값을 다음 순회시에 콜백함수의 첫 번째 인수로 전달하면서 콜백함수 호출
- 하나의 결과값을 만들어 반환
- 원본 배열 변경X
- **reduce 메서드의 인수**
  - 첫번째: 콜백함수, 두번째: 초기값
- **reduce 메서드의 콜백함수: 4개 인수**
  - 1. 초기값 또는 콜백 함수의 이전 반환값
  - 2. reduce메서드를 호출한 배열의 요소값
  - 3. reduce메서드를 호출한 배열의 인덱스
  - 4. reduce메서드를 호출한 배열 자체(this)
- 예제) reduce 메서드는 2개의 인수, 즉 콜백 함수와 초기값 0을 전달받아 자신을 호출한 배열의 모든 요소를 누적한 결과를 반환

```javascript
// [1, 2, 3, 4]의 모든 요소의 누적을 구한다.
const sum = [1, 2, 3, 4].reduce(
  (accumulator, currentValue, index, array) => accumulator + currentValue,
  0
);

console.log(sum); // 10
```

### 평균 구하기

```javascript
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
  // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환한다.
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 3.5
```

### 최대값 구하기

```javascript
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max); // 5
```

- Math.max 추천

```javascript
const values = [1, 2, 3, 4, 5];

const max = Math.max(...values);
// var max = Math.max.apply(null, values);
console.log(max); // 5
```

### 요소의 중복 횟수 구하기

```javascript
const fruits = ["banana", "apple", "orange", "orange", "apple"];

const count = fruits.reduce((acc, cur) => {
  // 첫 번째 순회 시 acc는 초기값인 {}이고 cur은 첫 번째 요소인 'banana'다.
  // 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로
  // 할당한다. 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화한다.
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

// 콜백 함수는 총 5번 호출되고 다음과 같이 결과값을 반환한다.
/*
{banana: 1} => {banana: 1, apple: 1} => {banana: 1, apple: 1, orange: 1}
=> {banana: 1, apple: 1, orange: 2} => {banana: 1, apple: 2, orange: 2}
*/

console.log(count); // { banana: 1, apple: 2, orange: 2 }
```

### 중첩 매열 평탄화

```javascript
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
// [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

- flat메서드 가 더 직관적

```javascript
[1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]

// 인수 2는 중첩 배열을 평탄화하기 위한 깊이 값이다.
[1, [2, 3, [4, 5]]].flat(2); // -> [1, 2, 3, 4, 5]
```

### 중복요소제거

```javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce(
  (unique, val, i, _values) =>
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다.
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 다르다면 val은 중복된 요소다.
    // 처음 순회하는 요소만 초기값 []가 전달된 unique 배열에 담아 반환하면 중복된 요소는 제거된다.
    _values.indexOf(val) === i ? [...unique, val] : unique,
  []
);

console.log(result); // [1, 2, 3, 5, 4]
```

- filter가 더 직관적

```javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다. 이 요소만 필터링한다.
const result = values.filter((val, i, _values) => _values.indexOf(val) === i);
console.log(result); // [1, 2, 3, 5, 4]
```

- Set도 사용가능

```javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 중복을 허용하지 않는 Set 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다.
const result = [...new Set(values)];
console.log(result); // [1, 2, 3, 5, 4]
```

- reduce 메서드의 두번째 인수 생략 가능

```javascript
// reduce 메서드의 두 번째 인수, 즉 초기값을 생략했다.
const sum = [1, 2, 3, 4].reduce((acc, cur) => acc + cur);
console.log(sum); // 10
```

- 두번째 인수 생략시 빈배열이면 에러 발생
- 언제나 초기값은 전달하는 것이 안전하다

```javascript
const sum = [].reduce((acc, cur) => acc + cur);
// TypeError: Reduce of empty array with no initial value
```

```javascript
const sum = [].reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 0
```

- reduce 메서드로 객체의 특정 프로퍼티 값을 합산

```javascript
const products = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
  { id: 3, price: 300 },
];

// 1번째 순회 시 acc는 { id: 1, price: 100 }, cur은 { id: 2, price: 200 }이고
// 2번째 순회 시 acc는 300, cur은 { id: 3, price: 300 }이다.
// 2번째 순회 시 acc에 함수에 객체가 아닌 숫자값이 전달된다. 이때 acc.price는 undefined다.
const priceSum = products.reduce((acc, cur) => acc.price + cur.price);

console.log(priceSum); // NaN
```

```javascript
const products = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
  { id: 3, price: 300 },
];

/*
1번째 순회 : acc => 0,   cur => { id: 1, price: 100 }
2번째 순회 : acc => 100, cur => { id: 2, price: 200 }
3번째 순회 : acc => 300, cur => { id: 3, price: 300 }
*/
const priceSum = products.reduce((acc, cur) => acc + cur.price, 0);

console.log(priceSum); // 600
```

---

27.9.6 ~ 27장 끝 by 이은민 (gcount85)

### 27.9.6 `Array.prototype.some`

- 자신을 호출한 배열의 요소를 순회하면서 **인수로 전달된 콜백 함수**를 호출
- 인수로 전달된 콜백 함수는, 배열의 요소값, 인덱스, 배열 자체 즉 `this`를 순차적으로 전달받을 수 있음
- 반환값
  - 콜백 함수의 반환값이 **단 한번이라도** 참이면 `true`
  - 콜백 함수의 반환값이 **모두 거짓이라면** `false`
  - 단, 호출한 배열이 **빈 배열인 경우** 언제나 `false`

```js
// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some((item) => item > 10); // -> true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some((item) => item < 0); // -> false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
["apple", "banana", "mango"].some((item) => item === "banana"); // -> true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some((item) => item > 3); // -> false
```

### 27.9.7 `Array.prototype.every`

- 자신을 호출한 배열의 요소를 순회하면서 **인수로 전달된 콜백 함수**를 호출
- 인수로 전달된 콜백 함수는, 배열의 요소값, 인덱스, 배열 자체 즉 `this`를 순차적으로 전달받을 수 있음
- 반환값
  - 콜백 함수의 반환값이 **모두 참이면** `true`
  - 콜백 함수의 반환값이 **단 한번이라도** 거짓이면 `false`
  - 단, 호출한 배열이 **빈 배열인 경우** 언제나 `true`

```js
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every((item) => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every((item) => item > 10); // -> false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every((item) => item > 3); // -> true
```

### 27.9.8 `Array.prototype.find`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출
- 인수로 전달된 콜백 함수는, 배열의 요소값, 인덱스, 배열 자체 즉 `this`를 순차적으로 전달받을 수 있음
- 콜백 함수의 반환값이 `true`인 요소만 추출한 **배열**을 반환하는 `filter` 메서드와 다름
- 두 번째 인수로 `find` 메서드의 콜백 함수 내부에서 `this`로 사용할 객체를 전달할 수 있으나, 화살표 함수를 사용하는 것이 나음
- 반환값
  - 콜백 함수의 반환값이 `true`인 **첫 번째 요소** 반환
  - 그런 요소가 존재하지 않는다면, `undefined` 반환

```js
const users = [
  { id: 1, name: "Lee" },
  { id: 2, name: "Kim" },
  { id: 2, name: "Choi" },
  { id: 3, name: "Park" },
];

// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find((user) => user.id === 2); // -> {id: 2, name: 'Kim'}

// `filter` 메서드와의 차이점
// Array#filter는 배열을 반환한다.
[1, 2, 2, 3].filter((item) => item === 2); // -> [2, 2]

// Array#find는 요소를 반환한다.
[1, 2, 2, 3].find((item) => item === 2); // -> 2
```

### 27.9.9 `Array.prototype.findIndex`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출
- 인수로 전달된 콜백 함수는, 배열의 요소값, 인덱스, 배열 자체 즉 `this`를 순차적으로 전달받을 수 있음
- 두 번째 인수로 `find` 메서드의 콜백 함수 내부에서 `this`로 사용할 객체를 전달할 수 있으나, 화살표 함수를 사용하는 것이 나음
- 반환값
  - 콜백 함수의 반환값이 `true`인 **첫 번째 요소의 인덱스** 반환
  - 그런 요소가 존재하지 않는다면, `-1` 반환

```js
const users = [
  { id: 1, name: "Lee" },
  { id: 2, name: "Kim" },
  { id: 2, name: "Choi" },
  { id: 3, name: "Park" },
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex((user) => user.id === 2); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex((user) => user.name === "Park"); // -> 3

// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return (item) => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate("id", 2)); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate("name", "Park")); // -> 3
```

### 27.9.10 `Array.prototype.flatMap`

- `map` 메서드를 통해 생성된 새로운 배열을 flat하게 만듦 → 즉 `map` + `flat` 메서드를 순차적으로 실행하는 효과
- 단, `flat` 메서드처럼 인수를 전달하여 flat의 깊이 지정 X, 1단계만 평탄화 → 중첩 배열의 평탄화 깊이를 지정하려면 `map` + `flat`

```js
const arr = ["hello", "world"];

// map과 flat을 순차적으로 실행
arr.map((x) => x.split("")).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap((x) => x.split(""));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```
