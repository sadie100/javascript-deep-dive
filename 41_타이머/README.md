
참고:
[41장 예제코드](https://github.com/wikibook/mjs/blob/master/41.md).<br>
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).<br>
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

41장 by 이은민 (gcount85)

# 41장 타이머
## 41.1 호출 스케줄링
- *타이머 함수*와 *호출 스케줄링*
	- 함수를 명시하면 일반적으로 즉시 실행됨
	- 하지만 **타이머 함수란 일정 시간이 지난 후 함수가 호출되도록 함수 호출을 예약할 수 있게 해주는 함수**
	- **호출 스케줄링이란 타이머 함수를 이용하는 것**
- 타이머 함수 `setTimeout`, `setInterval`은 *비동기 처리 방식*으로 동작함 ☞ 42장 "비동기 프로그래밍"
	- 자바스크립트 엔진은 *싱글 스레드*로 동작하기 때문
	- 즉, 단 하나의 실행 컨텍스트 스택만 가지며 두 가지 이상의 태스크를 동시에 실행 X
- 타이머 함수
	- 타이머 생성 함수 `setTimeout`, `setInterval`: 타이머 생성 후, 타이머가 만료되면 콜백 함수 호출됨
	- 타이머 제거 함수 `clearTimeout`, `clearInterval`
## 41.2 타이머 함수
### 41.2.1 `setTimeout` / `clearTimeout`
#### `setTimeout`
- **단 한번** 동작하는 타이머 생성. 타이머 만료 -> 콜백 함수 호출
```js
const timeoutId = setTimeout(func|code[, delay, param1, param2, ...])
```
- 매개변수
	- `func` : 타이머가 만료된 뒤 호출될 콜백 함수
		- 함수 대신 코드를 문자열로 전달 가능. 이때는 타이머가 만료된 뒤 해석되고 실행 됨. `eval` 함수 같은 것 but 비권장!)
	- `delay` : 생략 가능. 타이머 만료 시간. 밀리초(ms) 단위. 생략시 디폴트 0
		- delay 만료 후 콜백 함수의 즉시 호출이 보장되지는 않음. 태스크 큐에 콜백 함수의 등록을 `n` ms후로 지연시키는 개념임.
		- 최소 지연 시간 4ms
	- `param1`, `param2` … : 생략 가능. 콜백함수에 전달해야 할 인수
		- IE9 이하에서는 안된다고 함
- 반환값
	- 타이머 id: 생성된 타이머를 식별함. 브라우저 환경이면 숫자, Node.js 환경이면 객체
```js
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
setTimeout(() => console.log('Hi!'), 1000);

// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
// 이때 콜백 함수에 'Lee'가 인수로 전달된다.
setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Lee');

// 두 번째 인수(delay)를 생략하면 기본값 0이 지정된다.
setTimeout(() => console.log('Hello!'));
```
#### `clearTimeout`
- 타이머 식별자를 받아 해당 타이머의 호출 스케줄링 취소
```js
// 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
// setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
const timerId = setTimeout(() => console.log('Hi!'), 1000);

// setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를
// 취소한다. 타이머가 취소되면 setTimeout 함수의 콜백 함수가 실행되지 않는다.
clearTimeout(timerId);
```
- 매개변수
	- `timerId`: `setTimeout`이 반환한 타이머 식별자
