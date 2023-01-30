## 47.1 에러 처리의 필요성

발생한 에러에 대해 대처하지 않고 방치하면 프로그램은 강제 종료됨

**try … catch 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행시킬 수 있음**

```jsx
console.log('[Start]');

foo(); // ReferenceError: foo is not defined
// 발생한 에러를 방치하면 프로그램은 강제 종료된다.

// 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다.
console.log('[End]');
```

```jsx
console.log('[Start]');

try {
  foo();
} catch (error) {
  console.error('[에러 발생]', error);
  // [에러 발생] ReferenceError: foo is not defined
}

// 발생한 에러에 적절한 대응을 하면 프로그램이 강제 종료되지 않는다.
console.log('[End]');
```

직접적으로 에러를 발생하지는 않는 예외적인 상황이 발생할 수 있다. 이 경우 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.

```jsx
// DOM에 button 요소가 존재하지 않으면 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null

$button.classList.add('disabled');
// TypeError: Cannot read property 'classList' of null
```

따라서 우리가 작성하는 코드에서는 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전제하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## 47.2 try … catch … finally 문

- 에러 처리를 구현하는 방법
    1. if문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 예외적인 상황을 확인한 후, 예외가 발생했으면 임의의 값(null 또는 -1)을 반환하도록 해서 처리하는 방식
    2. 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 하는 방식

일반적으로 두 번째 방법을 에러 처리(error handling)이라고 함

try … catch … finally는 두 번째 방식

(finally 문은 불필요하다면 생략 가능)

```jsx
try {
  // 실행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
  // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
  // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
} finally {
  // 에러 발생과 상관없이 반드시 한 번 실행된다.
}
```

try … catch … finally 문을 실행하면 먼저 try 코드 블록이 실행됨

이때 try 코드 블록에 포함된 문 중에서 에러가 발생하면 발생한 에러는 catch 문의 err 변수에 전달되며 catch 코드 블록이 실행

- catch문의 err 변수(이름은 무엇이든 상관없음)는 catch 코드 블록에서만 유효함

finally 코드 블록은 에러 발생과 상관없이 반드시 한 번 실행됨

try … catch … finally 문으로 에러를 처리하면 프로그램이 강제 종료되지 않음
