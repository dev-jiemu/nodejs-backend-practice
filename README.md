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
#### DI(의존성 주입) 관련
```typescript
// 1. 일반적인 클래식 타입 기반 주입
@Injectable()
export class UsersService{}

// 2. 토큰 기반 주입
{
    privide: WINSTON_MODULE_PROVIDER, // token type
    useFactory: () => new WinstonLogger()
}

@Controller('users')
export class UsersController {
    constructor(
            private usersService: UsersService, // 클래스 타입이라서 NestJS가 자동으로 주입해줌
            @Inject(WINSTON_MODULE_PROVIDER) private logger: WinstonLogger // 어떤 타입으로 만들어야할지 모르니까 직접 토큰 지정
    ){}
}

// 2-2. 이메일 전송 구현할때 Inject 데코레이터 빼버렸는데 걔는 되고 쟤는 안된 이유 = NestJS가 기본으로 제공하는 서비스가 아니니까.
// 정 똑같은 효과 내고 싶으면 모듈에서 내가 직접 선언하면 됨
@Module({
    providers: [
        {
            provide: WinstonLogger, // 일반 클래스 타입으로 등록
            useFactory: (configService: ConfigService) => {
                const config = configService.get('winston');
                return new WinstonLogger(config);
            },
            inject: [ConfigService],
        },
    ],
    exports: [WinstonLogger],
})
export class LoggerModule {}

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


5. 파이프(Pipe) `user-practice`
* 요청이 라우터로 전달되기 전 요청객체 변환 작업 가능
  * ex) transformation, validation
```typescript
@Get(':id')
findOne(@Param('id', parseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.usersService.findOne(id)
}
```
* class-validator https://github.com/typestack/class-validator
* 인증/인가 ~~가끔 햇갈림~~
  * 인증 : 신원확인
  * 인가 : 접근권한
  * 인증은 인가로 이어지긴 하는데 <strong>인가가 인증을 의미하진 않음</strong>


6. 영속성 : ORM `user-practice`
- TypeORM
- 지원하는 데이터 베이스가 많은듯 ㅇㅂㅇ.. mysql, mongo, postgres, oracle, sqlite... 등등 보임
```typescript
// app.module.ts
@Module({
    imports: [
            ...
            TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'lodalhost',
                port: '3306',
                username: 'root',
                password: '',
                database: '',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // 서비스 구동시 소스코드 기반으로 데이터베이스 스키마 동기화 여부 설정
            })
    ],
})

// 사용할 모듈에서 import 처리
@Module({
    imports: [
        EmailModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
```
* 트랜잭션 처리법 for TypeORM
    * QueryRunner : 단일 DB connection 생성해서 관리
    * transaction 함수 직접 사용

```typescript
import { Injectable } from '@nestjs/common';
import * as querystring from 'node:querystring';

@Injectable()
export class UsersService {
    constructor(private dataSource: DataSource) {}

    // QueryRunner
    private saveUserusQueryRunner = async (name: string, email: string, password: string, signupVerifyToken: string) => {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()
        
        try {
            const user = new UserEntity()
            
            ...
            
            await queryRunner.manager.save(user)
            await queryRunner.commitTransaction()
        } catch (ex) {
            await queryRunner.rollbackTransaction(0)
        } finally{
            await queryRunner.release() // ** 직접 생성한건 해제 시켜줘야 함
        }
    }


    // Transaction func
    private saveUserTransaction = async (name: string, email: string, password: string, signupVerifyToken: string) => {
        await this.dataSource.transaction(async manager => {
            const user = new UserEntity()
            
            ...
            
            await manager.save(user)
        })
    }
}
```
* 마이그레이션
```shell
npm run typeorm migration:generate src/migrations/CreateUserTable -- -d ./ormconfig.ts
```

7. middleware
* 라우트 핸들러가 클라이언트 요청 수행하기 전에 수행되는 컴포넌트
* 미들웨어가 여러개면 next() 로 제어권 조절 필요
  * 함수로 만든 미들웨어의 단점 : 프로바이더 주입이 안됨 ㅇㅂㅇ..
```typescript
import { UsersController } from './users.controller';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use = (req: Request, res: Respomse, next: NextFunction) => {
    console.log('Request')
    next()
  }
}

// app.module.ts
export class AppModule implements NestModule {
  configure = (consumer: MiddlewareConsumer): any => {
    // 특정 라우터에 apply 영역에 원하는 미들웨어 여러개 붙임
    // router url 말고 컨트롤러 자체를 붙여도 됨
    consumer.apply(LoggerMiddleware).forRoutes('/users')
    consumer.apply(LoggerMiddleware).forRoutes(UsersController)
    // exclude : 예외 라우터 설정
  }
}

// 완전 전역으로 사용하고 싶으면 main.ts 에 선언
app.use(LoggerMiddleware)
```

8. Guard (JWT) `user-practice`
* 인가 구현
* CanActivate
* 세션기반 인증 / 토큰기반 인증
```typescript
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate = (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> => {
    const request = contexts.switchToHttp().getRequest()
    return this.validateRequest(request)
  }

  private validateRequest = (request: any): boolean => {
    return true
  }
}

// 가드 적용
@UseGuards(AuthGuard)
@Controller()
export class AppController {

}

// 가드 전역적용
// main.ts
app.useGlobalGuards(new AuthGuard())

// app.module.ts
@Module({
  providers: [
    {provide: APP_GUARD, useClass: AuthGuard}
  ]
})
```

9. Logging `user-practice`
* 로그 레벨 지정
```typescript
import {NestFactory} from "@nestjs/core";

const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn', 'log'] : ['error', 'warn', 'log', 'varbose', 'debug']
})
```
* custom logger
```typescript
export class CustomLogger implements ConsoleLogger {
    error = (message: any, stack?: string, context?: string) => {
        super.error.apply(this, arguments)
        this.doSomething()
    }
    
    private doSomething = () => {
        // TODO
    }
}
```
* custom logger 주입 : 모듈 만들어서 넣기
```typescript
import {NestFactory} from "@nestjs/core";

@Module({
    providers: [CustomLogger],
    exports: [CustomLogger],
})
export class CusgomLoggerModule {
}

@Module({
    imports: [CustomLoggerModule]
})
export class AppModule {
}

// 전역으로 지정
async function boostrap() {
    const app = await NestFactory.create(AppModule)
    app.useLogger(app.get(CustemLogger))
    await app.listen(3000)
}
```