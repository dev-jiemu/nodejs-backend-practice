// 엔티티 같은거
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// Blog, Document 프로퍼티 둘다 가지고 있어야 함
// or 조건으로 하고 싶으면 export type BlogDocument = Blog | Document
export type BlogDocument = Blog & Document

@Schema()
export class Blog {
    @Prop({required: true, unique: true})
    id: string

    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    name: string

    @Prop()
    createdDt: Date

    @Prop()
    updateDt: Date
}

export const BlogSchema = SchemaFactory.createForClass(Blog)