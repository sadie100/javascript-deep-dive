
참고:
[40장 예제코드](https://github.com/wikibook/mjs/blob/master/40.md).<br>
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).<br>
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

40 ~ 40.4 by 이은민 (gcount85)

# 40장 이벤트
## 40.1 이벤트 드리븐 프로그래밍
- 브라우저는 처리해야 할 특정 사건이 발생하면, 이를 감지하여 특정 타입의 이벤트를 발생시킴(*event trigger*)
- 처리해야 할 특정 사건이란?: 클릭, 키보드 입력, 마우스 이동 등 
- 이벤트 핸들러: 해당하는 타입의 이벤트가 발생했을 때 **호출될 함수** 
- 이벤트 핸들러 등록: 이벤트가 발생했을 때 앱이 브라우저에게 **이벤트 핸들러(=함수)의 호출을 위임**하는 것("이럴 때 이런 함수를 호출시켜줘") 
	- 이벤트 핸들러 등록을 왜 하는가?
		- 개발자는 언제 이벤트가 발생할 지 알수 없으므로, 명시적으로 함수를 언제 호출해야 할 지 알 수 없음. 
		- 하지만 브라우저는 언제 이벤트가 발생하는지 감시할 수 있음 
		- → 브라우저에게 함수 호출을 위임! 
- 이벤트 드리븐 프로그래밍: 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
    // 버튼 요소의 `onclick` 프로퍼티에 함수 할당 
    $button.onclick = () => { alert('button click'); };
  </script>
</body>
</html>
```

## 40.2 이벤트 타입
- 이벤트 타입: 이벤트의 종류를 나타내는 문자열
- 이벤트 타입에 대한 상세 목록 ☞ [MDN # Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
### 40.2.1 마우스 이벤트
| Event      | Description                                                       |
|------------|-------------------------------------------------------------------|
| click      | 마우스 버튼을 클릭했을 때                                         |
| dbclick    | 마우스 버튼을 더블 클릭했을 때                                    |
| mousedown  | 마우스 버튼을 누르고 있을 때                                      |
| mouseup    | 누르고 있던 마우스 버튼을 뗄 때                                   |
| mousemove  | 마우스를 움직일 때 (터치스크린에서 동작하지 않는다)               |
| mouseover  | 마우스를 요소 위로 움직였을 때 (터치스크린에서 동작하지 않는다)   |
| mouseout   | 마우스를 요소 밖으로 움직였을 때 (터치스크린에서 동작하지 않는다) |
| mouseenter | 마우스를 요소 안으로 움직였을 때 (버블링 되지 않는다) |
| mouseleave |  마우스를 요소 밖으로 움직였을 때 (버블링 되지 않는다) |

### 40.2.2 키보드 이벤트
| Event    | Description            |
|----------|------------------------|
| keydown  | 모든 키를 눌렀을때 발생<br>(※ control, option, shift, tab, delete, enter, 방향 키, 문자, 숫자, 특수문자 키를 눌렀을 때.<br>문자, 숫자, 특수문자, enter 키를 눌렀을 때는 연속적으로 발생하지만, 그 외의 키는 한 번만 발생)    |
| keyup    | 누르고 있던 키를 뗄 때<br>(※ keydown과 마찬가지로 해당 키들을 놓았을 때 발생) |
| keypress | 키를 누르고 뗐을 때(※ depracated!)    |

### 40.2.3 포커스 이벤트
| Event          | Description               |
|----------------|---------------------------|
| focus/focusin  | 요소가 포커스를 얻었을 때(전자는 버블링X, 후자는 버블링O) |
| blur/foucusout | 요소가 포커스를 잃었을 때(전자는 버블링X, 후자는 버블링O) |

### 40.2.4 폼 이벤트, 40.2.5 값 변경 이벤트
| Event  | Description                                                 |
|--------|-------------------------------------------------------------|
| input  | input 또는 textarea 요소의 값이 변경되었을 때               |
| change | select box, checkbox, radio button의 상태가 변경되었을 때   |
| submit | form을 submit할 때 (`submit` 버튼 또는 엔터 키) (※ form 요소에서 발생하는 이벤트)                           |
| reset  | form 요소 내의 reset 버튼을 클릭할 때 (최근에는 사용 안함)                 |
| readystatechange | HTML 문서의 로드와 파싱 상태를 나타내는 `document.readyState` 프로퍼티 값('`loading`', '`interactive`', `complete`)이 변경될 때 |

### 40.2.6 DOM 뮤테이션 이벤트
☞ [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent) are deprecated. [Mutation Observers](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) should be used instead.

### 40.2.7 뷰 이벤트, 40.2.8 리소스 이벤트 ☞ UI 이벤트
| Event  | Description                                                              |
|--------|--------------------------------------------------------------------------|
| load   | 웹페이지의 로드가 완료되었을 때                                          |
| unload | 웹페이지가 언로드될 때(주로 새로운 페이지를 요청한 경우)                 |
| abort | 리소스 로딩이 중단되었을 때 |
| error  | 브라우저가 자바스크립트 오류를 만났거나 요청한 자원이 존재하지 않는 경우 |
| resize | 브라우저 창의 크기를 조절했을 때                                         |
| scroll | 사용자가 페이지를 위아래로 스크롤할 때                                   |
| select | 텍스트를 선택했을 때                                                     |

### 추가) 클립보드 이벤트
| Event | Description            |
|-------|------------------------|
| cut   | 콘텐츠를 잘라내기할 때 |
| copy  | 콘텐츠를 복사할 때     |
| paste | 콘텐츠를 붙여넣기할 때 |

## 40.3 이벤트 핸들러 등록의 3가지 방식
### 40.3.1 이벤트 핸들러 어트리뷰트 방식
- HTML 요소의 어트리뷰트 中 이벤트에 대응하는 **이벤트 핸들러 어트리뷰트**를 이용함 
- 이벤트 핸들러 어트리뷰트 이름: "`on` + 이벤트 타입"으로 이루어짐 (e.g. `onclick`, `onkeydown` 등)
- 이벤트 핸들러 어트리뷰트 값
	- **함수 호출문 등의 문<sub>statement</sub>을 할당**하여 이벤트 핸들러로 등록함(※ 함수 참조가 아닌!) 이때, **함수가 아닌 값을 반환하는 함수 호출문을 할당하면 안됨**. 
	- 이 값은 사실 암묵적으로 생성될 **이벤트 핸들러 함수 몸체를 의미**함 → 여러개의 문을 할당하는 것도 가능
	- 함수 참조를 할당하지 않는 이유는 인수를 쉽게 전달하기 위함 (e.g. `<button onclick="sayHi">Click me!</button>` 같은 경우를 보기)
- 알아둘 필요는 있으나 사용 비권장! 하지만 CBD 방식의 프레임워크/라이브러리(React, Angular, Vue.js, Svelte ...)에서 사용하는 방식이기도 함. 

```js
<!DOCTYPE html>
<html>
<body>
  <button onclick="sayHi('Lee')">Click me!</button>
  <script>
    function sayHi(name) {
      console.log(`Hi! ${name}.`);
    }
  </script>
