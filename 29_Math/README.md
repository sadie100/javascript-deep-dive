
참고: 
[29장 예제코드](https://github.com/wikibook/mjs/blob/master/29.md).
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020. 

29장 by 이은민 (gcount85)

## 29.1 `Math` 프로퍼티
### 29.1.1 `Math.PI`
```js
// 원주율 PI 값 반환 
Math.PI; // -> 3.141592653589793
```
## 29.2 `Math` 메서드
### 29.2.1 `Math.abs`
```js
// 절대값 반환 → 0 또는 양수 
Math.abs(-1);        // -> 1
Math.abs('-1');      // -> 1
Math.abs('');        // -> 0
Math.abs([]);        // -> 0
Math.abs(null);      // -> 0
Math.abs(undefined); // -> NaN
Math.abs({});        // -> NaN
Math.abs('string');  // -> NaN
Math.abs();          // -> NaN
```

### 29.2.2 `Math.round`
- 인수의 소수점 이하를 **반올림한 정수** 반환
```js
Math.round(1.4);  // -> 1
Math.round(1.6);  // -> 2
Math.round(-1.4); // -> -1
Math.round(-1.6); // -> -2
Math.round(1);    // -> 1
Math.round();     // -> NaN
```
### 29.2.3 `Math.ceil`
- 인수의 소수점 이하를 **올림한 정수** 반환 → 더 큰 정수가 됨 
```js
Math.ceil(1.4);  // -> 2
Math.ceil(1.6);  // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil(1);    // -> 1
Math.ceil();     // -> NaN
```

### 29.2.4 `Math.floor`
- `Math.ceil`의 반대
- 인수의 소수점 이하를 **내림한 정수** 반환 → 더 작은 정수가 됨 
```js
Math.floor(1.9);  // -> 1
Math.floor(9.1);  // -> 9
Math.floor(-1.9); // -> -2
Math.floor(-9.1); // -> -10
Math.floor(1);    // -> 1
Math.floor();     // -> NaN
```
### 29.2.5 `Math.sqrt`
```js
// 인수의 제곱근 반환 
Math.sqrt(9);  // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2);  // -> 1.414213562373095
Math.sqrt(1);  // -> 1
Math.sqrt(0);  // -> 0
Math.sqrt();   // -> NaN
```
### 29.2.6 `Math.random`
- 0에서 1미만의 랜덤한 숫자 반환 (0은 포함, 1은 미포함)
```js
Math.random(); // 0에서 1 미만의 랜덤 실수(0.8208720231391746)

/*
1에서 10 범위의 랜덤 정수 취득
1) Math.random으로 0에서 1 미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10 미만의
랜덤 실수를 구한다.
2) 0에서 10 미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
*/
const random = Math.floor((Math.random() * 10) + 1);
console.log(random); // 1에서 10 범위의 정수
```

### 29.2.7 `Math.pow`
```js
// 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과 반환 
Math.pow(2, 8);  // -> 256
Math.pow(2, -1); // -> 0.5
Math.pow(2);     // -> NaN
```
- 지수 연산자를 사용하면 더 가독성이 좋음 
```js
// ES7 지수 연산자
2 ** 2 ** 2; // -> 16
Math.pow(Math.pow(2, 2), 2); // -> 16
```

### 29.2.8, 29.2.9 `Math.max`,  `Math.min`
```js
// 인수 중 최댓값 반환. 인수가 없으면 `-Infinity` 반환 
Math.max(1); // -> 1
Math.max(1, 2); // -> 2
Math.max(1, 2, 3); // -> 3
Math.max(); // -> -Infinity

// 인수 중 최소값 반환. 인수가 없으면 `-Infinity` 반환
Math.min(1); // -> 1
Math.min(1, 2); // -> 1
Math.min(1, 2, 3); // -> 1
Math.min(); // -> Infinity
```
- 배열을 인수로 받아, 배열의 요소 중에 최댓값/최소값을 구하려면 `Function.prototype.apply` 메서드(☞ 22.2.4절)나, 스프레드 문법(☞ 35.1절)을 사용
```js
// 배열 요소 중에서 최대값/최소값 취득
Math.max.apply(null, [1, 2, 3]); // -> 3
Math.min.apply(null, [1, 2, 3]); // -> 1

// ES6 스프레드 문법
Math.max(...[1, 2, 3]); // -> 3
Math.min(...[1, 2, 3]); // -> 1
```
