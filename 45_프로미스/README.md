참고:
[45장 예제코드](https://github.com/wikibook/mjs/blob/master/45.md).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

# 45장. 프로미스

---

## 45.1

---

45.2 ~ 45.5 by 정병휘 (Byeonghwi Jeong)

## 45.2 프로미스의 생성

- Promise 생성자 함수를 new 연산자와 함께 호출시 프로미스 객체 생성
  - 비동기 처리를 수행할 콜백 함수를 인수로 전달 받음
  - 이 콜백함수는 resolve, reject 함수를 인수로 전달받는다.

```javascript
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  } else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});
```

- 비동기 처리가 성공하면 콜백함수의 인수로 전달받은 resolve함수 호출
- 비동기 처리가 실패하면 콜백함수의 인수로 전달받은 reject함수 호출
- **❗️비동기 함수get을 프로미스사용해서 구현**

```javascript
// GET 요청을 위한 비동기 함수
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet("https://jsonplaceholder.typicode.com/posts/1");
```

- 비동기 함수인 `promiseGet`은 함수 내부에서 프로미스 생성하고 반환
- 비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행
- **비동기 처리가 성공⭕️**
  - 비동기 처리 결과를 `resolve함수`에 인수로 전달하면서 호출
- **비동기 처리가 실패❌**

  - 에러를 `reject함수`에 인수로 전달하면서 호출

- ⭐️프로미스 상태 정보⭐️
  - `pending` : 비동기 처리가 아직 수행❓되지 않은 상태
    - 프로미스가 생성된 직후 기본상태
  - `fulfilled` : 비동기 처리 성공⭕️ 상태
    - resolve 함수 호출
  - `rejected` : 비동기 처리 실패❌ 상태
    - reject 함수 호출

```javascript
// fulfilled된 프로미스
const fulfilled = new Promise((resolve) => resolve(1));
```

![img](https://user-images.githubusercontent.com/95831345/214024763-bb95927c-be04-47a1-9236-9f214b2d954a.png)

```javascript
// rejected된 프로미스
const rejected = new Promise((_, reject) =>
  reject(new Error("error occurred"))
);
```

![img](https://user-images.githubusercontent.com/95831345/214025088-276c459a-b23a-4767-8844-c7e7bba0f323.png)

> ⭐️⭐️⭐️⭐️**프로미스는 비동기 처리상태와 처리결과를 관리하는 객체**

## 45.3 프로미스의 후속 처리 메서드

- 프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야한다.
  - `fulfilled 상태` : 처리 결과를 가지고 무언가를 해야함
  - `rejected 상태` : 에러를 가지고 에러처리를 해야함
- **프로미스 후속 메서드** : `then`, `catch`, `finally`
- 프로미스 비동기 처리 상태가 변화
  - ▶️ 후속 처리 메서드에 인수로 전달한 콜백함수가 선택적으로 호출

### 45.3.1 `Promise.prototype.then`

- **`then메서드`▶️ 두 개의 콜백 함수를 인수로 전달**
  - 첫번째 콜백함수: `fulflled 상태`
  - 두번째 콜백함수: `rejected 상태`

```javascript
// fulfilled
new Promise((resolve) => resolve("fulfilled")).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error("rejected"))).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // Error: rejected
```

- then메서드의 콜백함수가 프로미스를 반환하면 그 프로미스를 그대로 반환
- 그 값을 암묵적으로 resolve 또는 reject하여 프로미스 생성 반환

### 45.3.2 `Promise.prototype.catch`

- **`catch` ▶️ 한 개의 콜백함수를 인수로 전달**
  - catch메서드의 콜백함수는 프로미스가 rejected 상태인 경우만 호출

```javascript
// rejected
new Promise((_, reject) => reject(new Error("rejected"))).catch((e) =>
  console.log(e)
); // Error: rejected
```

- `catch메서드`는 `then(undefined, onRejected)`과 동일하게 동작
- then메서드와 마찬가지로 언제나 프로미스를 반환

```javascript
// rejected
new Promise((_, reject) => reject(new Error("rejected"))).then(undefined, (e) =>
  console.log(e)
); // Error: rejected
```

### 45.3.3 `Promise.prototype.finally`

- **`finally 메서드`▶️ 한 개의 콜백 함수를 인수로 전달**
  - 프로미스 성공과 실패와 관련없이 무조건 한번 호출
  - 상태와 상관없이 공통적인 처리가 있을때 유용
- 프로미스 반환

```javascript
new Promise(() => {}).finally(() => console.log("finally")); // finally
```

- **프로미스 구현한 비동기 함수 get + 후속처리**

```javascript
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      } else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => console.log("Bye!"));
```

## 45.4 프로미스의 에러 처리

- 비동기 처리를 위한 콜백 패턴은 에러처리가 곤란
  - ▶️ 프로미스는 에러를 문제없이 처리

**1️⃣ then 메서드 두 번째 콜백함수**

```javascript
const wrongUrl = "https://jsonplaceholder.typicode.com/XXX/1";

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl).then(
  (res) => console.log(res),
  (err) => console.error(err)
); // Error: 404
```

**2️⃣ catch 메서드**

```javascript
const wrongUrl = "https://jsonplaceholder.typicode.com/XXX/1";

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl)
  .then((res) => console.log(res))
  .catch((err) => console.error(err)); // Error: 404
```

**3️⃣ then(undefined, onRejected) 호출** - 첫 번째 콜백 함수에서 발생한 에러를 캐치하징 못하고 코드가 복잡해져서 가독성 좋지않음

```javascript
const wrongUrl = "https://jsonplaceholder.typicode.com/XXX/1";

// 부적절한 URL이 지정되었기 때문에 에러가 발생한다.
promiseGet(wrongUrl)
  .then((res) => console.log(res))
  .then(undefined, (err) => console.error(err)); // Error: 404
```

```javascript
promiseGet("https://jsonplaceholder.typicode.com/todos/1").then(
  (res) => console.xxx(res),
  (err) => console.error(err)
); // 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못한다.
```

**4️⃣ catch메서드 : then메서드의 에러까지 캐치, 가독성👍**

```javascript
promiseGet("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => console.xxx(res))
  .catch((err) => console.error(err)); // TypeError: console.xxx is not a function
```

## 45.5 프로미스 체이닝

- `콜백 헬`에서 살펴보았듯이 비동기 처리를 위한 콜백 패턴은 콜백 헬이 발생하는 문제
  - 후속 처리 메서드 then, catch, finally를 통해 해결

```javascript
get("/step1", (a) => {
  get(`/step2/${a}`, (b) => {
    get(`/step3/${b}`, (c) => {
      get(`/step4/${c}`, (d) => {
        console.log(d);
      });
    });
  });
});
```

```javascript
const url = "https://jsonplaceholder.typicode.com";

// id가 1인 post의 userId를 취득
promiseGet(`${url}/posts/1`)
  // 취득한 post의 userId로 user 정보를 취득
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then((userInfo) => console.log(userInfo))
  .catch((err) => console.error(err));
```

- 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아니다.
  - 콜백 패턴은 기독성이 좋지 않다.
  - `async/await` 통해 해결

```javascript
const url = "https://jsonplaceholder.typicode.com";

(async () => {
  // id가 1인 post의 userId를 취득
  const { userId } = await promiseGet(`${url}/posts/1`);

  // 취득한 post의 userId로 user 정보를 취득
  const userInfo = await promiseGet(`${url}/users/${userId}`);

  console.log(userInfo);
})();
```
