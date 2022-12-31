## 11장 원시 값과 객체의 비교

 - 원시 타입의 값, 즉 원시 값은 변경 불가능한 값이다. 이에 비해 객체 타입의 값, 즉 객체는 변경 가능한 값이다.
 - 원시 값은 변수에 할당하면 변수에는 실제 값이 저장된다. 이에 비해 객체를 변수에 할당하면 변수에는 참조 값이 저장된다.
 - 원시 값은 갖는 변수를 다른 변수에 할당하면 원본의 원시 값이 복사되어 전달된다. 이를 값에 의한 전달이라 한다. 이에 비해 객체를 가리키는 변수를 다른 변수에 할당하면
 - 원본의 참조값이 복사되어 전달된다. 이를 **참조에 의한 전달** 이라 한다.

### 원시 값

 - 원시 타입의 값, 즉 원시 값은 변경 불가능한 값이다. 즉 한번 생성된 원시 값은 읽기 전용 값으로서 변경할 수 없다.
 - 변수는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름
 - 값은 변수에 저장된 데이터로서 표현식이 평가되어 생성된 결과를 말한다. 변경 불가능하다는 것은 변수가 아니라 값에 대한 진술

 + 원시 값은 변경 불가능하다는 말은 원시 값 전체를 변경할 수 없다는 것이지 변수 값을 변경할 수 없다는 것이 아니다.

```jsx
var str = 'Hello';
str = 'world';
```

첫 번째 문이 실행되면 문자열 'Hello'가 생성되고 식별자 str은 문자열 'Hello'가 저장된 메모리 공간의 첫 번째 메모리 셀 주소를 가리킨다. 그리고 두 번째 문이 실행되면 이전에
생성된 문자열 'Hello'를 수정하는 것이 아니라 새로운 문자열 'world'를 메모리에 생성하고 식별자 str은 이것을 가리킨다. 이때 문자열 'Hello'와 'world'는 모두 메모리에 존재한다.
식별자 str은 문자열 'Hello'를 가리키고 있다가 문자열 'world'를 가리키도록 변경되었을 뿐이다.

```jsx
var str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
console.log(str[0]);

// 원시 값인 문자열이 객체처럼 동작한다.
console.log(str.length); // 6
console.log(str.toUpperCase()); // STRING
```

```jsx
var str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
// 하지만 문자열은 원시 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.

str[0] = 'S';

console.log(str); // string
```
 - 원시 값은 어떤 일이 있어도 불변한다. 따라서 예기치 못한 변경으로부터 자유롭다. 이는 데이터의 신뢰성을 보장한다.

```jsx
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); // 80
```

 - 이처럼 변수에 원시 값을 갖는 변수를 할당하면 할당받는 변수(copy)에는 할당되는 변수(score)의 원시 값이 복사되어 전달된다. 이를 값에 의한 전달이라 한다.

```jsx
var score = 80;

// copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
var copy = score;

console.log(score, copy); // 80 80
console.log(score === copy); // true
```

- 이때 score 변수와 copy 변수는 숫자 값 80을 갖는다는 점에서는 동일하다. 하지만 score 변수와 copy 변수의 값 80은 다른 메모리 공간에 저장된 별개의 값이다.


+ 식별자는 어떤 값을 구별해서 식별해낼 수 있는 고유한 이름이다. 값은 메모리 공간에 저장되어 있다. 
  따라서 식별자는 메모리 공간에 저장되어 있는 어떤 값을 구별해서 식별해낼 수 있어야 하므로 변수와 같은 식별자는 값이 아니라 메모리 주소를 기억하고 있다. 즉 식별자는 **메모리 주소에 붙인 이름** 이라고 할 수 있다.

---

# 11.2 객체

---

---

- 프로퍼티 개수가 정해져 있지 않으며, 동적으로 추가되고 삭제할 수 있다.
- 원시 값과 같이 확보해야할 메모리 공간의 크기를 사전에 정해 둘 수 없다.