</body>
</html>
```
- 위의 예제는 사실 다음과 같은 함수를 암묵적으로 생성하는 것!!
```js
// 이벤트 핸들러 어트리뷰트 이름(=onclick)과 동일한 onclick 이벤트 핸들러 프로퍼티에 할당되는 암묵적인 함수 
function onclick(event) {
  sayHi('Lee');
}
```

### 40.3.2 이벤트 핸들러 프로퍼티 방식
- 이벤트 핸들러 프로퍼티의 키: "`on` + 이벤트 타입"으로 이루어짐 (e.g. `onclick`, `onkeydown` 등)
- 이벤트 핸들러 등록하는 법: 이벤트 핸들러 프로퍼티에 함수를 바인딩
<br>![](https://velog.velcdn.com/images/cold_he22/post/d5bb2f97-4140-4866-b276-b4bd98481c9c/image.png) [^1]
- 용어 정리
	 - 이벤트 타깃: 이벤트를 발생시킬 객체 
	- 이벤트 타입: 이벤트의 종류를 나타내는 문자열
	- 이벤트 핸들러:  호출할 함수 
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');
    // ※ 식별자에 사용되는 달러($) 기호:
    // `document.getElementById()` 대신 아이디 값처럼 단일한 변수를 표시
    // 번거롭게 `document.getElementById()`를 사용하는 것 대신 
    // 변수명으로 사용도가 낮은 `$`를 변수명 앞에 붙여 다른 변수와 충돌이 일어나지 않도록 하기 위함

    // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
    $button.onclick = function () {
      console.log('button click');
    };
  </script>
</body>
</html>
```
- 이벤트 핸들러는 대부분 이벤트 타깃에 바인딩함 but 전파된 이벤트를 캐치할 DOM 노드 객체에도 바인딩함 ☞ 40.6절 "이벤트 전파", 40.7절 "이벤트 위임"
- *이벤트 핸들러 어트리뷰트 방식*도 결국 DOM 노드 객체의 이벤트 핸들러 프로퍼티로 변환되므로, 결과적으로 이 방식임 ==????==
- 장점: 이벤트 핸들러 어트리뷰트 방식에서 있었던 HTML과 JS가 뒤섞이는 문제 해결
- 단점: 이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만 바인딩할 수 있음 
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다.
    // 첫 번째로 바인딩된 이벤트 핸들러는 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어
    // 실행되지 않는다.
    $button.onclick = function () {
      console.log('Button clicked 1');
    };

    // 두 번째로 바인딩된 이벤트 핸들러
    $button.onclick = function () {
      console.log('Button clicked 2');
    };
  </script>
