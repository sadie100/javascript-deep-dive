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

  - 구문) `arr.push(element1[, ...[, elementN]])`

  - mutator method

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

  - mutator method

  - 원본 배열에서 마지막 요소를 제거하고, 제거한 요소를 반환

    - 원본 배열이 빈 배열일 경우 `undefined` 반환

  - `pop` 메서드와 앞서 살펴본 `push` 메서드를 함께 사용하여 스택을 구현할 수 있음.

  ```js
  console.log(aespa);  // [ 'Karina', 'Winter', 'Giselle', 'NingNing' ]

  console.log(aespa.pop()); // NingNing

  // pop 메서드는 원본 배열을 직접 변경함
  console.log(aespa); // [ 'Karina', 'Winter', 'Giselle' ]
  ```

- `Array.prototype.unshift` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift))

  - 구문) `arr.unshift([...elementN])`

  - mutator method

  - 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고, 변경된 `length` 프로퍼티 값을 반환

  ```js
  const snake = ['M', 'B', 'A'];

  console.log(snake.unshift('M', 'A')); // 5

  // unshift 메서드는 원본 배열을 직접 변경함
  console.log(snake); // [ 'M', 'A', 'M', 'B', 'A' ]
  ```

  - 원본 배열을 직접 변경하는 side effect가 있으므로, 다음과 같이 스프레드 문법을 사용하는 것이 더 좋다.

    ```js
    // ES6 스프레드 문법 사용
    const snake = ['M', 'B', 'A'];

    const newSnake = ['M', 'A', ...snake];
    console.log(newSnake); // [ 'M', 'A', 'M', 'B', 'A' ]
    ```

    - 이렇게 스프레드 문법을 사용하면 함수 호출 없이 표현식으로 선두에 요소를 추가할 수 있으며, 부수 효과도 없다.

- `Array.prototype.shift` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/shift))

  - 구문) `arr.shift()`

  - mutator method

  - 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환

  - `shift` 메서드와 앞에서 살펴본 `push` 메서드를 사용하여 큐를 구현할 수 있음.

  ```js
  console.log(newSnake); // [ 'M', 'A', 'M', 'B', 'A' ]

  // shift
  console.log(newSnake.shift()); // M
  console.log(newSnake); // [ 'A', 'M', 'B', 'A' ]
  ```

- `Array.prototype.concat` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat))

  - 구문) `array.concat([value1[, value2[, ...[, valueN]]]])`

  - 원본 배열을 변환하지 않음.

  - 'concat'은 concatenate의 약어로, 직역하면 '사슬같이 잇다, 이어붙이다'라는 뜻

  - 인수로 전달된 값들(배열 또는 배열이 아닌 값)을 원본 배열의 **마지막 요소**로 추가한 **새로운 배열을 반환**

  - `concat` 메서드를 이용하여, `push` 메서드 및 `unshift` 메서드를 대체할 수 있음.

    - `push`, `unshift` 메서드와 달리 `concat` 메서드는 accessor 메서드로서 원본 배열을 변환하지 않으므로 더 안전하게 사용할 수 있다.

  ```js
  const arr1 = [1, 2];
  const arr2 = [3, 4];

  // 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
  // 이처럼 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가
  // 중첩 배열을 전달할 경우에는 1단계까지만 해체함
  let result = arr1.concat(arr2);
  console.log(result); // [ 1, 2, 3, 4 ]

  console.log(arr1, arr2); // [ 1, 2 ] [ 3, 4 ]
  // 원본 배열 변경없음

  // 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
  console.log(arr1.concat(300)); // [ 1, 2, 300 ]

  // 배열 arr2와 문자열을 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열 반환
  result = arr1.concat(arr2, 'Good morning🎈');
  console.log(result); // [ 1, 2, 3, 4, 'Good morning🎈' ]

  console.log(arr1); // [ 1, 2 ]
  // 원본 배열 변경없음
  ```

