# 7. 연산자

## 7.1 산술 연산자

- 연산이 불가능한 경우 `NaN`반환
- 피연산자의 개수에 따라 이항 산술 연산자와 단한 산술 연산자로 구분

### 7.1.1 이항 산술 연산자

- 모든 이항(binary) 산술 연산자는 피연산자의 값을 변경하는 부수 효과가 없다.

![https://user-images.githubusercontent.com/95831345/208382178-1ff88e7b-e240-4ea7-97f4-a23efc36fecc.png](https://user-images.githubusercontent.com/95831345/208382178-1ff88e7b-e240-4ea7-97f4-a23efc36fecc.png)

### 7.1.2 단항 산술 연산자

![https://user-images.githubusercontent.com/95831345/208382747-ee3a35eb-42fd-487f-af1f-67277d6b0a7e.png](https://user-images.githubusercontent.com/95831345/208382747-ee3a35eb-42fd-487f-af1f-67277d6b0a7e.png)

- `++` `--` : 피연산자의 값을 변경하는 부수 효과가 있다.

```jsx
var x = 5, result;
// postfix increment operator
result = x++;
console.log(result, x); // 5 6
// prefix increment operator
result = ++x;
console.log(result, x); // 7 7
// postfix decrement operator
result = x--;
console.log(result, x); // 7 6
// prefix decrement operator
result = --x;
console.log(result, x); // 5 5
```

- `+` `-` : **부수효과 없다**
    - 숫자 타입이 아닌 피연산자에 사용하면 피연산자는 숫자 타입으로 변환하여 반환한다. (부수효과 x)

```jsx
var x = '1';
// 문자열 > 숫자 변환
console.log(+x); // 1
console.log(x); // "1"
// 불리언 > 숫자 변환
x = true;
console.log(+x); // 1
console.log(x); // true
x = false;
console.log(+x); // 0
console.log(x); // false
// 문자열 변환 불가 > NaN
x = 'Hello';
console.log(+x); // NaN
console.log(x); // "Hello" 
```

- 단항 연산자는 피연산자의 부호를 반전한 값을 반환
- 피연산자를 변경 x, 부호반전한 값을 생성해 반환

```jsx
-(-10); // 10
-'10'; // -10
-true; // -1
-'Hello' // NaN
```

### 7.1.3 문자열 연결 연산자

> **연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작**
> 

```jsx
// 문자열 연결 연산자
'1' + 2 // '12'
// 타입변환 : true > 1, false > 0, null > 0
// 암묵적 타입변환 implicit coercion
// 타입 강제 변환 type coercion 
1 + true; // 2
1 + false; // 1
1 + null; // 1
// undefined는 변환x
+undefined; // NaN
1 + undefined; // NaN
```

## 7.2 할당 연산자

![https://user-images.githubusercontent.com/95831345/208387404-d2f1f827-93a0-492a-8c84-8448eabe27d9.png](https://user-images.githubusercontent.com/95831345/208387404-d2f1f827-93a0-492a-8c84-8448eabe27d9.png)

- 할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가
- 할당문을 다른 변수에 할당할 수도 있다.

```jsx
var a, b, c;
a = b = c = 0;
console.log(a, b, c);
```

## 7.3 비교 연산자

### 7.3.1 동등/일치 비교 연산자

![https://user-images.githubusercontent.com/95831345/208388950-9dc65a58-3288-42b6-af04-4b57ddfcd181.png](https://user-images.githubusercontent.com/95831345/208388950-9dc65a58-3288-42b6-af04-4b57ddfcd181.png)

- **동등 비교 loose equality `==`**
    - 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입변환을 통해 타입을 일치시킨 후 같은 값인지 비교

```jsx
5 == 5; // true
5 == '5'; // true

// 아래는 안티 패턴 : 이해 XXXX
'0' == ''; // false
0 == ''; // true
0 == '0'; // true
false == 'false'; // false
false == '0'; // true
false == null; // false
false == undefined; // false
```

- **일치 비교 strict equality `===`**
    - 좌우 피연산자의 타입과 값을 동시에 비교
    - 주의1) `NaN === NaN` // false
        - `Object.is(NaN, NaN)` // true
    - 주의2) `0 === -0` `0 == -0` // true
        - `Object.is(-0, 0)` // false
- 부동등 비교, 불일치 비교

```jsx
5 != '5'; // false
5 !== '5'; // true
```

### 7.3.2 대소 관계 비교 연산자

![https://user-images.githubusercontent.com/95831345/208391337-75634417-211e-4da2-8ec8-9079bdf7e945.png](https://user-images.githubusercontent.com/95831345/208391337-75634417-211e-4da2-8ec8-9079bdf7e945.png)

## 7.4 삼항 조건 연산자

![https://user-images.githubusercontent.com/95831345/208391437-5ea1ffd3-0de6-41a9-b29d-b623df5327b1.png](https://user-images.githubusercontent.com/95831345/208391437-5ea1ffd3-0de6-41a9-b29d-b623df5327b1.png)

# 7.12 연산자 우선순위

- 연산자 우선순위 : 여러 개의 연산자로 이뤄진 문이 실행될 때 연산자가 실행되는 순서. 우선순위가 높을수록 먼저 실행됨

| 우선순위 | 연산자 |
| --- | --- |
| 1 | () - 괄호 |
| 2 | new(매개변수 존재), . , [](프로퍼티 접근), () (함수 호출), ?. (옵셔널 체이닝 연산자) |
| 3 | new(매개변수 미존재) |
| 4 | x++, x— |
| 5 | !x, +x, -x, ++x, --x, typeof, delete |
| 6 | ** (이항 연산자 중에서 우선순위가 가장 높음) |
| 7 | *, /, % |
| 8 | +, - |
| 9 | <. <=, >, >=, in, instanceof |
| 10 | ==, !=, ===, !== |
| 11 | ?? (null 병합 연산자) |
| 12 | && |
| 13 | || |
| 14 | 삼항 연산자(? … : …) |
| 15 | 할당 연산자(=, +=, -=, …) |
| 16 | , |
- 연산자 우선순위를 모두 기억하기보다는, 연산자 우선순위가 가장 높은 그룹 연산자를 사용하여 우선순위를 명시적으로 조절하는 것을 권장

# 7.13 연산자 결합 순서

- 연산자 결합 순서 : 연산자의 어느 쪽(좌항 또는 우항)부터 평가를 수행할 것인지를 나타내는 순서

![image](https://user-images.githubusercontent.com/82367039/208433900-782f0d5e-a05e-4fa5-ba06-9408c043e584.png)


| 결합 순서 | 연산자 |
| --- | --- |
| 좌항->우항(좌측 결합) | +, - , / , %, <, >, <=, >=, &&, ||, ., [ ], ( ), ??, ?., in, instanceof |
| 우항->좌항(우측 결합) | ++, --, 할당연산자, !x, +x, -x , +=x , --x, typeof, delete, 삼항 연산자 |