</body>
</html>
```

### 40.3.3 `addEventListener` 메서드 방식
- `addEventListener` 메소드를 이용하여 대상 DOM 요소에 이벤트를 바인딩 + 해당 이벤트가 발생했을 때 실행될 콜백 함수(이벤트 핸들러)를 지정 
![](https://poiemaweb.com/img/event_listener.png)[^2]
- 이벤트 타입: 다른 방식들과 달리 `on` 접두사를 붙이지 않음! 
- `useCapture`: 이벤트를 캐치할 이벤트 전파 단계(캡쳐링 또는 버블링)을 지정 ☞ 40.6절 "이벤트 전파"

```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티 방식
    // $button.onclick = function () {
    //   console.log('button click');
    // };

    // addEventListener 메서드 방식 (※ 위의 방식과 비교해보기)
    $button.addEventListener('click', function () {
      console.log('button click');
    });
  </script>
</body>
</html>
```

- 만일 이벤트 핸들러 프로퍼티 방식과, `addEventListener` 메소드 방식을 동시에 사용한다면?
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티 방식
    $button.onclick = function () {
      console.log('[이벤트 핸들러 프로퍼티 방식]button click');
    };

    // addEventListener 메서드 방식 (※ 두 개의 이벤트 핸들러가 모두 호출됨!)
    $button.addEventListener('click', function () {
      console.log('[addEventListener 메서드 방식]button click');
    });
  </script>
</body>
</html>
```

- `addEventListener` 메서드 방식은 이벤트 핸들러 프로퍼티 방식으로 바인딩된 이벤트 핸들러에 영향 X → 버튼 클릭 이벤트가 발생했을 때 2개의 이벤트 핸들러가 등록한 순서대로 모두 호출 됨.
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // addEventListener 메서드는 동일한 요소에서 발생한 동일한 이벤트에 대해
    // 하나 이상의 이벤트 핸들러를 등록할 수 있다.
    $button.addEventListener('click', function () {
      console.log('[1]button click');
    });

    $button.addEventListener('click', function () {
      console.log('[2]button click');
    });
  </script>
</body>
</html>
```

- 단 함수 참조가 동일한 이벤트 핸들러를 등록하면 하나의 핸들러만 등록 됨 
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 핸들러만 등록된다.
    $button.addEventListener('click', handleClick);
    $button.addEventListener('click', handleClick);
  </script>
</body>
</html>
```

## 40.4 이벤트 핸들러 제거

- `removeEventListener` 메서드 이용. 
- `addEventListener`에 전달한 인수와 동일하게 맞출 것
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 이벤트 핸들러 등록
    $button.addEventListener('click', handleClick);

    // 이벤트 핸들러 제거
    // addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
    // 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
    $button.removeEventListener('click', handleClick, true); // 실패
    $button.removeEventListener('click', handleClick); // 성공
  </script>
</body>
</html>
```

- 무명 함수 ❌ → 이벤트 핸들러의 참조(=함수)를 변수나 자료구조에 저장해야 함.  
```js
// 이벤트 핸들러 등록
$button.addEventListener('click', () => console.log('button click'));
// 등록한 이벤트 핸들러를 참조할 수 없으므로 제거할 수 없다.
```

- 기명 함수 내부에서 `removeEventListener` 메서드를 호출하여 이벤트 핸들러를 제거할 수 있음 
```js
// 기명 함수를 이벤트 핸들러로 등록
$button.addEventListener('click', function foo() {
  console.log('button click');
  // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
  $button.removeEventListener('click', foo);
});
```

- 무기명 함수 내부에서 `removeEventListener` 메서드를 호출하되 `argument.callee`를 사용하여 함수 자기 자신을 가리키도록 해서 이벤트 핸들러를 제거할 수 있음 → 비권장!
```js
// 무명 함수를 이벤트 핸들러로 등록
$button.addEventListener('click', function () {
  console.log('button click');
  // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
  // arguments.callee는 호출된 함수, 즉 함수 자신을 가리킨다.
  $button.removeEventListener('click', arguments.callee);
});
```

- 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러는 해당 메서드로 제거할 수 없음. 
- 이때는 `null`을 할당해 제거하도록 함. 
```js
<!DOCTYPE html>
<html>
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    const handleClick = () => console.log('button click');

    // 이벤트 핸들러 프로퍼티 방식으로 이벤트 핸들러 등록
    $button.onclick = handleClick;

    // removeEventListener 메서드로 이벤트 핸들러를 제거할 수 없다.
    $button.removeEventListener('click', handleClick);

    // 이벤트 핸들러 프로퍼티에 null을 할당하여 이벤트 핸들러를 제거한다.
    $button.onclick = null;
  </script>
</body>
</html>
```











[^1]: https://velog.io/@cold_he22/%EC%9D%B4%EB%B2%A4%ED%8A%B8
[^2]: https://poiemaweb.com/js-event