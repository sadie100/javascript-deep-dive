### 46.6.3 에러 처리

콜백 패턴의 단점 중 가장 심각한 것은 에러 처리가 곤란하다는 것

**콜백 함수 패턴은 try … catch 문을 사용해 에러를 캐치할 수 없음**

```jsx
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

**async/await에서는 에러 처리로 try … catch 문을 사용할 수 있다.**

```jsx
const fetch = require('node-fetch');

const foo = async () => {
  try {
    const wrongUrl = 'https://wrong.url';

    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: Failed to fetch
  }
};

foo();
```

이때 catch문은 HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있음

**async 함수 내에서 catch문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환**

⇒ async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있음

```jsx
const fetch = require('node-fetch');

const foo = async () => {
  const wrongUrl = 'https://wrong.url';

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo()
  .then(console.log)
  .catch(console.error); // TypeError: Failed to fetch
```
