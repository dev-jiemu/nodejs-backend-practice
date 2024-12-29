1. create project
```shell
## create nest.js project
npm install -g @nestjs/cli
nest new blog

## nest 명령어 안먹으면
npx @nestjs/cli new blog

## server start
npm run start
```
2. 프로젝트 전체 구조
```
nest-cli.json
package.json
package-lock.json
tsconfig.build.json
tsconfig.json

src/
    app.module.ts
    blog.controller.ts
    blog.data.json
    blog.http
    blog.model.ts
    blog.repository.ts
    blog.schema.ts
    blog.service.ts
    main.ts
```
3. 의존성 주입 처리
```typescript
@Injectable
```