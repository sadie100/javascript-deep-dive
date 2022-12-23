이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

# 4장 변수
## 1. 변수란 무엇인가? 왜 필요한가?
- 변수(variable)

  - 데이터를 **관리**하기 위한 핵심 개념

  - 변수는 프로그래밍 언어에서 값을 저장하고 참조하는 메커니즘으로, 값의 위치를 가리키는 '상징적인 이름'이다.

  - 변수를 사용하는 이유: 값을 "재사용"하기 위해서

- <b>평가(evaluation)</b>: 자바스크립트 엔진이 자바스크립트 코드를 연산하는 것

<details>
<summary>자바스크립트 엔진</summary>

  > 참고: https://en.wikipedia.org/wiki/JavaScript_engine

  - "ECMAScript 엔진"이라고도 부른다.

    - ECMAScript가 자바스크립트의 표준 규격이기 때문

  - 자바스크립트 엔진은 **자바스크립트 코드를 실행하는 소프트웨어**로서, 브라우저 뿐만 아니라 Node.js나 Deno 실행 시스템 등에서도 핵심 구성요소로서 사용된다.

    - 브라우저에서 자바스크립트 엔진은 Document Object Model(DOM)을 통해 [렌더링 엔진](https://en.wikipedia.org/wiki/Browser_engine#Layout_and_rendering)과 함께 실행된다.

  - 초기에는 단순한 인터프리터였지만, 현대의 엔진들은 성능 향상을 위해 just-in-time compilation을 사용하여 구현되어 있다.

  - 자바스크립트 엔진은 주로 웹브라우저 공급사들이 개발하며, 주요 브라우저마다 하나씩 가지고 있다.
</details>

## 2. 식별자(identifier)

- 식별자란 어떤 값을 구별해서 식별할 수 있는 고유한 이름을 의미한다.

- 식별자는 메모리 주소에 붙인 이름이다.

- <b>선언(declaration)</b>: 자바스크립트 엔진이 식별자의 존재를 알리는 것

## 3. 변수 선언(variable declaration)

- 변수 선언이란 변수를 생성하는 것을 의미한다.

- ReferenceError: 식별자를 통해 값을 참조하려 했지만, 자바스크립트 엔진이 등록된 식별자를 찾을 수 없을 때 발생하는 에러

- 변수 선언 시 사용하는 키워드: `var`, `let`, `const`

  > 키워드(keyword)란, 자바스크립트 엔진이 수행할 동작을 규정한 일종의 명령어를 의미한다.

  - `var` 🆚 `let` 🆚 `const`

    - `var`는 `let`, `const`와 달리, 변수를 중복 선언하더라도 에러가 발생하지 않는다.

      ```js
      /* 에러 발생하지 않음. */
      var a = "안녕하세요";
      var a = "hello";

      /* SyntaxError: Identifier 'b' has already been declared */
      let b = "안녕하세요";
      let b = "hello";

      /* SyntaxError: Identifier 'c' has already been declared */
      const c = "안녕하세요";
      const c = "hello";
      ```

    - `var`는 함수 블록만을 지역 스코프로 인정한다. 하지만 `let`, `const`는 if문과 for문 등 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

      ```js
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
      console.log(varInFunction);

      console.log(varInFor); // 가

      /* ReferenceError: letInFor is not defined */
      console.log(letInFor);

      /* ReferenceError: constInFor is not defined */
      console.log(constInFor);
      ```

    -  `const`는 `var`, `let`과 달리, 변수의 선언과 할당이 동시에 이루어지지 않으면 에러가 발생한다.

  - 변수 선언에 의해 확보된 메모리 공간은 초기화하기 전까지 `undefined`라는 값이 암묵적으로 할당된다. -> **"암묵적 초기화"**

    - cf.) C언어 쓰레기값

    - `undefined`: 자바스크립트에서 제공하는 원시 타입의 값(primitive value)

## 4. 변수 선언의 실행 시점과 변수 호이스팅

- 변수 선언은 소스코드가 한 줄씩 순차적으로 실행되는 시점(=런타임, runtime)이 아니라, 그 이전 단계에서 먼저 실행됨.

- 자바스크립트 엔진은 소스코드를 한 줄씩 순차적으로 실행하기에 앞서, **소스코드의 평가 과정**을 거치면서 소스코드를 실행하기 위한 준비를 함.

  - 평가 과정에서 자바스크립트 엔진은 **모든 선언문**을 소스코드에서 찾아내 먼저 실행

- 평가 과정이 끝나면 비로소, 모든 선언문을 제외하고 **소스코드를 한 줄씩 순차적으로 실행**

- 이와 같이, 자바스크립트 엔진이 어떤 위치에 있는 선언문이든 먼저 실행함으로 인해, 변수가 어디에서 선언되었는지와 상관없이 어디에서든 변수를 참조할 수 있음. -> **"변수 호이스팅"**

  > 변수 호이스팅은 자바스크립트의 고유한 특징으로, 변수 선언문이 코드의 선두로 끌어올려진 것처럼 동작하는 것을 의미한다.

  - 변수 호이스팅은 엄연한 부작용이다.

- `let`, `const`의 경우 다음과 같이 ReferenceError가 발생하기 때문에 호이스팅이 발생하지 않는 것처럼 보여지나 실제로는 호이스팅이 발생한다고 한다. ([15장 참고](https://www.notion.so/12-JavaScript-20-11-29-15-let-const-638ec3622c71451a8f8535c3dbfa5dec#2ab5d5e51d484276ae7640769ebf542a))

  ```js
  /* ReferenceError: Cannot access 'testA' before initialization */
  console.log(testA);
  let testA = "test";

  /* ReferenceError: Cannot access 'testB' before initialization */
  console.log(testB);
  let testB = "test";
  ```

## 5. 값의 할당

- 변수의 선언과 값의 할당 시점이 다름.

  - 변수 선언: 런타임 이전에 먼저 실행됨.

  - 값의 할당: 런타임에 실행됨.

> 런타임: 소스코드가 순차적으로 실행되는 시점

## 6. 값의 재할당

- 어떤 변수에 값을 재할당할 때는 새로운 메모리 공간을 확보하고, 그 새롭게 확보한 메모리 공간에 재할당할 값을 저장하고 해당 변수와 바인딩

  - 기존에 바인딩 되어 있던 메모리 공간에 저장되어 있던 값은 이제 어떠한 식별자와도 연결되어 있지 않게 됨. -> 이러한 값들은 가비지 컬렉터에 의해서 메모리에서 자동적으로 해제된다. (정확히 어느 시점에 해제되는지는 알 수 없음.)

## 7. 값의 교환

- 교환될 값 중 하나를 임시로 담아둘 변수를 하나 선언해서 활용하기

## 8. 식별자 네이밍 규칙

- 식별자는 숫자로 시작할 수 없음.

- 예약어는 식별자로 사용할 수 없음.

  > 예약어: 프로그래밍 언어에서 사용되고 있거나 사용될 예정인 단어