- `Array.prototype.splice` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice))

  - 구문) `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

  - mutator method

  - 원본 배열의 중간에 요소를 추가하거나, 중간에 있던 요소를 제거하는 경우에 사용

  - 3개의 매개변수가 있음.

    - start
      - 원본 배열의 요소를 제거하기 시작할 **인덱스**
      - **start만 지정**하면 원본 배열의 start부터 모든 요소를 제거
      - start가 **음수**인 경우, 배열의 끝에서의 인덱스를 나타냄. (예를 들어 start가 -1이면 마지막 요소를 가리킴.)
  - deleteCount (옵션)
      - start부터 어디까지 제거할지를 알려줌. 즉, 제거할 요소의 **개수**를 나타냄.
      - deleteCount가 0인 경우, 아무런 요소도 제거되지 않음.
  - items (옵션)
      - 이 매개변수에는 0개 이상의 인수를 전달할 수 있음.
      - 제거한 위치에 삽입할 요소(들)
      - 생략할 경우, 원본 배열에서 요소들을 제거하기만 함.

  ```js
  const arr = ['white', 'mamba'];

  // 원본 배열의 인덱스 1부터 1개의 요소를 제거하고,
  // 그 자리에 새로운 요소를 삽입
  const result = arr.splice(0, 1, 'black');
  console.log(result); // [ 'white' ]

  // 원본 배열 직접 변경(mutator method)
  console.log(arr); // [ 'black', 'mamba' ]

  // 원본 배열(arr)의 인덱스 1부터 0개의 요소를 제거하고,
  // 그 자리에 새로운 요소 'AESPA'를 삽입
  const test = arr.splice(1, 0, 'AESPA');
  console.log(test); // []
  console.log(arr); // [ 'black', 'AESPA', 'mamba' ]
  ```

- `Array.prototype.slice` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice))

  - 구문) `arr.slice([begin[, end]])`

  - 인수로 전달된 범위의 요소들을 복사하여 배열로 반환

    - 이때 생성된 복사본은 얕은 복사(shallow copy)를 통해 생성된다.

  ```js
  const favColors = [
    { id: 1, content: 'thistle' },
    { id: 2, content: 'grey' },
    { id: 3, content: 'babypink' }
  ];

  // 얕은 복사(shallow copy)
  const _favColors = favColors.slice();
  // same as
  // const favColors = [ ...favColors];
  console.log(_favColors);
  /*
  [
    { id: 1, content: 'thistle' },
    { id: 2, content: 'grey' },
    { id: 3, content: 'babypink' }
  ]
  */

  // _favColors와 favColors는 참조값이 다른 별개의 객체
  console.log(_favColors === favColors); // false
  ```

  - 객체를 프로퍼티 값으로 갖는 객체를 복사하는 경우, 얕은 복사(shallow copy) or 깊은 복사(deep copy)

    - 얕은 복사 -> 한 단계까지만 복사

    - 깊은 복사 -> 객체에 중첩되어 있는 객체까지 모두 복사

- `slice` 메서드를 이용하여 `arguments`, `HTMLCollection`, `NodeList`와 같은 유사 배열 객체를 배열로 변환할 수 있음.

- `Array.prototype.join` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join))

  - 구문) `arr.join([separator])`

  - 원본 배열의 모든 요소들을 문자열로 변환한 후, 인수로 전달받은 문자열(=구분자, separator)로 연결한(=이어붙인) 문자열을 반환

  - 구분자는 생략 가능

    - 기본 구분자 : `,`

  ```js
  const elements = ['Fire', 'Air', 'Water'];

  console.log(elements.join());
  // expected output: "Fire,Air,Water"

  console.log(elements.join(''));
  // expected output: "FireAirWater"

  console.log(elements.join('-'));
  // expected output: "Fire-Air-Water"
  ```

- `Array.prototype.reverse` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse))

  - 구문) `a.reverse()`

  - mutator method

  - 원본 배열의 순서를 반대로 뒤집고, 변경된 배열을 반환

  ```js
  // reverse
  const mamba = ['mamba', 'black'];
  console.log(mamba.reverse()); // [ 'black', 'mamba' ]
  ```

- `Array.prototype.fill` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill))

  - 구문) `arr.fill(value[, start[, end]])`

  - mutator method

  - ES6에서 도입

  - 인자로 전달받은 값을 배열의 처음부터 끝까지의 요소로 채움.

  ```js
  const arr = new Array(8);
  console.log(arr); // [ <8 empty items> ]

  const result = arr.fill('💙', 0, 3);
  console.log(result); // [ '💙', '💙', '💙', <5 empty items> ]
  console.log(arr); // [ '💙', '💙', '💙', <5 empty items> ]

  arr.fill('💛', 3, 6);
  console.log(arr); // [ '💙', '💙', '💙', '💛', '💛', '💛', <2 empty items> ]

  arr.fill('🧡', 6);
  console.log(arr);
  /*
  [
    '💙', '💙', '💙',
    '💛', '💛', '💛',
    '🧡', '🧡'
  ]
  */
  ```

- `Array.prototype.includes` ([MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes))

  - 구문) `arr.includes(valueToFind[, fromIndex])`

  - 배열이 특정 요소를 포함하고 있는지 판별하며, 해당 요소가 존재한다면 `true`를, 아니라면 `false`를 반환

  ```js
  const pets = ['cat', 'dog', 'bat'];

  console.log(pets.includes('cat'));
  // expected output: true

  console.log(pets.includes('at'));
  // expected output: false
  ```

- `Array.prototype.flat` (MDN)

  - 구문) `const newArr = arr.flat([depth])`

  - ES10 도입

  - 중첩 배열을 평탄화함. 인수를 전달하여 '평탄화 레벨'(=평탄화할 깊이)을 지정할 수 있음.

    - 인수로 `Infinity`를 전달할 경우, 중첩 배열을 모두 평탄화한다.

      ```js
      // flat
      const multiArr = [1, [0, [0, 1], 1], 2];

      // 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화
      console.log(multiArr.flat(Infinity)); // [ 1, 0, 0, 1, 1, 2 ]

      // 원본 배열 변경하지 않음
      console.log(multiArr); // [ 1, [ 0, [ 0, 1 ], 1 ], 2 ]
      ```

  - 관련 응용: 중첩 배열 풀기

    ```js
    /*
      flattenNested([1,2,[3,4],[5,[6,7,[8]]]])
      Result: [1, 2, 3, 4, 5, 6, 7, 8];
    */

    // const flatten = (xs) => xs.flat(Infinity)

    const flatten = (xs) => [].concat(...xs);
    const hasArray = (xs) => xs.some(Array.isArray);

    function flattenNested(numbers) {
      return hasArray(numbers) ? flattenNested(flatten(numbers)) : numbers;
    }
    ```