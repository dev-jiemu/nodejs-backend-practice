import {Controller, Param, Body, Delete, Get, Post, Put} from '@nestjs/common'
import {BlogService} from './blog.service'
import { Injectable } from '@nestjs/common';

@Injectable()
@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) {}

    @Get()
    async getAllPosts() {
        console.log('getAllPosts')
        return this.blogService.getAllPosts()
    }

    @Post()
    createPost(@Body() postDto: any) {
        console.log('createPost body = ', postDto)
        this.blogService.createPosts(postDto)
        return 'success'
    }

    @Get('/:id')
    async getPost(@Param('id') id: string) {
        console.log(`getPost param-id : ${id}`)
        return this.blogService.getPost(id)
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log(`deletePost param-id : ${id}`)
        this.blogService.deletePost(id)
        return 'success'
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto: any) {
        console.log(`updatePost : id=${id}, body=` + postDto)
        return this.blogService.updatePost(id, postDto)
    }
}