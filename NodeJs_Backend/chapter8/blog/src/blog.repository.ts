import { readFile, writeFile } from 'fs/promises'
import { PostDto } from './blog.model'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>
    createPost(postDto: PostDto)
    getPost(id: string): Promise<PostDto>
    deletePost(id: string)
    updatePost(id: string, postDto: PostDto)
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {

    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    async getAllPost(): Promise<PostDto[]> {
        return await this.blogModel.find().exec()
    }

    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost()
        const id = posts.length + 1

        const createPost = {
            id,
            ...postDto,
            createdDt: new Date(),
            updateDt: new Date()
        }

        await this.blogModel.create(createPost)
    }

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
}

// @Injectable()
// export class BlogFileRepository implements BlogRepository {
//     FILE_NAME = './src/blog.data.json'
//
//     async getAllPost(): Promise<PostDto[]> {
//         const datas = await readFile(this.FILE_NAME, 'utf8')
//         const posts = JSON.parse(datas)
//         return posts
//     }
//
//     async createPost(postDto: PostDto) {
//         const posts = await this.getAllPost()
//         const id = posts.length + 1
//         const createPost = {
//             id: id.toString(),
//             ...postDto,
//             createdDt: new Date()
//         }
//         posts.push(createPost)
//         await writeFile(this.FILE_NAME, JSON.stringify(posts))
//     }
//
//     async getPost(id: string): Promise<PostDto> {
//         const posts = await this.getAllPost()
//         const result = posts.find(post => post.id === id)
//
//         return result
//     }
//
//     async deletePost(id: string) {
//         const posts = await this.getAllPost()
//         const filter = posts.filter(post => post.id !== id)
//         await writeFile(this.FILE_NAME, JSON.stringify(filter))
//     }
//
//     async updatePost(id: string, postDto: PostDto) {
//         const posts = await this.getAllPost()
//         const index = posts.findIndex(post => post.id === id)
//         const updatePost = {
//             id,
//             ...postDto,
//             updateDt: new Date()
//         }
//         posts[index] = updatePost
//         await writeFile(this.FILE_NAME, JSON.stringify(posts))
//     }
//
// }