### <자바스크립트 객체의 관리방식>

- 프로퍼티 키를 인덱스로 사용하는 해시 테이블
- 대부분의 자바스크립트엔진은 성능을 위해서 일반적인 해시테이블보다 나은 방법을 객체 구현
- 클래스 없이 객체를 생성할 수 있으며 객체가 생성된 이후라도 동적으로 프로퍼티와 메서드를 추가 할 수 있음
    - 자바, C++은 사전에 정의된 클래스를 기반으로 객체 생성, 이후 프로퍼티 추가삭제 불가능
    - 동적으로 조절가능한점은 편리하나 클래스기반 OPP언어보다 생성과 프로퍼티 접근 비용이 많이듬(비효율)
- V8 JS엔진에서는 프로퍼티에 접근하기위해서 동적탐색(dynamic lookup)대신 히든 클래스(hidden class) 방식 사용하여 성능을 보장

### 11.2.1 변경 가능한 값

> 객체(참조) 타입의 값, 즉 객체는 변경 가능한 값(mutable value)이다.
> 

```jsx
var person = {
	name: 'Lee'
};
```


- **원시값을 할당한 변수**는 원시 값 자체를 값으로 갖음
    - 변수는 O값을 갖는다
    - 원시 값은 변경 불가능한 값
        - 값 변경하려면 **재할당!!!**
- **객체를 할당한 변수**가 기억하는 메모리 주소를 통해서 메모리 공간에 접근하면 찹조 값(reference value)에 접근
    - 참조값은 객체가 저장된 메모리 공간의 주소
    - 변수는 객체를 참조하고 있다.
    - 재할당없이 객체를 직접 변경할 수 있다.
        - 재할당없이 프로퍼티 동적추가/수정/삭제 가능
    - 메모리를 효율적으로 관리하기 위해서, 그리고 객체를 복사해 생성하는 비용을 절약하여 성능을 향상 시키기 위해서 객체는 변경 가능한 값으로 설계
        
        ```jsx
        var person = {
        	name: 'Lee'
        };
        // 갱신
        person.name = 'Kim';
        // 동적생성
        person.address = 'Seoul';
        
        console.log(person); 
        // {name: 'Kim', address: 'Seoul}
        ```
        
    
    ### <얕은 복사shallow copy와 깊은복사deep copy>
    
    - 깊은 복사 : 객체에 중첩되어 있는 객체까지 모두 복사
    - 얕은 복사 한단계까지만 복사
    
    ```jsx
    const o = { x: { y: 1} } };
    // 얕은 복사
    const c1 = { ...o }; // 35장 "스프레드 문법"
    console.log(c1 === o); // false
    console.log(c1.x === o.x); // true
    // lodash의 cloneDeep ( npm install lodash )
    const _ = require('lodash');
    // 깊은 복사
    const c2 = _.cloneDeep(o);
    console.log(c2 === o); // false
    console.log(c2.x === o.x); // false
    
    ```
    
    ### 11.2.2 참조에 의한 전달
    
    - 여러개의 식별자가 하나의 객체를 공유할 수 있다는것 - 부작용?
    
    ```jsx
    var person = {
    	name: 'Lee'
    };
    // 얕은복사
    var copy = person;
    // 동일객체 참조
    console.log(copy === person); // true
    // copy를 통해 객체 변경
    copy.name = 'Kim';
    // person를 통해 겍체 변경
    person.address = 'Seoul';
    // 양쪽다 영향을 받음
    console.log(person); // {name; 'Kim', address: 'Seoul'};
    console.log(copy); // {name; 'Kim', address: 'Seoul'};
    
    ```
    
    
    ```jsx
    var person1 = {
    	name: 'Lee'
    };
    var person2 = {
    	name: 'Lee'
    };
    console.log(person1 === person2); // false
    console.log(person1.name === person2.name); // true
    ```