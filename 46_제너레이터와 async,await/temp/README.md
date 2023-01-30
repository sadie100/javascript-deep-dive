참고:
[45장 예제코드](https://github.com/wikibook/mjs/blob/master/45.md).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

## 46.6 async/await

- `async`/`await`는 **프로미스를 기반으로 동작**한다.

- `async`/`await` 사용 이점

  - 프로미스의 후속 처리 메서드(`then`, `catch`, `finally`)를 사용하지 않고도 **마치 동기 처리처럼** 프로미스를 사용할 수 있다.

### 46.6.1 async 함수

- `await` 키워드는 반드시 `async` 함수 내부에서 사용해야 한다.

  - `async` 함수는 `async` 키워드를 사용하여 정의한다.

- `async` 함수는 언제나 프로미스를 반환한다.

  - 명시적으로 프로미스를 반환하지 않더라도 언제나 암묵적으로, **반환값을 resolve하는 프로미스**를 반환한다.

### 46.6.2 await 키워드

- `await` 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가, settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다.

- `await` 키워드는 프로미스 앞에서 사용해야 한다.

  ```js
  const preventDefault = async (e: React.FormEvent<HTMLFormElement>) => {
    await e.preventDefault();
    // 'await'는 이 식의 형식에 영향을 주지 않습니다.ts(80007)
  };
  ```

- `await` 키워드는 다음 실행을 **일시 중지**시켰다가, 프로미스가 settled 상태가 되면 **다시 재개**한다.

- 이러한 동작 방식, 즉 어떤 비동기 처리가 완료될 때까지 대기한다는 점을 생각해보면, 다수의 비동기 작업을 해야 할 때 어떻게 처리하는 것이 더 적합할지 고민해봐야 한다.

  > 예제 코드: https://github.com/wikibook/mjs/blob/master/46.md#46-19

  - 예를 들어서 다수의 비동기 작업이 서로 연관이 없다면, 즉 어떤 비동기 처리에 앞서 다른 비동기 처리가 선행되어야 한다거나 하는 경우가 아니라면 각각의 비동기 처리에 대해 `await` 키워드를 쓰기 보다 `Promise.all`을 사용하는 편이 훨씬 효율적일 것이다.

    ```js
    async function foo() {
      const res = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(1), 3000)),
        new Promise(resolve => setTimeout(() => resolve(2), 2000)),
        new Promise(resolve => setTimeout(() => resolve(3), 1000))
      ]);

      console.log(res); // [1, 2, 3]
    }

    foo(); // 약 3초 소요된다.
    ```

  - 반면, 비동기 작업들을 순차적으로 처리해야 한다면 각각에 `await` 키워드를 써줄 수 밖에 없다.

    ```js
    async function bar(n) {
      const a = await new Promise(resolve => setTimeout(() => resolve(n), 3000));
      // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요하다.
      const b = await new Promise(resolve => setTimeout(() => resolve(a + 1), 2000));
      // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요하다.
      const c = await new Promise(resolve => setTimeout(() => resolve(b + 1), 1000));

      console.log([a, b, c]); // [1, 2, 3]
    }

    bar(1); // 약 6초 소요된다.
    ```