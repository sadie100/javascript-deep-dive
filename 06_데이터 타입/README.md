참고: 
[6장 예제코드](https://github.com/wikibook/mjs/blob/master/06.md)
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020. 

6.1~6.7 by 이은민 (gcount85)

# 6장 데이터 타입
1. 데이터 타입이란 "값의 종류"
2. 자바스크립트의 7가지 데이터 타입 분류
	- 원시 타입<sub>primitive type</sub>
		- 숫자 타입 : 숫자, 정수와 실수 구분 없이 하나의 숫자 타입만 존재
		- 문자열 타입 
		- 불리언 타입 : `true`, `false`
		- `undefined` 타입 : `var` 키워드로 선언된 변수의 암묵적으로 할당되는 값(초기화 값)
		- `null` 타입 : 값이 없다는 것을 의도적으로 명시 
		- 심벌<sub>symbol</sub> 타입 : ES6에서 추가된 7번째 타입 
	- 객체 타입<sub>object/reference type</sub>
		- 객체, 함수, 배열 등 
3. 데이터 타입을 왜 구분하는가? ⇒ <mark style="background: #FFB8EBA6;">각각의 타입마다 목적과 용도가 다르다</mark> ⇒ 개발자는 명확한 의도로 타입을 구별하여 값을 생성한다
	- 숫자 1과 문자열 1은 다르다 → 숫자는 산술, 문자열은 출력 
	- 확보해야 할 메모리 공간 크기 다름 
	- 메모리에 저장되는 2진수도 다르고, 읽어 들여 해석하는 방식 다름 

## 6.1 숫자 타입
- 다른 언어와 달리, 자바스크립트는 <mark style="background: #FFB8EBA6;">하나의 숫자 타입</mark>만 존재 ☞ <mark style="background: #FFB8EBA6;">64비트 부동소수점 형식</mark>
- 즉, <mark style="background: #FFB8EBA6;">모든 수는 실수</mark>
```JS
// 모두 숫자 타입이다.
var integer = 10;    // 정수
var double = 10.12;  // 실수
var negative = -20;  // 음의 정수
```

- 정수, 실수, 2진수, 8진수, 16진수 모두 64비트 부동소수점 2진수로 메모리에 저장 
- 10진수 표현만 지원하기에 값을 참조할 경우, <mark style="background: #FFB8EBA6;">모두 10진수로 해석</mark>
```JS
var binary = 0b01000001; // 2진수
var octal = 0o101;       // 8진수
var hex = 0x41;          // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
console.log(binary === octal); // true
console.log(octal === hex);    // true
```

- 숫자 타입의 특별한 세 가지 값 표현
	1. `Infinity` : 양의 무한대
	2. `-Infinity` : 음의 무한대
	3. `NaN` : 산술 연산 불가(not-a-number) **(※ 대소문자 구별 주의)**

```JS
// 숫자 타입의 세 가지 특별한 값
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN
```

## 6.2 문자열 타입

- 문자열이란? 0개 이상의 16비트 유니코드 문자의 집합 
- 즉, 텍스트 데이터를 나타내는 타입 
- `''`, `""`, `｀｀`(백틱)으로 텍스트를 감싸서 **변수, 식별자와 구분하여** 표현하며, 일반적으로 `''` 사용 
- JS의 문자열은 원시 타입이며, 변경 불가능한 값<sub>immutable value</sub> ⇒ <mark style="background: #FFB8EBA6;">문자열이 생성되면 그 문자열을 변경할 수 없다</mark> ☞ 11.1.2절 "문자열과 불변성" 참고

```JS
// 문자열 타입
var string;
string = '문자열'; // 작은따옴표
string = "문자열"; // 큰따옴표
string = `문자열`; // 백틱 (ES6)

string = '작은따옴표로 감싼 문자열 내의 "큰따옴표"는 문자열로 인식된다.';
string = "큰따옴표로 감싼 문자열 내의 '작은따옴표'는 문자열로 인식된다.";
```

## 6.3 템플릿 리터럴
- 템플릿 리터럴이란?
	1. 편리한 문자열 처리 기능을 제공하는 새로운 문자열 표기법
	2. 멀티라인 문자열<sub>multi-line string</sub>, 표현식 삽입<sub>expression interpolation</sub>, 태그드 템플릿<sub>tagged template</sub> 등 
	3. 런타임에 일반 문자열로 변환되어 처리됨 
	4. <mark style="background: #FFB8EBA6;">백틱(``)</mark>을 사용하여 표현 

### 6.3.1 멀티라인 문자열
- 멀티라인 문자열이란?
	- 줄바꿈을 쉽게 해주는 문자열 표기법
- 일반 문자열 줄바꿈 ☞ 아래와 같은 이스케이프 시퀀스를 이용! 

|  시퀀스 |  의미 |
| --- | --- |
|  `\0` |  NULL문자 |
|  `\b` |  백 스페이스 |
|  `\f` |  폼 피드<sub>form feed</sub>: 프린터로 출력할 경우 다음 페이지의 시작 점으로 이동 |
|  `\n` |  개행: 다음 행으로 이동 |
|  `\r` |  개행: 커서를 처음으로 이동(거의 사용X) |
|  `\t` |  수평 탭 |
|  `\v` |  수직 탭 |
|  `\uXXXX` |  4글자 XXXX(16진수)가 표시된 Unicode 문자 |
|  `\'` |  작은 따옴표 |
|  `\"` |  큰 따옴표 |
|  `\\` |  \ (백슬래시) 표현 |

- 이스케이프 시퀀스 사용 예시
```JS
// \n, \t 사용 
var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';

console.log(template);
/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/
```

- 템플릿 리터럴에서 줄바꿈을 표시하는 방법 
```JS
// 백틱을 사용하여 줄바꿈 표현 
var template = `<ul>   
  <li><a href="#">Home</a></li>
</ul>`;

console.log(template);

/*
<ul>
  <li><a href="#">Home</a></li>
</ul>
*/
```

### 6.3.2 표현식 삽입
- 문자열 연산, 문자열 연결을 편리하게 사용할 수 있게 해주는 표기법 
- 문자열은 문자열 연산자 `+`를 사용해 연결할 수 있음 ☞ 7.1.3절 "문자열 연결 연산자" 참고
- `+` 연산자는 피연산자 중 하나 이상이 문자열이면 **문자열 연결 연산자**로 동작, 그 외에는 **덧셈 연산자**로 동작
	- 문자열 연결 연산자 `+` 를 이용하여 두 문자열을 연결하기 예시 
```JS
var first = 'Ung-mo';
var last = 'Lee';

// ES5: 문자열 연결 → 작은 따옴표('') 사용하였음
console.log('My name is ' + first + ' ' + last + '.'); // My name is Ung-mo Lee.
```
- 템플릿 리터럴 `${}`을 이용하여 간단히 문자열을 삽입하며, 표현식의 평과 결과가 문자열이 아니어도 강제로 문자열로 타입 변환 됨 
	- 백틱과 `${}`을 사용하여 문자열 삽입 예시 
```JS
var first = 'Ung-mo';
var last = 'Lee';

// ES6: 표현식 삽입 → 백틱(``)을 사용하였음 
console.log(`My name is ${first} ${last}.`); // My name is Ung-mo Lee.
```

```JS
// 표현식의 평과 결과 3은 문자열로 타입 변환 됨 
console.log(`1 + 2 = ${1 + 2}`); // 1 + 2 = 3
```

## 6.4 불리언 타입
- `true`, `false` 두 값이 유일함 
- 조건문에서 자주 사용 
```JS
var foo = true;
console.log(foo); // true

foo = false;
console.log(foo); // false
```


## 6.5 undefined 타입
- `undefined`가 유일한 값 
- `var` 키워드로 선언한 변수의 값은 `undefined`로 초기화 되어있다 (즉, 쓰레기 값을 JS 엔진이 `undefined`로 초기화 해놓는다) → 따라서 혼란 방지를 위해 이 값을 의도적으로 변수에 할당하지 않도록 한다!
```JS
var foo; // 변수를 선언만 하고 값을 할당하지 않은 상태 
console.log(foo); // undefined
```

## 6.6 null 타입
1. `null`이 유일한 값 **(※ 대소문자 주의!)**
2. `null`이 사용되는 경우 
	1. `null`은 변수에 값이 없다는 것을 "의도적으로 명시"할 때 → 즉, 이전에 참조하던 값을 더 이상 참조하지 않으려고 할 때
	```JS
	var foo = 'Lee';
	
	// 이전에 할당되어 있던 값에 대한 참조를 제거. foo 변수는 더 이상 'Lee'를 참조하지 않는다.
	// 유용해 보이지는 않는다. 변수의 스코프를 좁게 만들어 변수 자체를 재빨리 소멸시키는 편이 낫다.
	foo = null;
	```
	2. 함수가 유효한 값을 반환할 수 없는 경우에 `null` 반환 
	```JS
	<!DOCTYPE html>
	<html>
	<body>
	  <script>
	    var element = document.querySelector('.myClass');
	
	    // HTML 문서에 myClass 클래스를 갖는 요소가 없다면 null을 반환한다.
	    console.log(element); // null
	  </script>
	</body>
	</html>
	
	```

## 6.7 심벌 타입
1. 심벌 타입이란? ☞ 33장 참고
	- 원시 타입이며, 변경 불가능함. 다른 값과 중복되지 않는 유일무이한 값  
2. 심벌 타입을 왜 사용하는가? 
	- 유일무이한 값이므로 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용 ==실제로 많이 사용하는가???==
3. 심벌 타입 생성
	- `Symbol` 함수를 호출해 심벌 값을 생성함 
	- 이때 생성된 심벌 값은 외부에 노출되지 않으며, 다른 값과 절대 중복되지 않는 유일무이한 값 ==해쉬같은 거???==
```JS
// 심벌 값 생성
var key = Symbol('key');
console.log(typeof key); // symbol

// 객체 생성
var obj = {};

// 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value
```
