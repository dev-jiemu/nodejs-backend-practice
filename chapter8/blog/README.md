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
4. mongoose 사용 관련
```typescript
// findById : mongodb PK 검색임 ("_id" => 이 필드 말하는거임)
// 내가 원하는 필드 기준으로 검색하고 싶다면 findOne을 활용해줘야 함
// exec 호출까지 해줘야 반영됨

async getPost(id: string): Promise<PostDto> {
    return this.blogModel.findOne({id}).exec();
}

async deletePost(id: string) {
    await this.blogModel.findOneAndDelete({ id }).exec()
}

async updatePost(id: string, postDto: PostDto) {
    const updatePost = {
        id,
        ...postDto,
        updateDt: new Date()
    }

    await this.blogModel.findOneAndUpdate({ id }, updatePost, { new: true }).exec()
}
```