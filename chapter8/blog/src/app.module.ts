import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BlogController } from './blog.controller'
import { BlogService } from './blog.service'
import { Blog, BlogSchema } from './blog.schema'
import { BlogMongoRepository } from './blog.repository';

@Module({
  imports: [
      MongooseModule.forRoot(
          "mongodb://mongo:test@localhost:27017/blog?authSource=admin"
      ),
      MongooseModule.forFeature([
        {name: Blog.name, schema: BlogSchema}
      ])
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}
