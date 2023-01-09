## 27.8 배열 메서드

- 배열 메서드는 결과물을 반환하는 패턴이 두 가지

  - mutator method 👉 원본 배열을 직접 변경

  - accessor method(권장) 👉 원본 배열을 직접 변경하지 않고, 새로운 배열을 생성하여 반환하는 메서드

  > 원본 배열: 배열 메서드를 호출한 배열로서, 배열 메서드의 구현체 내부에서 `this`가 가리키는 객체

- `Array.isArray` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray))
  - 구문) `Array.isArray(obj)`

  - 인자로 전달 받은 값이 배열이라면 `true`, 아니라면 `false`를 반환

  ```js
  console.log(Array.isArray([1, 0])); // true
  console.log(Array.isArray({
  0: 1,
  1: 4,
  2: 0,
  length: 3
  })); // false
  console.log(Array.isArray(Array(1, 2))); // true
  ```

  - 유사 배열일 경우에도 `false`를 반환하는 것을 알 수 있다.

- `Array.prototype.indexOf` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf))

  - 구문) `arr.indexOf(searchElement[, fromIndex])`

  - 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환

    - 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환

    - 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1을 반환

  - 일반적인 사용 용도

    - 배열에 어떤 특정 요소가 존재하는지 안하는지 확인해서, 그 존재 여부에 따라 다른 작업을 하고 싶을 때 사용 (ex - 어떤 요소가 배열에 없을 경우 그 배열에 해당 요소를 추가하려고 할 때)

  ```js
  // .indexOf
  const aespa = ['Karina', 'Winter', 'Giselle'];

  // aespa 배열에 'NingNing' 요소가 존재하는지 확인
  if (aespa.indexOf('NingNing') === -1) {
  // aespa 배열에 'NingNing' 요소가 존재하지 않으면 'NingNing' 요소를 추가
    aespa.push('NingNing');
  }
  console.log(aespa); // [ 'Karina', 'Winter', 'Giselle', 'NingNing' ]
  ```

- `Array.prototype.push` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/push))

  - mutator method

  - 구문) `arr.push(element1[, ...[, elementN]])`

  - 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고, 변경된 length 프로퍼티 값을 반환

  - 원본 배열을 직접 변경하는 부수 효과가 있음. 👉 ES6의 스프레드 문법을 사용하는 게 더 좋다.

  - 예제

    ```js
    // .push
    const blackMamba = ['Black'];

    console.log(blackMamba.push('Mamba')); // 2
    console.log(blackMamba); // [ 'Black', 'Mamba' ]
    ```

    ```js
    // ES6 스프레드 문법 사용
    const blackMamba = ['Black'];

    const newBM = [ ...blackMamba, 'Mamba'];
    console.log(newBM); // [ 'Black', 'Mamba' ]
    ```

    원본 배열을 변경해도 괜찮다면 다음과 같이 `length` 프로퍼티를 사용하여 배열의 마지막에 요소를 직접 추가하는 방법도 있다. `push` 메서드를 사용하는 것보다 성능 상에서 좋다고 한다.

    ```js
    // length 프로퍼티 사용
    const blackMamba = ['Black'];

    blackMamba[blackMamba.length] = 'Mamba';
    console.log(blackMamba); // [ 'Black', 'Mamba' ]
    ```

- `Array.prototype.pop` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/pop))

  - 구문) `arr.pop()`