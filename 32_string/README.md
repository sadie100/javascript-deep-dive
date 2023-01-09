# String

- 표준 빌트인 객체인 String은 원시 타립인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다.

## 32.1 String 생성자 함수

- 표준 빌트인 객체인 String 객체는 생성자 함수 객체다. 따라서 new 연산자와 함께 호출하여 String 인스턴스를 생성 할 수 있다.
- String 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성한다.

```jsx
const strObj = new String();
console.log(strObj); // String {length: 0, [[PrimitiveValue]]: ""}
```

## 32.2 length 프로퍼티

- length 프로퍼티는 문자열의 문자 개수를 반환한다.

```jsx
'Hello'.length; // 5
'안녕하세요!'.length; // 6
```

## 32.3 String 메서드

- 배열에는 원본 배열을 직접 변경하는 메서드와 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.
- String 객체의 메서드는 언제나 새로운 문자열을 반환한다. 문자열은 변경 불가능한 원시 값이기 때문에 **String 래퍼 객체도 읽기 전용 객체로 제공된다**

### 32.3.1 String.prototype.indexOf

- indexOf 메서드는 대상 문자열에서 인수로 전달받은 문자열을 검색하여 첫 번째 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.

```jsx
const str = 'Hello World';

str.indexOf('l'); // 2
str.indexOf('x'); // -1
```

- ES6에서 도입된 **String.prototype.includes** 메서드를 사용하면 가독성이 더 좋다.

```jsx
if (str.includes('Hello')) {
  // 문자열 str에 'Hello'가 포함되어 있는 경우에 처리할 내용
}
```

## 32.3.2 String.prototype.search

- search 메서드는 대상 문자열에서 인수로 전달받은 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.

```jsx
const str = 'Hello world';

// 문자열 str에서 정규 표현식과 매치하는 문자열을 검색하여 일치하는 문자열의 인덱스를 반환한다.
str.search(/0/); // 4
str.search(/x/); // -1
```

## 32.3.3 String.prototype.includes

- ES6에서 도입된 includes 메서드는 대상 문자열에 인수로 전달받은 문자열이 포함되어 있는지 확인하여 그 결과를 true 또는 false 로 반환한다.

```jsx
const str = 'Hello world';

str.includes('Hello'); // true
```

## 32.3.4 String.prototype.startsWith

- ES6에서 도입된 startsWith 메서드는 대상 문자열이 인수로 전달받은 문자열로 시작하는지 확인하여 그 결과를 true 또는 false로 반환한다.

```jsx
const str = 'Hello world';

// 문자열 str이 'He'로 시작하는지 확인
str.startsWith('He'); // true
str.startsWith('x'); // false
```

## 32.3.5 String.prototype.endsWith

- ES6에서 도입된 endsWith 메서드는 대상 문자열이 인수로 전달받은 문자열로 끝나는지 확인하여 그 결과를 true 또는 false 로 반환한다.

```jsx
const str = 'Hello world';

//문자열 str이 'ld'로 끝나는지 확인
str.endsWith('ld'); // true
```

## 32.3.6 String.prototype.charAt

- charAt 메서드는 대상 문자열에서 인수로 전달받은 인덱스에 위치한 문자를 검색하여 반환한다.

```jsx
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
	console.log(str.charAt(i)); // H e l l o
}
```

## 32.3.7 String.prototype.substring

- substring 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 인덱스에 위치하는 문자부터 두 번째 인수로 전달받은 인덱스에 위치하는 문자의 바로 이전 문자까지의 부분 문자열을 반환한다.

```jsx
const str = 'Hello world';

// 인덱스 1부터 인덱스 4 이전까지의 부분 문자열을 반환한다.
str.substring(1, 4); // ell
```

## 32.3.8 String.prototype.slice

- slice 메서드는 substring 메서드와 동일하게 동작한다. 단, slice 메서드에는 음수인 인수를 전달할 수 있다.

## 32.3.9 String.prototype.toUpperCase

- toUpperCase 메서드는 대상 문자열을 모두 대문자로 변경한 문자열을 반환한다.

## 32.3.10 String.prototype.toLowerCase

- toLowerCase 메서드는 대상 문자열을 모두 소문자로 변경한 문자열을 반환한다.

## 32.3.11 String.prototype.trim

- trim 메서드는 대상 문자열 앞뒤에 공백 문자가 있을 경우 이를 제거한 문자열을 반환한다.

```jsx
const str = '    foo   ';
str.trim(); // 'foo'
```

## 32.3.12 STring.prototype.repeat

- ES6에서 도입된 repeat 메서드는 대상 문자열을 인수로 전달받은 정수만큼 반복해 연결한 새로운 문자열을 반환한다.

## 32.3.13 String.prototype.replace

- replace 메서드는 대상 문자열에서 첫 번째 인수로 전달받은 문자열 또는 정규표현식을 검색하여 두 번째 인수로 전달한 문자열로 치환한 문자열을 반환한다.

```jsx
const str = 'Hello world';

// str에서 첫 번째 인수 'world'를 검색하여 두 번째 인수로 'Lee'로 치환한다.
str. replace('world', 'Lee'); // 'Hello Lee '
```

## 32.3.14 String.prototype.split

- split 메서드는 대상 문자열에서 첫 번째 인수로 전달한 문자열 또는 정규 표현식을 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 배열을 반환한다.