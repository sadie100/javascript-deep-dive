참고:
[44장 예제코드](https://github.com/wikibook/mjs/blob/master/44.md).
이웅모, 『모던 자바스크립트 Deep Dive』, 위키북스, 2020.

44장 by 이은민 (gcount85)

# 44장 REST API
### REST와 REST API란?
- REST: HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API: REST를 기반으로 서비스 API를 구현한 것 
- 웹이 HTTP를 제대로 사용하지 못하는 것을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍쳐로서 소개됨
- REST: REpresentational State Transfer
- RESTful하다?: REST의 기본 원칙을 성실히 지킨 서비스 디자인을 보고 하는 말

## 44.1 REST API의 구성 
| REST API의 구성 요소             | 내용                | 표현 방법         |
|-------------------|-------------------|---------------|
| 자원resource        | 자원                | URI(엔드포인트)    |
| 행위verb            | 자원에 대한 행위         | HTTP 요청 메서드   |
| 표현representations | 자원에 대한 행위의 구체적 내용 | 페이로드(payload) |

## 44.2 REST API 설계 원칙
### 1. URI는 리소스를 표현해야 한다.
- 동사보다 명사 사용 (※ 이름에 get 같은 행위 표현 ❌)
```
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

### 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현한다.
- HTTP 요청 메서드로 클라이언트는 서버에게 요청의 종류/목적(<mark style="background: #FFB8EBA6;">리소스에 대한 행위</mark>)을 알림 
- 주로 아래 5가지 요청 메서드를 사용하여 CRUD 구현
| HTTP 요청 메서드 | 종류             | 목적           | 페이로드 |
|-------------|----------------|--------------|------|
| GET         | index/retrieve | 모든/특정 리소스 취득 | X    |
| POST        | create         | 리소스 생성       | O    |
| PUT         | replace        | 리소스의 전체 교체   | O    |
| PATCH       | modify         | 리소스의 일부 수정   | O    |
| DELETE      | delete         | 모든/특정 리소스 삭제 | X    |

```
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

## 44.3 JSON Server를 이용한 REST API 실습
### 44.3.1 JSON Server 설치
### 44.3.2 db.json 파일 생성
```json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": true
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": false
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": true
    }
  ]
}
```
### 44.3.3 JSON Server 실행
### 44.3.4 GET 요청
- `todos` 리소스에서 모든 `todo`를 취득(index)

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 모든 todo를 취득(index)
    xhr.open('GET', '/todos');

    // HTTP 요청 전송
    xhr.send();

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

### 44.3.5 POST 요청
- `todo` 리소스에 새로운 `todo`를 생성
- `POST` 요청 시 `setRequestHeader` 메서드를 사용하여, 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입 지정 
```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에 새로운 todo를 생성
    xhr.open('POST', '/todos');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: false }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200(OK) 또는 201(Created)이면 정상적으로 응답된 상태다.
      if (xhr.status === 200 || xhr.status === 201) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

### 44.3.6 PUT 요청
- <mark style="background: #FFB8EBA6;">특정 리소스 전체</mark>를 교체할 때 사용
- `PUT` 요청 시에는 `setRequestHeader` 메서드를 사용하여, 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입 지정 

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 id로 todo를 특정하여 id를 제외한 리소스 전체를 교체
    xhr.open('PUT', '/todos/4');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 리소스 전체를 교체하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ id: 4, content: 'React', completed: true }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```


### 44.3.7 PATCH 요청
- `PATCH`는 <mark style="background: #FFB8EBA6;">특정 리소스의 일부</mark>를 수정할 때 사용
- `setRequestHeader` 메서드를 사용하여, 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입 지정 

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스의 id로 todo를 특정하여 completed만 수정
    xhr.open('PATCH', '/todos/4');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 리소스를 수정하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ completed: false }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

### 44.3.8 DELETE 요청
```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 id를 사용하여 todo를 삭제한다.
    xhr.open('DELETE', '/todos/4');

    // HTTP 요청 전송
    xhr.send();

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>

```
