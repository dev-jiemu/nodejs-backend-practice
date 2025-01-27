### Nest.js 환경변수 설정
#### 1. install package
```shell
npm install @nestjs/config
```
#### 2. how to nestjs-config setting
   - 1. app.module 에 ConfigModule 설정 추가
   - 2. .env 설정
#### 3. how to make module
```shell
nest g module <module_name>
nest g controller <module_name> --no-spec
```
#### 4. how to config for custom setting
#### 5. how to config for yaml file
```typescript
// configs/config
import common from './common';
import local from './local';
import dev from './dev';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

let conf = {};
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
}

const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd}/envs/config.yaml`, 'utf8'),
);

export default () => ({
  ...common, ...conf, ...yamlConfig,
})
```
#### 6. how to global config setting
```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) 
  await app.listen(configService.get("SERVER_PORT"))
}
bootstrap();
```