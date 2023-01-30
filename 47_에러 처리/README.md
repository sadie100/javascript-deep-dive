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

## 47.3 Error 객체

- Error 생성자 함수는 에러 객체를 생성한다. Error 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달할 수 있다.

```jsx
const error = new Error('invalid');
```

- Error 생성자 함수가 생성한 에러 객체는 messsage 프로퍼티와 stack 프로퍼티를 갖는다. message프로퍼티는 인수로 전달한 에러 메시지이고, stack프로퍼티는 디버깅 목적으로 사용한다.
- 자바스크립트는 Error생성자 함수를 포함해 7가지의 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다. 각각의 함수들은 Error.prototype을 상속 받는다.

## 47.4 throw 문

- Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니다. 즉, 에러 객체 생성과 에러 발생은 의미가 다르다.

```jsx
try {
	new Error('something wrong')
} catch (error) {
	console.log(error);
}
```

에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

```jsx
// throw 표현식;

try {
	// 에러 객체를 던지면 catch 코드 블록이 실행되기 시작한다.
	throw new Error('something wrong')
} catch (error) {
	console.log(error);
}
```

throw 문의 표현식은 어떤 값이라도 상관없지만 일반적으로 에러 객체를 지정한다. 에러를 던지면 catch 문의 에러 변수가 생성되고 던져진 에러 객체가 할당된다. 그리고 catch 코드 블록이 실행된다.

## 47.5 에러의 전파

에러는 호출자 방향으로 전파되는데 이때 throw된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드의 실행 흐름을 복구할 수 있다. throw된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다.
