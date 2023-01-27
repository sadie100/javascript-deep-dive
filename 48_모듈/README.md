참고:
[48장 예제코드](https://github.com/wikibook/mjs/blob/master/48.md).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

48.3 ~ 48장 끝 by 이은민 (gcount85)

# 48장. 모듈

## 48.3 ES6 모듈(ESM)
```html
<!-- src="모듈파일명.mjs" -->
<script type="module" src="app.mjs"></script>
```
- ES6에서는 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능 추가 됨
- `script` 태그에 `type="module"` 어트리뷰트를 추가하여 `src="모듈파일명.mjs"` 처럼 로드
- 확장자를 `mjs`로 사용하여 일반 JS 파일과 구분! 
- ESM 파일은 클래스와 마찬가지로 strict mode 적용 
### 48.3.1 모듈 스코프
- ESM은 독자적인 모듈 스코프 ⭕
- 일반 자바스크립트 파일은 ❌ -> 각기 다른 파일에서 선언 된 전역 변수라도, 변수명이 같으면 한 파일 내의 같은 변수처럼 동작함! 
```js
// foo.mjs 파일 내부 

// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
let x = 'foo';
console.log(x); // foo
console.log(window.x); // undefined
```
- 위의 foo.mjs 에서 선언한 변수 `x`를 다른 모듈 파일에서 동일한 변수명으로 선언해도 각기 다른 변수로 동작함 → 모듈 스코프가 다르기 때문!
```js
// bar.mjs 파일 내부 

// x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
// foo.mjs에서 선언한 x 변수와 스코프가 다른 변수다.
let x = 'bar';
console.log(x); // bar
console.log(window.x); // undefined
```
### 48.3.2 `export` 키워드
- 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하기 위한 키워드 
- 변수, 함수, 클래스 등 모든 식별자 가능 
```js
// lib.mjs 파일 내부 

// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
  return x * x;
}

// 클래스의 공개
export class Person {
  constructor(name) {
    this.name = name;
  }
}
```
- 혹은 아래처럼 객체로 묶어서 `export` 가능
```js
// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

### 48.3.3 `import` 키워드
- 다른 모듈에서 export한 식별자를 나의 모듈 스코프 내부로 불러오기 위한 키워드
- export 한 식별자 이름으로 import 해야 함
- ESM 파일 확장자 생략 ❌
```js
// app.mjs 파일 내부 

// 같은 폴더 내의 lib.mjs 모듈이 export한 식별자 이름으로 import
// ESM의 경우 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib.mjs';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```
- 혹은 아래처럼 별칭을 사용하여 모든 export 식별자 호출 가능
```js
// app.mjs
// lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import
import * as lib from './lib.mjs';

console.log(lib.pi);         // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
```
- 각각의 식별자에 별칭 지정도 가능 
```js
// app.mjs
// lib.mjs 모듈이 export한 식별자 이름에 각각 별칭을 지정해 import
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(PI);    // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Kim')); // Person { name: 'Kim' }
```
- `default` 키워드는 모듈에서 하나의 값만 export 할 때 사용
- `var`, `let`, `const` 키워드와 함께 사용 불가 
```js
// lib.mjs
export default x => x * x;

// 아래처럼 `var`, `let`, `const` 키워드와 같이 사용 불가
export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
// export default () => {};
```
- `default` 키워드로 export 한 모듈은 `{}` 없이 아무 이름으로 import 함 
```js
// app.mjs
import square from './lib.mjs';

console.log(square(3)); // 9
```
