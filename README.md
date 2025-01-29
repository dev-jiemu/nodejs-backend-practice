## nodejs-backend-practice
#### 2024.12.21 ~

----
### 백엔드 연습 clone-coding project 😊
참고서적
- https://product.kyobobook.co.kr/detail/S000201457949
- https://product.kyobobook.co.kr/detail/S000200383301
----
##### cmd 정리
```shell
# https://docs.nestjs.com/cli/overview

# create project
nest new [project-name]

# create schematics
# app, controller, decorator, filter, gateway, module, provider, resource(CRUD)...
nest generate(g) [schematics] [name]
```


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

1. controller `controller-practice`
   - Nest.JS Controller create
   - cmd `nest g controller Users`
   - service, entity, dao 등 전부 생성하고 싶으면 cmd `nest g resource [name]`
* resource 로 자동 생성하는 경우 UPDATE method 는 PATCH 로 생성됨
  * (PUT = 전체 업데이트, PATCH = 일부 업데이트)
* 관점 지향 프로그래밍 : 모듈 단위로 묶어서 생각하기 (응집도 관점)


2. provider `user-practice`
   - 단일 책임 원칙을 기반해서 비즈니스 로직을 수행하는 영역: `provider`로 분리(not controller)
   - service, repository, factory, helper, etc
* 등록할때
```typescript
@Module({
   ...,
   providers: [UsersService] // service 모듈로 등록
})
```

```typescript
//@Injectable() => BaseService 직접 참조 안하니까 선언 ㄴㄴ
export class BaseService {
   constructor(private readonly serviceA: ServiceA) {}
   //super 쓰기 귀찮으면 속성으로 이렇게 처리 가능
   @Inject(ServiceA) private readonly serviceA: ServiceA

   getHello(): string {
      return 'hello :)'
   }

   doSumeFuncFromA(): string {
      return this.serviceA.getHello()
   }
}

@Injectable()
export class ServiceA {
   getHello(): string {
      return 'hello service A :)'
   }
}

@Injectable()
export class ServiceB extends BaseService {
    // super로 프로바이저 직접 전달하는 방식
   constructor(private readonly _serviceA: ServiceA) {
      super(_serviceA);
   }

   getHello(): string {
      return this.doSumeFuncFromA()
   }
}

@Controller()
export class AppController {
    constructor(private readonly serviceB: ServiceB){}
   
   @Get('/serviceB')
   getHello(): string {
        return this.serviceB.getHello()
   }
}
```
* 프로바이더에 스코프 적용
```typescript
// DEFAULT : 싱글턴 인스턴스가 전체 어플리케이션에서 공유됨 -> 캐시되는 관점에서 가급적 디폴트로 사용 권유함
// REQUEST : 들어오는 요청마다 별도 인스턴스ㅓ 생성함
// TRANSIENT : 임시 인스턴스 (공유 ㄴㄴ)
@Injectable({scope: Scope.REQUEST})
export class CaseService{}
```
* 컨트롤러에 스코프 적용
```typescript
export declare function Controller(options: ControllerOptions): ClassDecorator

export interface ControllerOptions extends ScopeOptions, VersionOptions {
    path?: string | string[]
    host?: string | RegExp | Array<string | RegExp>
}

export interface ScopeOptions {
    scope?: Scope
}

@Controller({
   path: 'cats',
   scope: Scope.REQUEST,
})
export class CatsController {}
```


3. Module `user-practice`
   - 여러 컴포넌트를 조합해서 좀더 큰 작업을 수행할수 있는 단위
   - ex) UserModule, OrdersModule, ChatModule...
   - MSA 관점 :)
```typescript
@Global() // 전역으로 사용하고 싶을때
@Module({
   imports: [], // 다른 모듈 가져올때 
   controllers: [],
   providers: [],
   exports: [] // 이 모듈을 다른곳에서 쓰고싶을 때
})
export class AppModule {}
```
<strong style="color: red;">!! 주의 !!</strong>  import 에서 Service, Repository 이런거 넣지 말고 `module` 만 넣어야함..;;


4. dotenv `user-practice`
```typescript
import { ConfigModule } from '@nestjs/config'

@Module({
   imports: [ConfigModule.forRoot()],
   ...
})

export class AppModule{}
```

* 의존성 주입, 제어반전
   * constructor 영역에서 생성하는 프로바이더는, 프로바이더 자체에 의존하고 있는건 맞지만 생명주기엔 관여하지 않음. (IoC)

```typescript
import { Inject, Injectable } from '@nestjs/common';

export interface Person {
   getName: () => string
}

@Injectable()
export class Dexter implements Person {
   getName(): string {
      return 'Dexter'
   }
}

@Injectable()
export class Jane implements Person {
   getName(): string {
      return 'Jane'
   }
}

class MyApp {
   constructor(@Inject('Person') private p: Person) {} // IoC 가 Person interface 객체를 관리함
}

// 인터페이스의 경우 모듈에서 선언해줘야 함 (NestJS가 못알아본다나..)
@Module({
   providers: [
      UsersService, 
      { 
          provider: 'Person', 
          useClass: Dexter // default 지정 선택
      }
   ],
})

// 만약 인터페이스를 상속 받은 객체를 여러개 provider 처리하고 싶으면 alias 등록해서 다 일일히 선언해줘야한다고...ㅇㅂㅇ..
// example
@Module({
   providers: [
      {
         provide: 'DexterPerson',
         useClass: Dexter,
      },
      {
         provide: 'JanePerson',
         useClass: Jane,
      },
   ],
   exports: ['DexterPerson', 'JanePerson'], // 필요한 provider를 export
})

@Injectable()
export class MyApp {
   constructor(
      @Inject('DexterPerson') private dexter: Person, 
      @Inject('JanePerson') private jane: Person
   ) {}

   printNames() {
      console.log(this.dexter.getName()); // 'Dexter'
      console.log(this.jane.getName());   // 'Jane'
   }
}
```