## nodejs-backend-practice
#### 2024.12.21 ~

----
### 백엔드 연습 clone-coding project 😊
참고서적 
- https://product.kyobobook.co.kr/detail/S000201457949
- https://product.kyobobook.co.kr/detail/S000200383301
----
#### Node.js 백엔드 개발자 되기(https://product.kyobobook.co.kr/detail/S000201457949)
관련 프로젝트 폴더 설명 및 내용 정리

1. chapter 5 
   - promise, async/await, callback
```javascript
// promise example
then(onFulfilled)
then(onFulfilled, onRejected)

then(
        (value) => { /* success handler */},
        (reason) => { /* reject handler */ }
)

```
```
callback : 콜백 함수내에서 처리
promise : catch() 메서드로 처리
async/await : try-catch 블록으로 처리
```

2. chapter 6
   - mongoDB, mongoose


3. chapter 8
   - NestJS
```markdown
특징
1. 의존성 주입
2. RDB, NoSQL 연동, 세션 처리, 문서화, 테스트 지원, 로깅, 테스트 스케쥴링 등 기본적으로 제공해줌
3. 익스프레스 기반 미들웨어 거의 다 사용 가능함 ㅇㅇ

HTTP 요청이 발생하면 처리하는 순서
가드 -> 인터셉터 -> 파이프 -> controller -> service -> repository
```
```markdown
example)
PUT http://example.com/blog/123?page=1
{Content-Type: application/json}
{
    "title": "test",
    "content": "테스트"
}

PUT = @Put
123 = @Param
page=1 = @Query
header = @Header
body = @Body
```
서버실행
``` shell
npx ts-node-dev src/main.ts
```
네이밍 규칙 정리
```typescript
// <모듈명>.<컴포넌트명>.ts
hello.controller.ts
my-first.controller.ts

// 클래스명은 카멜 케이스로
HelloController

// 같은 디렉터리에 있는 클래스는 index.ts 통해서 import
import {MyFirstController, MySecondController} from './controllers'

// 인터페이스 활용 예시
interface Series {}
interface BookSeries extends Series {}
class MovieSeries extends Series {}
```


---- 
#### NestJS로 배우는 백엔드 프로그래밍(https://product.kyobobook.co.kr/detail/S000200383301)
관련 프로젝트 폴더 설명 및 내용 정리

1. controller-practice
   - Nest.JS Controller create
   - cmd `nest g controller Users`
   - service, entity, dao 등 전부 생성하고 싶으면 cmd `nest g resource [name]`
* resource 로 자동 생성하는 경우 UPDATE method 는 PATCH 로 생성됨
  * (PUT = 전체 업데이트, PATCH = 일부 업데이트)
* 관점 지향 프로그래밍 : 모듈 단위로 묶어서 생각하기 (응집도 관점)