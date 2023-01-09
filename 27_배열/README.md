참고:
[27장 예제코드](https://github.com/wikibook/mjs/blob/master/27.md).
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.
---

## 27.1 배열이란?

배열 : 여러 개의 값을 순차적으로 나열한 자료구조

```jsx
const arr = ['apple', 'banana', 'orange'];
```

요소(element) : 배열이 가지고 있는 값. 자바스크립트의 모든 값은 배열의 요소가 될 수 있음

인덱스(index) : 배열에서 각 요소의 위치를 나타내는 0 이상의 정수

요소에 접근할 때는 대괄호 표기법을 사용

```jsx
arr[0] // -> 'apple'
arr[1] // -> 'banana'
arr[2] // -> 'orange'
```

배열은 요소의 개수, 즉 배열의 길이를 나타내는 length 프로퍼티를 가짐

```jsx
arr.length // -> 3
```

배열은 인덱스와 length 프로퍼티를 갖기 때문에 for문을 통해 순차적으로 요소에 접근 가능

```jsx
// 배열의 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 'apple' 'banana' 'orange'
}
```

자바스크립트에서 배열은 객체 타입이지만, 일반 객체와는 구별되는 독특한 특징이 있음

| 구분 | 객체 | 배열 |
| --- | --- | --- |
| 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조 | 프로퍼티 키 | 인덱스 |
| 값의 순서 | X | O |
| length 프로퍼티 | X | O |

일반 객체와 배열을 구분하는 가장 명확한 차이는 “값의 순서”와 “length 프로퍼티”임

배열의 프로토타입 객체는 Array.prototype이며, Array.prototype은 배열을 위한 빌트인 메서드를 제공함

## 27.2 자바스크립트 배열은 배열이 아니다

자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조.

⇒ 일반적인 의미에서 말하는 배열의 요소는 하나의 데이터 타입으로 통일되어 있으며, 서로 연속적으로 인접해 있음(=**밀집 배열**)

### 밀집 배열의 특징

- 인덱스를 통해 단 한 번의 연산으로 임의의 요소에 접근(임의 접근. 시간복잡도 O(1))할 수 있음
    
    > 검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수
    > 
    
    ⇒ 인덱스를 통해 효율적으로 요소에 접근 가능
    
- but. 정렬되지 않은 배열에서 특정한 요소를 검색하는 경우 배열의 모든 요소를 처음부터 특정 요소를 발견할 때까지 차례대로 검색(선형 검색. 시간복잡도 O(n))해야 함
- 배열에 요소를 삽입하거나 삭제하는 경우 배열의 요소를 연속적으로 유지하기 위해 요소를 이동시켜야 함

### 자바스크립트의 배열

자바스크립트에서 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있음(=********************희소 배열********************)

⇒ 자바스크립트의 배열은 일반적 의미의 배열이 아닌, ******************************************************************************************************************일반적인 배열의 동작을 흉내 낸 특수한 객체******************************************************************************************************************

```jsx
// "16.2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체" 참고
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true}
  '1': {value: 2, writable: true, enumerable: true, configurable: true}
  '2': {value: 3, writable: true, enumerable: true, configurable: true}
  length: {value: 3, writable: true, enumerable: false, configurable: false}
}
*/
```

자바스크립트의 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며, length 프로퍼티를 갖는 특수한 객체.

⇒ 자바스크립트 배열의 요소는 프로퍼티 값이므로, 어떤 타입의 값이라도 배열의 요소가 될 수 있음

```jsx
const arr = [
  'string',
  10,
  true,
  null,
  undefined,
  NaN,
  Infinity,
  [ ],
  { },
  function () {}
];
```

일반적인 배열과 자바스크립트 배열의 장단점을 정리해보면 다음과 같음

- 일반적인 배열은 인덱스로 요소에 빠르게 접근 가능하지만, 요소를 삽입 또는 삭제하는 경우에는 효율적이지 않음
- 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느림. 하지만 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠름

> 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수밖에 없는 구조적 단점을 보완하기 위해, 대부분의 모던 자바스크립트 엔진은 배열을 일반 객체와 구별하여 좀 더 배열처럼 동작하도록 최적화하여 구현함
> 

## 27.3 length 프로퍼티와 희소 배열

length 프로퍼티는 **요소의 개수**, 즉 배열의 길이를 나타내는 0 이상의 정수를 값으로 가짐

⇒ 빈 배열의 경우 0이며, 빈 배열이 아닐 경우 가장 큰 인덱스에 1을 더한 것과 같음

```jsx
[].length        // -> 0
[1, 2, 3].length // -> 3
```

length 프로퍼티의 값은 0과 2^32 - 1(4,294,967,295) 미만의 양의 정수

⇒ 배열은 요소를 최대 2^32 - 1(4,294,967,295)개 가질 수 있음

length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신되며, 임의의 숫자값을 명시적으로 할당할 수도 있음

- if. 현재 length 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어듦
    
    ```jsx
    const arr = [1, 2, 3, 4, 5];
    
    // 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
    arr.length = 3;
    
    // 배열의 길이가 5에서 3으로 줄어든다.
    console.log(arr); // [1, 2, 3]
    ```
    
- if. 현재 length 프로퍼티 값보다 큰 숫자 값을 할당하면 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나진 않음
    
    ```jsx
    const arr = [1];
    
    // 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
    arr.length = 3;
    
    // length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
    console.log(arr.length); // 3
    console.log(arr); // [1, empty × 2]
    ```
    
    위 예제의 출력 결과에서 empty * 2는 실제로 추가된 배열의 요소가 아님. 즉, arr[1]과 arr[2]에는 값이 존재하지 않음
    
    ⇒ 현재 length보다 큰 숫자값을 length 프로퍼티에 할당하는 경우, 값 자체는 변경되지만 실제 배열에는 아무런 변함이 없음 ⇒ 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않음
    
    이처럼 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열을 ******************희소 배열******************이라고 함. 자바스크립트는 희소 배열을 문법적으로 허용
    

배열의 중간이나 앞부분이 비어 있을 수도 있음

```jsx
// 희소 배열
const sparse = [, 2, , 4];

// 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
console.log(sparse.length); // 4
console.log(sparse); // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(sparse));
/*
{
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '3': { value: 4, writable: true, enumerable: true, configurable: true },
  length: { value: 4, writable: true, enumerable: false, configurable: false }
}
*/
```

일반적인 배열의 length는 배열 요소의 개수, 즉 배열의 길이와 언제나 일치함

하지만 ********************************************************************************************************************희소 배열은 length와 배열 요소의 개수가 일치하지 않음. 희소 배열의 length는 희소 배열의 실제 요소 개수보다 언제나 큼********************************************************************************************************************

자바스크립트는 문법적으로 희소 배열을 허용하지만 희소 배열은 사용하지 않는 것이 좋음

- 희소 배열은 연속적인 값의 집합이라는 배열의 기본적인 개념과 맞지 않으며, 성능에도 좋지 않은 영향을 줌

최적화가 잘 되어 있는 모던 자바스크립트 엔진은 요소의 타입이 일치하는 배열을 생성할 때 일반적인 의미의 배열처럼 연속된 메모리 공간을 확보하는 것으로 알려져 있음

⇒ ************************************************************************************************************************************************************************배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선************************************************************************************************************************************************************************

## 27.4 배열 생성

### 27.4.1 배열 리터럴

가장 일반적이고 간편한 배열 생성 방식

0개 이상의 요소를 쉼표로 구분하여 대괄호([])로 묶음

```jsx
const arr = [1, 2, 3];
console.log(arr.length); // 3

const arr2 = [];
console.log(arr2.length); // 0

const arr3 = [1, , 3]; // 희소 배열

// 희소 배열의 length는 배열의 실제 요소 개수보다 언제나 크다.
console.log(arr3.length); // 3
console.log(arr3);        // [1, empty, 3]
console.log(arr3[1]);     // undefined
```

### 27.4.2 Array 생성자 함수

Array 생성자 함수를 통해 배열을 생성할 수 있음

Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요함

1. 전달된 인수가 1개이고 숫자인 경우, length 프로퍼티 값이 인수인 배열을 생성
    
    이때 생성된 배열은 희소 배열. 실제로 배열의 요소는 존재하지 않음
    
    ```jsx
    const arr = new Array(10);
    
    console.log(arr); // [empty × 10]
    console.log(arr.length); // 10
    
    //실제로 배열의 요소는 존재하지 않는다
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
      length: {value: 10, writable: true, enumerable: false, configurable: false}
    }
    */
    
    // 배열은 요소를 최대 4,294,967,295개 가질 수 있다.
    new Array(4294967295);
    
    // 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError가 발생한다.
    new Array(4294967296); // RangeError: Invalid array length
    
    // 전달된 인수가 음수이면 에러가 발생한다.
    new Array(-1); // RangeError: Invalid array length
    
    //전달된 인수가 없는 경우 빈 배열을 생성
    new Array(); // -> []
    ```
    
2. 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성
    
    ```jsx
    // 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
    new Array(1, 2, 3); // -> [1, 2, 3]
    
    // 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
    new Array({}); // -> [{}]
    
    Array(1, 2, 3); // -> [1, 2, 3]
    ```
    

Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도, 즉 일반 함수로서 호출해도 배열을 생성하는 생성자 함수로 동작함

### 27.4.3 Array.of

ES6에서 도입

전달된 인수를 요소로 갖는 배열을 생성

(전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성)

```jsx
// 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
Array.of(1); // -> [1]

Array.of(1, 2, 3); // -> [1, 2, 3]

Array.of('string'); // -> ['string']
```

### 27.4.4 Array.from

ES6에서 도입

유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환

```jsx
// 유사 배열 객체를 변환하여 배열을 생성한다.
Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']

// 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
```

Array.from을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있음

⇒ 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환

```jsx
// Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
Array.from({ length: 3 }); // -> [undefined, undefined, undefined]

// Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]
```

- 개인적으로 Array.from을 js로 알고리즘 문제 풀 때, 2차원 배열을 구성할 때 사용
    
    ```jsx
    graph = Array.from(Array(3), () => new Array(5).fill(0));
    // [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]] 
    ```
    

### 덧. 유사 배열 객체와 이터러블 객체

유사 배열 객체 : 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체. 배열처럼 for문으로 순회할 수도 있음

```jsx
// 유사 배열 객체
const arrayLike = {
  '0': 'apple',
  '1': 'banana',
  '2': 'orange',
  length: 3
};

// 유사 배열 객체는 마치 배열처럼 for 문으로 순회할 수도 있다.
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // apple banana orange
}
```

이터러블 객체 : Symbol.iterator 메서드를 구현하여 for … of 문으로 순회할 수 있으며, [스프레드 문법](https://learnjs.vlpt.us/useful/07-spread-and-rest.html)과 [배열 디스트럭쳐링](https://poiemaweb.com/es6-destructuring) 할당의 대상으로 사용할 수 있는 객체

ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments 등이 있음

## 27.5 배열 요소의 참조

배열의 요소를 참조할 때에는 대괄호([]) 표기법 사용. 대괄호 안엔 참조할 인덱스 넣음

존재하지 않는 요소에 접근하면 undefined 반환

```jsx
const arr = [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2

// 인덱스가 2인 요소를 참조. 배열 arr에는 인덱스가 2인 요소가 존재하지 않는다.
console.log(arr[2]); // undefined

// 희소 배열
const arr2 = [1, , 3];

// 배열 arr2에는 인덱스가 1인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr2));
/*
{
  '0': {value: 1, writable: true, enumerable: true, configurable: true},
  '2': {value: 3, writable: true, enumerable: true, configurable: true},
  length: {value: 3, writable: true, enumerable: false, configurable: false}
*/

// 존재하지 않는 요소를 참조하면 undefined가 반환된다.
console.log(arr2[1]); // undefined
console.log(arr2[3]); // undefined
```

## 27.6 배열 요소의 추가와 갱신

존재하지 않는 인덱스를 사용해 값을 할당하면 새로운 요소가 추가됨. length 프로퍼티 값은 자동 갱신됨

만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 됨

```jsx
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [0, 1]
console.log(arr.length); // 2

arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101
```

이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신

```jsx
// 요소값의 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]
```

만약 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아니라 프로퍼티가 생성됨. 이 때 추가된 프로퍼티는 length 프로퍼티 값에 영향을 주지 않음

```jsx
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr.bar = 4;
arr[1.1] = 5;
arr[-1] = 6;

console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```

## 27.7 배열 요소의 삭제

배열은 사실 객체이기 때문에 delete 연산자를 사용 가능. 그러나 delete를 통해 객체의 프로퍼티를 삭제할 경우 length 프로퍼티 값은 변하지 않으므로 희소 배열이 됨

희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 Array.prototype.splice 메서드를 사용함

```jsx
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티가 자동 갱신된다.
console.log(arr.length); // 2
```

## 27.8 배열 메서드

자바스크립트는 다양한 빌트인 배열 메서드를 제공

Array 생성자 함수는 정적 메서드 제공, Array.prototype은 프로토타입 메서드 제공

배열 메서드는 결과물을 반환하는 패턴이 두 가지이므로 주의가 필요

1. 원본 배열(배열 메서드를 호출한 배열)을 직접 변경하는 메서드(mutator method)
2. 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드(accessor method)

```jsx
const arr = [1];

// push 메서드는 원본 배열(arr)을 직접 변경한다.
arr.push(2);
console.log(arr); // [1, 2]

// concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
const result = arr.concat(3);
console.log(arr);    // [1, 2]
console.log(result); // [1, 2, 3]
```

ES5부터 도입된 배열 메서드는 대부분 원본 배열을 직접 변경하지 않지만, 초창기 배열 메서드는 원본 배열을 직접 변경하는 경우가 많음

원본 배열을 직접 변경하는 메서드는 외부 상태를 직접 변경하는 부수 효과가 있으므로 사용할 때 주의 필요

⇒ 가급적 원본 배열을 직접 변경하지 않는 메서드를 사용하는 편이 좋다.

### 27.8.1 Array.isArray

Array 생성자 함수의 정적 메서드

전달된 인수가 배열이면 true, 배열이 아니면 false 반환

```jsx
// true
Array.isArray([]);
Array.isArray([1, 2]);
Array.isArray(new Array());

// false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ 0: 1, length: 1 })
```

### 27.8.2 Array.prototype.indexOf

원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환

- 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환
- 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1 반환

```jsx
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
arr.indexOf(2);    // -> 1
// 배열 arr에 요소 4가 없으므로 -1을 반환한다.
arr.indexOf(4);    // -> -1
// 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // -> 2
```

indexOf 메서드는 배열에 특정 요소가 존재하는지 확인할 때 유용했으나, ES7에서 Array.prototype.includes 메서드가 도입되었으므로 이 상황에서는 includes를 사용하는 편이 가독성이 더 좋음

```jsx
/***********************indexOf*****************************/
const foods = ['apple', 'banana', 'orange'];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (foods.indexOf('orange') === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]

/***********************includes*****************************/
const foods = ['apple', 'banana'];

// foods 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods.includes('orange')) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```


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
