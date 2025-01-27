import {PostDto} from './blog.model'
import {BlogMongoRepository} from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {

    // Injectable 데코레이터로 인해 이렇게 주입 가능
    constructor(private blogRepository: BlogMongoRepository) {}

    async getAllPosts() {
        return await this.blogRepository.getAllPost()
    }

    createPosts(postDao: PostDto) {
       this.blogRepository.createPost(postDao).then().catch((err) => {
           console.error(err)
       })
    }

    async getPost(id: string) {
        return await this.blogRepository.getPost(id)
    }

    deletePost(id: string) {
        this.blogRepository.deletePost(id).then().catch((err) => {
            console.error(err)
        })
    }

    updatePost(id: string, postDto: PostDto) {
        this.blogRepository.updatePost(id, postDto).then().catch((err) => {
            console.error(err)
        })
    }
}