### 41.2.2 `setInterval` / `clearInterval`
#### `setInterval`
- **반복적으로** 동작하는 타이머 생성. **타이머가 취소될 때까지** 타이머 만료될 때마다, 콜백 함수 반복 호출
```js
const timeoutId = setInterval(func|code[, delay, param1, param2, ...])
```
- 매개변수, 반환값에 대한 내용 모두 `setTimeout`과 동일하므로 생략
```js
let count = 1;

// 1초(1000ms) 후 타이머가 만료될 때마다 콜백 함수가 호출된다.
// setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
const timeoutId = setInterval(() => {
  console.log(count); // 1 2 3 4 5
  // count가 5이면 setInterval 함수가 반환한 타이머 id를 clearInterval 함수의
  // 인수로 전달하여 타이머를 취소한다. 타이머가 취소되면 setInterval 함수의 콜백 함수가
  // 실행되지 않는다.
  if (count++ === 5) clearInterval(timeoutId);
}, 1000);
```
## 41.3 디바운스와 스로틀
![](https://res.cloudinary.com/practicaldev/image/fetch/s--vx2mKwaL--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ou8jq54ijrn6epvqm6ss.png)[^1]
- 디바운스와 스로틀이란?
	- `scroll`, `resize`, `input`, `mousemove` 같은 이벤트는 짧은 시간 간격으로 연속하여 발생함 → 이러한 이벤트에 바인딩 된 함수(이벤트 핸들러)는 과도하게 호출되어 성능 저하를 일으킬 수 있음
	- **디바운스와 스로틀은 이렇게 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화하여 과도한 함수 호출을 방지하는 매우 유용한 프로그래밍 기법**
	- 이러한 디바운스와 스로틀의 구현하기 위해 타이머 함수 사용
### 41.3.1 디바운스
- 짧은 시간 간격으로 발생하는 이벤트를 그룹화 + **마지막에 한 번만** 이벤트 핸들러 호출(디바운스 함수에 전달된 delay 인수보다 짧은 간격으로 이벤트 발생시 이전 타이머 취소)
- 사용 예시
	1. `resize` 이벤트 처리
	2. `input` 요소에 입력된 값으로 `ajax` 요청하는 입력 필드 자동완성 UI 구현
	3. 버튼 중복 클릭 방지 처리 등
- 실무에서는Underscore, Lodash의 `_.debounce` 함수 사용 권장 ☞ [underscore 디바운스 함수](https://www.geeksforgeeks.org/underscore-_-debounce-function/), [lodash 디바운스 함수](https://www.geeksforgeeks.org/lodash-_-debounce-method/)
```js
// Underscore의 `debounce` 함수 
_.debounce(function, delay, immediate)

// Lodash의 `debounce` 함수
_.debounce(function, delay, options)
```
- 매개변수
	- `function`: 디바운스 되어야 하는 함수
	- `delay`: 생략 가능. 함수 호출이 지연 될 밀리초 단위 시간. 생략시 디폴트 값 0
	- `immediate`: 생략 가능. boolean 값. 디바운스 될 함수를 시퀀스의 끝에서 호출하지 않고, 시퀀스의 초기에 호출하도록 함.
	- `options`: 생략 가능. 메소드의 수행을 바꾸는데 사용 됨. 출처 참고.
- 반환 값
	- 새롭게 디바운스 된 함수를 반환
### 41.3.2 스로틀
- 짧은 시간 간격으로 이벤트가 연속해서 발생해도, 일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출
- 짧은 시간 간격으로 발생하는 이벤트 그룹화 + **delay 시간 주기**로 이벤트 핸들러가 호출되도록 주기 생성(delay 시간이 경과했고, 이벤트가 발생했다? → 콜백 함수 호출 + 새로운 타이머 설정)
- 사용 예시
	1. `scroll` 이벤트 처리
	2. 무한 스크롤 UI 구현 등
- 실무에서는Underscore, Lodash의 `_.debounce` 함수 사용 권장 ☞ [underscore 스로틀 함수](https://www.geeksforgeeks.org/underscore-_-throttle-function/), [lodash 스로틀 함수](https://www.geeksforgeeks.org/lodash-_-throttle-method/?ref=rp)
```js
// Underscore, Lodash의 `throttle` 함수 
_.throttle(function, delay, [option])
```
- 매개변수
	- `function`: 스로틀 되어야 하는 함수
	- `delay`: 생략 가능. 스로틀 될 함수가 호출 될 주기로, 밀리초 단위 시간.
	- `options`: 생략 가능. 메소드의 수행을 바꾸는데 사용 됨. 출처 참고.
- 반환 값
	- 새롭게 스로틀 된 함수를 반환

[^1]: https://dev.to/andreyen/how-to-use-throttle-and-debounce-in-react-app-13af
