
## 다양한 함수의 형태

### 즉시 실행 함수
- 함수 정의와 동시에 즉시 호출되는 함수를 즉시 실행 함수라고 한다.

```jsx
(function(){
  var a = 3;
  var b = 5;
  return a * b;
}());
```

```jsx
// 즉시 실행 함수도 일반 함수럼 값을 반환할 수 있다.
var res = (function(){
  var a = 3;
  var b = 5;
  return a * b;
}());

console.log(res); // 15

// 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
res = (function(a,b){
  return a * b;
}(3,5));

console.log(res); // 15
```

### 재귀 함수
- 함수가 자기 자신을 호출하는 것을 재귀 호출이라한다. 재귀 함수는 자기 자신을 호출하는 행위, 즉 째귀호출을 수행하는 함수를 말한다.

```jsx
function countdown(n){
  if (n < 0) return;
  console.log(n);
  countdown(n-1); // 재귀 호출
}

countdown(10);
```
+ 재귀 함수는 반복문을 사용하는 것보다 재귀 함수를 사용하는 편이 더 직관적으로 이해하기 쉬울 때만 한정적으로 사용하는 것이 바람직하다.

### 중첩 함수

+ 함수 내부에 정의된 함수를 중첩함수라고 한다. 그리고 중첩 함수를 포함하는 함수는 외부함수라 부른다.
+ 일반적으로 중첩함수는 자신을 포함하는 외부 함수를 돕는 헬퍼함수의 역할을 한다.

```jsx
function outer(){
  var x = 1;
  
  //중첩 함수
  function inner() {
    var y = 2;
    // 외부 함수의 변조를 참조할 수 있다.
    console.log(x+y); // 3
    
  }
  
  inner();
}
outer();
```

### 순수 함수와 비순수 함수

+ 어떤 외부 상태에 의존하지도 않고 변경하지도 않는, 즉 부수 효과가 없는 함수를 순수 함수라고 하고, 외부 상태에 의존하거나 외부 상태를 변경하는, 즉 부수 효과가 있는
+ 함수를 비순수 함수라고한다.

```jsx 
var count = 0;

// 순수 함수 increse는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.

fucntion increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경

count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```

```jsx
var count = 0;

//비순수 함수
function increase() {
  return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기가 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```

+ increase함수와 같은 비순수 함수는 코드의 복잡성을 증가시킨다. 함수형 프로그래밍은 결국 비순수 함수를 최대한 줄이는 것은 부수 효과를 최대한 억제하는 것과 같다. 결국 순수함수를 통해 부수효과를 최대한 억제해 오류를 피하고 프로그램의 안전성을 높이려는 노력의 일환이라 할 수 있다.


## 콜백함수

+ 함수의 매개 변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수라고 하고, 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차함수라고 한다.








  











 
 
 
 
 
 
 
 
 
 
