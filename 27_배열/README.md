
참고: 
[27장 예제코드](https://github.com/wikibook/mjs/blob/master/27.md).
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020. 

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
[5, 10, 15].some(item => item > 10); // -> true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
[5, 10, 15].some(item => item < 0); // -> false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
['apple', 'banana', 'mango'].some(item => item === 'banana'); // -> true

// some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
[].some(item => item > 3); // -> false
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
[5, 10, 15].every(item => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // -> false

// every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
[].every(item => item > 3); // -> true
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
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
users.find(user => user.id === 2); // -> {id: 2, name: 'Kim'}

// `filter` 메서드와의 차이점 
// Array#filter는 배열을 반환한다.
[1, 2, 2, 3].filter(item => item === 2); // -> [2, 2]

// Array#find는 요소를 반환한다.
[1, 2, 2, 3].find(item => item === 2); // -> 2
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
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(user => user.id === 2); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(user => user.name === 'Park'); // -> 3

// 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다.
function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return item => item[key] === value;
}

// id가 2인 요소의 인덱스를 구한다.
users.findIndex(predicate('id', 2)); // -> 1

// name이 'Park'인 요소의 인덱스를 구한다.
users.findIndex(predicate('name', 'Park')); // -> 3
```

### 27.9.10 `Array.prototype.flatMap`
- `map` 메서드를 통해 생성된 새로운 배열을 flat하게 만듦 → 즉 `map` + `flat` 메서드를 순차적으로 실행하는 효과
- 단, `flat` 메서드처럼 인수를 전달하여 flat의 깊이 지정 X, 1단계만 평탄화 → 중첩 배열의 평탄화 깊이를 지정하려면 `map` + `flat`
```js
const arr = ['hello', 'world'];

// map과 flat을 순차적으로 실행
arr.map(x => x.split('')).flat();
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
arr.flatMap(x => x.split(''));
// -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

// flatMap은 1단계만 평탄화한다.
arr.flatMap((str, index) => [index, [str, str.length]]);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

// 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
arr.map((str, index) => [index, [str, str.length]]).flat(2);
// -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```
