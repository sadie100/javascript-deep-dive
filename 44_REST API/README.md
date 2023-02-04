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
### 44.3.3 JSON Server 실행
### 44.3.4 GET 요청
### 44.3.5 POST 요청
### 44.3.6 PUT 요청
### 44.3.7 PATCH 요청
### 44.3.8 DELETE 요청

