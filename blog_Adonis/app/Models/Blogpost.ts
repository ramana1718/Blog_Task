import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Bloguser from './User'
export default class Blogpost extends BaseModel {
  public static table='blogposts'
  @column({ isPrimary: true })
  public blogid: number

  @column()
  public userid : number

  @column()
  public category:string

  @column()
  public title:string

  @column()
  public content:string

  @column()
  public tags:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Bloguser, {
    foreignKey: 'userid',
  })
  public user: BelongsTo<typeof Bloguser>
}
