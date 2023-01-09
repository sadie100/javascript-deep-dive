
참고:
[30장 예제코드](https://github.com/wikibook/mjs/blob/master/30.md).
[웹 프로그래밍 튜토리얼 | Poiemaweb](https://poiemaweb.com/).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

30 ~ 30.2.21장 by 이은민 (gcount85)

# 30장 Date
- UTC: 국제 표준시
- KST: 한국 표준시로, UTC + 9시간
- 현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 결정
## 30.1 `Date` 생성자 함수
- `Date` 객체는 내부적으로 1970년 1월 1일 0시 이후의 밀리초를 나타내는 나타내는 정수값을 가짐 (e.g.: 1970년 1월 1일 0시를 나타내는 `Date` 객체는 정수 0)
- 하지만 콘솔에 출력하면 기본적으로 **현재 날짜와 시간**을 나타냄.
- 다른 날짜를 다루고 싶으면 `Date` 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 전달할 것.
- `Date` 생성자 함수로 객체를 생성하는 방법 4가지
### 30.1.1 `new Date()`
```js
// Date 객체 반환 
new Date(); // -> Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)

// `new` 연산자 없이 호출하면 문자열로 반환 
Date(); // -> "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"
```
### 30.1.2 `new Date(milliseconds)`
- 인수로 숫자 타입의 밀리초를 전달하면 1970년 1월 1일 00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 가지는 인스턴스를 반환
```js
// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.
new Date(0); // -> Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)

/*
86400000ms는 1day를 의미한다.
1s = 1,000ms
1m = 60s * 1,000ms = 60,000ms
1h = 60m * 60,000ms = 3,600,000ms
1d = 24h * 3,600,000ms = 86,400,000ms
*/
new Date(86400000); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```

### 30.1.3 `new Date(dateString)`
- 인수로 **날짜와 시간을 나타내는 문자열**을 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환
- 이때 인수로 전달한 문자열은 **`Date.parse` 메소드**에 의해 해석 가능한 형식이어야 함
```js
new Date('May 26, 2020 10:00:00');
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date('2020/03/26/10:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

### 30.1.4 `new Date(year, month[, day, hour, minute, second, millisecond])`
- 인수로 **년, 월, 일, 시, 분, 초, 밀리초를 의미하는 숫자를 전달**하면 지정된 날짜와 시간을 가지는 인스턴스를 반환
- **년, 월은 반드시 지정**하여야 함. 지정하지 않은 옵션 정보는 **0 또는 1으로 초기화** → 1970년 1월 1일 00:00(UTC)을 가지는 인스턴스를 반환
- 인수 / 내용
	- year : 1900년 이후의 년
	- month :월을 나타내는 0 ~ 11까지의 정수 (주의: 0부터 시작, 0 = 1월)
	- day	: 일을 나타내는 1 ~ 31까지의 정수
	- hour : 시를 나타내는 0 ~ 23까지의 정수
	- minute : 분을 나타내는 0 ~ 59까지의 정수
	- second : 초를 나타내는 0 ~ 59까지의 정수
	- millisecond : 밀리초를 나타내는 0 ~ 999까지의 정수
```js
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

// 다음처럼 표현하면 가독성이 훨씬 좋다.
new Date('2020/3/26/10:00:00:00');
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

## 30.2 `Date` 메서드
### 30.2.1 `Date.now`
- 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 **밀리초**를 숫자로 반환
```js
const now = Date.now(); // -> 1593971539112

// Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면 1970년 1월 1일 00:00:00(UTC)을
// 기점으로 인수로 전달된 밀리초만큼 경과한 날짜와 시간을 나타내는 Date 객체를 반환한다.
// (30.1.2절 "new Date(milliseconds)" 참고)
new Date(now); // -> Mon Jul 06 2020 02:52:19 GMT+0900 (대한민국 표준시)
```
### 30.2.2 `Date.parse`
- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환
- `new Date(dateString)`의 인수와 동일한 형식을 사용하라.
```js
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC'); // -> 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00'); // -> 86400000

// KST
Date.parse('1970/01/02/09:00:00');  // -> 86400000
```

### 30.2.3 `Date.UTC`
- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환
- `new Date(year, month[, day, hour, minute, second, millisecond])`와 같은 형식의 인수를 사용하라
- 이 메소드의 인수는 local time(KST)가 아닌 **UTC**로 인식된다.
- month는 월을 의미하는 0~11까지의 정수로, **0부터 시작**하므로 주의가 필요하다.
```js
Date.UTC(1970, 0, 2); // -> 86400000
Date.UTC('1970/1/2'); // -> NaN
```

### 30.2.4 `Date.prototype.getFullYear`
```js
// 년도를 나타내는 4자리 숫자를 반환한다.
new Date('2020/07/24').getFullYear(); // -> 2020
```

### 30.2.5 `Date.prototype.setFullYear`
- 년도를 나타내는 4자리 숫자를 설정
- 년도 이외 월, 일도 설정 가능
```js
const today = new Date();

// 년도 지정
today.setFullYear(2000);
today.getFullYear(); // -> 2000

// 년도/월/일 지정
today.setFullYear(1900, 0, 1);
today.getFullYear(); // -> 1900
```

### 30.2.6 `Date.prototype.getMonth`
- 월을 나타내는 0 ~ 11의 정수를 반환
- **1월은 0, 12월은 11**이다.
```js
new Date('2020/07/24').getMonth(); // -> 6
```

### 30.2.7 `Date.prototype.setMonth`
- 월을 나타내는 0 ~ 11의 정수를 설정
- 1월은 0, 12월은 11이다.
- 월 이외 일도 설정할 수 있다.
```js
const today = new Date();

// 월 지정
today.setMonth(0); // 1월
today.getMonth(); // -> 0

// 월/일 지정
today.setMonth(11, 1); // 12월 1일
today.getMonth(); // -> 11
```

### 30.2.8 `Date.prototype.getDate`
- 날짜(1 ~ 31)를 나타내는 정수를 반환
```js
new Date('2020/07/24').getDate(); // -> 24
```

### 30.2.9 `Date.prototype.setDate`
- 날짜(1 ~ 31)를 나타내는 정수를 설정
```js
const today = new Date();

// 날짜 지정
today.setDate(1);
today.getDate(); // -> 1
```

### 30.2.10 `Date.prototype.getDay`
- 요일(0 ~ 6)를 나타내는 정수를 반환
- 반환값은 **일요일이 0이며, 토요일이 6**
```js
new Date('2020/07/24').getDay(); // -> 5
```

### 30.2.11 `Date.prototype.getHours`
- 시간(0 ~ 23)를 나타내는 정수를 반환
```js
new Date('2020/07/24/12:00').getHours(); // -> 12
```

### 30.2.12 `Date.prototype.setHours`
- 시간(0 ~ 23)를 나타내는 정수를 설정
- 시간 이외 분, 초, 밀리초도 설정할 수 있음
```js
const today = new Date();

// 시간 지정
today.setHours(7);
today.getHours(); // -> 7

// 시간/분/초/밀리초 지정
today.setHours(0, 0, 0, 0); // 00:00:00:00
today.getHours(); // -> 0
```

### 30.2.13 `Date.prototype.getMinutes`
- 분(0 ~ 59)를 나타내는 정수를 반환
```js
new Date('2020/07/24/12:30').getMinutes(); // -> 30
```


### 30.2.14 `Date.prototype.setMinutes`
- 분(0 ~ 59)를 나타내는 정수를 설정
- 분 이외 초, 밀리초도 설정 가능
```js
const today = new Date();

// 분 지정
today.setMinutes(50);
today.getMinutes(); // -> 50

// 분/초/밀리초 지정
today.setMinutes(5, 10, 999); // HH:05:10:999
today.getMinutes(); // -> 5
```

### 30.2.15 `Date.prototype.getSeconds`
- 초(0 ~ 59)를 나타내는 정수를 반환
```js
new Date('2020/07/24/12:30:10').getSeconds(); // -> 10
```

### 30.2.16 `Date.prototype.setSeconds`
- 초(0 ~ 59)를 나타내는 정수를 설정
- 초 이외 밀리초도 설정 가능
```js
const today = new Date();

// 초 지정
today.setSeconds(30);
today.getSeconds(); // -> 30

// 초/밀리초 지정
today.setSeconds(10, 0); // HH:MM:10:000
today.getSeconds(); // -> 10
```


### 30.2.17 `Date.prototype.getMilliseconds`
- 밀리초(0 ~ 999)를 나타내는 정수를 반환
```js
new Date('2020/07/24/12:30:10:150').getMilliseconds(); // -> 150
```

### 30.2.18 `Date.prototype.setMilliseconds`
- 밀리초(0 ~ 999)를 나타내는 정수를 설정
```js
const today = new Date();

// 밀리초 지정
today.setMilliseconds(123);
today.getMilliseconds(); // -> 123
```

### 30.2.19 `Date.prototype.getTime`
- 1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초를 반환
```js
new Date('2020/07/24/12:30').getTime(); // -> 1595561400000
```
### 30.2.20 `Date.prototype.setTime`
- 1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초를 설정
```js
const today = new Date();

// 1970년 1월 1일 00:00:00(UTC)를 기점으로 경과된 밀리초 설정
today.setTime(86400000); // 86400000는 1day를 나타낸다.
console.log(today); // -> Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)
```

### 30.2.21 `Date.prototype.getTimezoneOffset`
- UTC와 지정 로케일(Locale) 시간과의 차이를 분단위로 반환
```js
const today = new Date(); // today의 지정 로캘은 KST다.

//UTC와 today의 지정 로캘 KST와의 차이는 -9시간이다.
today.getTimezoneOffset() / 60; // -9
```


---

### 30.2.22 `Date.prototype.toDateString`
- 사람이 읽을 수 있는 형식의 문자열로 Date 객체의 날짜를 반환한다.
```jsx
const today = new Date('2020/7/24/12:30')

today.toString(); //-> Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toDateString(); // -> Fri Jul 24 2020
```
### 30.2.23 `Date.prototype.toTimeString`
- 사람이 읽을 수 있는 형식으로 Date 객체의 시간을 표현한 문자열을 반환한다.
```jsx
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toTimeString(); // 12:30:00 GMT+0900 (대한민국 표준시)
```
### 30.2.24 `Date.prototype.toISOString`
- ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다.
```jsx
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toIsoString(); // 2020-07-24T03:30:00.000Z

today.toIsoString().slice(0, 10); // 2020-07-24
today.toIsoString().slice(0, 10).replace(/-/g, ''); // 20200724
```
### 30.2.25 `Date.prototype.toLocaleString`
- 인수로 전달한 로캘을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 적용한다.
```jsx
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toLocaleString(); // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR'); // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US'); // 7/24/2020, 12:30:00 PM
today.toLocaleString('ja-JP'); // 2020/7/24 12:30:00
```
### 30.2.26 `Date.prototype.toLocaleTimeString`
- 인수로 전달한 로캘을 기준으로 Date 객체의 시간을 표현한 문자열을 반환한다. 인수를 생략한 경우 브라우저가 동작 중인 시스템의 로캘을 사용한다.
```jsx
const today = new Date('2020/7/24/12:30');

today.toString(); // Fri Jul 24 2020 12:30:00 GMT+0900(대한민국 표준시)
today.toLocaleTimeString(); // 오후 12:30:00
today.toLocaleTimeString('ko-KR'); // 오후 12:30:00
today.toLocaleTimeString('en-US'); // 12:30:00 PM
today.toLocaleTimeString('ja-JP'); // 12:30:00
```
