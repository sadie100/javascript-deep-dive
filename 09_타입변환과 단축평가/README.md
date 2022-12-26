참고: 
[9장 예제코드](https://github.com/wikibook/mjs/blob/master/09.md).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020. 

9.1~ 9.3 by 이은민 (gcount85)

# 09장 타입 변환과 단축 평가 

## 9.1 타입 변환이란?
- 자바스크립트의 값의 타입은 다른 타입으로 변환할 수 있음 
- **명시적 타입 변환<sub>explicit coercion</sub>, 타입 캐스팅<sub>type casting</sub>**: 의도적으로 값의 타입을 변환하는 것
```js
let x = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
let str = x.toString();
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```
- **암묵적 타입 변환<sub>implicit coercion</sub>, 타입 강제 변환<sub>type coercion</sub>**: 개발자의 의도와 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환된 것 
```JS
let x = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 x의 값을 바탕으로 새로운 문자열을 생성한다.
// *이때 새로 생성된 문자열 '10'은 x 변수에 재할당 되지 않는다*
let str = x + '';
console.log(typeof str, str); // string 10

// x 변수의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number 10
```
- 타입 변환의 특징
	1. 기존 원시 값(예제의 경우 x 변수의 값)을 직접 변경하지 않음 → 원시 값은 <sub>immutable value</sub>이므로 변경할 수 없음
	2. 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 **생성**하는 것(단 한번 만들어서 버린다)
	3. 암묵적 타입 변환은 기존 변수 값을 재할당하여 변경하지 않는다! 
	4. 암묵적 타입 변환을 **예측하지 못하면** 오류를 야기할 수 있다 

## 9.2 암묵적 타입 변환
- 코드의 문맥을 고려하여 암묵적 타입 변환을 사용할 수 있음 
```JS
// 암묵적 타입 변환의 예

// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // -> '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // -> 50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0 // -> true
if (1) { }
```
- 암묵적 타입 변환은 **문자열, 숫자, 불리언** 같은 원시 타입 중 하나로 타입을 자동 변환 

### 9.2.1 문자열 타입으로 변환
- **`+` 연산자**는 피연산자 중 하나가 문자열이라면, 문자열 연결 연산자로 동작함 → 문자열 값을 만들어 냄 
- 문자열 연결 연산자는 문자열 타입이 아닌 피연산자를 **문자열 타입**으로 암묵적 타입 변환 시킴 
```js
// 문자열 연결 연산자 `+`는 문자열 타입이 아닌 피연산자를 문자열 타입으로 바꾼다! 

// 숫자 타입
0 + ''         // -> "0"
-0 + ''        // -> "0"
1 + ''         // -> "1"
-1 + ''        // -> "-1"
NaN + ''       // -> "NaN"
Infinity + ''  // -> "Infinity"
-Infinity + '' // -> "-Infinity"

// 불리언 타입
true + ''  // -> "true"
false + '' // -> "false"

// null 타입
null + '' // -> "null"

// undefined 타입
undefined + '' // -> "undefined"

// 심벌 타입 *Symbol 타입은 문자열로 변환할 수 없다*
(Symbol()) + '' // -> TypeError: Cannot convert a Symbol value to a string

// 객체 타입 
({}) + ''           // -> "[object Object]"
Math + ''           // -> "[object Math]"
[] + ''             // -> ""
[10, 20] + ''       // -> "10,20"
(function(){}) + '' // -> "function(){}" *감싸주는 괄호 없으면 에러*
Array + ''          // -> "function Array() { [native code] }"
```
==객체 타입의 저 문구들은 뭘까 ?! ==

### 9.2.2 숫자 타입으로 변환
- **산술 연산자**는 숫자 값을 만드므로, 산술 연산자의 피연산자는 모두 숫자 타입으로 암묵적 타입 변환
- 만약 피연산자를 숫자 타입으로 변환할 수 없는 경우, 산술 연산을 수행할 수 없음 → 표현식의 평과 결과 `NaN` 
	- 빈 문자열 `''`, 빈 배열 `[]`, `null`, `false` → `0`
	- 객체, 빈 배열이 아닌 배열, `undefined` → `NaN`
```JS
// 산술 연산자는 피연산자를 숫자 타입으로 암묵적 타입 변환
1 - '1'   // -> 0
1 * '10'  // -> 10
1 / 'one' // -> NaN
```
- **비교 연산자**는 불리언 값을 만드므로, 비교 연산자의 피연산자는 모두 숫자 타입으로 암묵적 타입 변환 
```JS
// 비교 연산자는 피연산자를 숫자 타입으로 암묵적 타입 변환
'1' > 0  // -> true
```
- **`+` 단항 연산자**는 피연산자가 숫자 타입이 아니면, 피연산자를 숫자 타입으로 암묵적 타입 변환
```JS
// `+` 단항 연산자는 피연산자를 숫자 타입으로 암묵적 타입 변환
// 문자열 타입
+''       // -> 0 *빈 문자열은 0으로 변환*
+'0'      // -> 0
+'1'      // -> 1
+'string' // -> NaN

// 불리언 타입
+true     // -> 1 *true는 1으로 변환*
+false    // -> 0 *false는 0으로 변환*

// null 타입
+null     // -> 0 *null은 0으로 변환*

// undefined 타입 
+undefined // -> NaN

// 심벌 타입 *Symbol 타입은 숫자로 변환할 수 없다*
+Symbol() // -> TypeError: Cannot convert a Symbol value to a number

// 객체 타입 
+{}             // -> NaN
+[]             // -> 0 *빈 배열은 0으로 변환*
+[10, 20]       // -> NaN
+(function(){}) // -> NaN
```


### 9.2.3 불리언 타입으로 변환
- **`if`문, `for`문, 삼항 조건 연산자**의 조건식은 불리언 값으로 평가되어야 하는 표현식임
- 자바스크립트엔진은 이런 조건식의 평과 결과를 불리언 타입으로 암묵적 타입 변환
```JS
// 조건식이 true인 경우 코드 블록 실행
if ('')    console.log('1'); // false
if (true)  console.log('2'); // true
if (0)     console.log('3'); // false
if ('str') console.log('4'); // true
if (null)  console.log('5'); // false

// 2 4
```
- **자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy 값(참으로 평가되는 값) 혹은 Falsy 값(거짓으로 평가되는 값)으로 구분함**
	- Falsy 값
		1. `false`
		2. `undefined`
		3. `null`
		4. `0`, `-0` ==-0은 뭐에다 쓸까? 실제로 자주 사용하나==
		5. `NaN`
		6. 빈 문자열 `''` 
	- **Falsy 값 외의 모든 값**은 모두 `true`로 평가된다
		1. `true`
		2. 빈 문자열이 아닌 문자열; e.g. `'0'` , `'x'`
		3. 객체; `{}`
		4. 빈 배열; `[]` 
- `isFalsy(인수)`, `isTruthy(인수)`: `true`인지 `false`인지 값을 판별하는 함수 
```JS
// 전달받은 인수가 Falsy 값이면 true, Truthy 값이면 false를 반환한다.
function isFalsy(v) {
  return !v;
}

// 전달받은 인수가 Truthy 값이면 true, Falsy 값이면 false를 반환한다.
function isTruthy(v) {
  return !!v;
}

// 모두 true를 반환한다.
isFalsy(false);
isFalsy(undefined);
isFalsy(null);
isFalsy(0);
isFalsy(NaN);
isFalsy('');

// 모두 true를 반환한다.
isTruthy(true);
isTruthy('0'); // 빈 문자열이 아닌 문자열은 Truthy 값이다.
isTruthy({});
isTruthy([]);
```

## 9.3 명시적 타입 변환 
- 개발자의 의도에 따라 명시적으로 값의 타입을 변환하는 것
- 명시적 타입 변환 방법
	1. 자바스크립트가 기본 제공하는 표준 빌트인 생성자 함수(`String`, `Number`, `Boolean`)를 `new` 연산자 없이 호출하는 방법
		- 표준 빌트인 생성자 함수란? 객체를 생성하기 위한 함수로 `new` 연산자와 함께 호출. ==new 연산자 ????==
	2. 자바스크립트가 기본 제공하는 빌트인 메서드를 사용하기 ☞ 21장 "빌트인 객체"
	3. 암묵적 타입 변환을 이용하기
### 9.3.1 문자열 타입으로 변환
1. `String` 생성자 함수를 `new` 연산자 없이 호출하기
2. `Object.prototype.toString` 메서드 사용하기
3. 문자열 연결 연산자 이용하기 
```JS
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"
// 불리언 타입 => 문자열 타입
String(true);     // -> "true"
String(false);    // -> "false"

// 2. Object.prototype.toString 메서드를 사용하는 방법
// 숫자 타입 => 문자열 타입
(1).toString();        // -> "1"
(NaN).toString();      // -> "NaN"
(Infinity).toString(); // -> "Infinity"
// 불리언 타입 => 문자열 타입
(true).toString();     // -> "true"
(false).toString();    // -> "false"

// 3. 암묵적 타입 변환; 문자열 연결 연산자를 이용하는 방법
// 숫자 타입 => 문자열 타입
1 + '';        // -> "1"
NaN + '';      // -> "NaN"
Infinity + ''; // -> "Infinity"
// 불리언 타입 => 문자열 타입
true + '';     // -> "true"
false + '';    // -> "false"
```

### 9.3.2 숫자 타입으로 변환
1. `Number` 생성자 함수를 `new` 연산자 없이 호출하는 방법
2. `parseInt`, `parseFloat` 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
3. `+`, `-` 단항 산술 연산자 이용하기 ==- 추가==
4. `*` 산술 연산자 이용하기

```JS
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
Number('0');     // -> 0
Number('-1');    // -> -1
Number('10.53'); // -> 10.53
// 불리언 타입 => 숫자 타입
Number(true);    // -> 1
Number(false);   // -> 0

// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
parseInt('0');       // -> 0
parseInt('-1');      // -> -1
parseFloat('10.53'); // -> 10.53

// 3. 암묵적 타입 변환; + 단항 산술 연산자를 이용하는 방법 (이항 연산을 하면 *문자열*로 변환!)
// 문자열 타입 => 숫자 타입
+'0';     // -> 0
+'-1';    // -> -1
+'10.53'; // -> 10.53
// 불리언 타입 => 숫자 타입
+true;    // -> 1
+false;   // -> 0

// 4. * 산술 연산자를 이용하는 방법 
// 문자열 타입 => 숫자 타입
'0' * 1;     // -> 0
'-1' * 1;    // -> -1
'10.53' * 1; // -> 10.53
// 불리언 타입 => 숫자 타입
true * 1;    // -> 1
false * 1;   // -> 0
```

### 9.3.3 불리언 타입으로 변환
1. `Boolean` 생성자 함수를 `new` 연산자 없이 호출하기
2. `!` 부정 논리 연산자를 두 번 사용하기 (이중 부정 → 긍정)
```JS
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
Boolean('x');       // -> true
Boolean('');        // -> false
Boolean('false');   // -> true
// 숫자 타입 => 불리언 타입
Boolean(0);         // -> false
Boolean(1);         // -> true
Boolean(NaN);       // -> false
Boolean(Infinity);  // -> true
// null 타입 => 불리언 타입
Boolean(null);      // -> false
// undefined 타입 => 불리언 타입
Boolean(undefined); // -> false
// 객체 타입 => 불리언 타입
Boolean({});        // -> true
Boolean([]);        // -> true

// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
!!'0';       // -> true *값이 있는 문자열은 true이다*
!!'';        // -> false *빈 문자열은 false이다*
!!'false';   // -> true
// 숫자 타입 => 불리언 타입
!!0;         // -> false
!!1;         // -> true
!!NaN;       // -> false
!!Infinity;  // -> true
!!-Infinity;  // -> true
// null 타입 => 불리언 타입
!!null;      // -> false
// undefined 타입 => 불리언 타입
!!undefined; // -> false
// 객체 타입 => 불리언 타입
!!{};        // -> true *비어있는 객체는 true다*
!![];        // -> true
```

