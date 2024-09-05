import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'blogposts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('blogid').primary()
      table.integer('userid').unsigned().notNullable().references('id').inTable('blogusers').onDelete('CASCADE')
      table.string('category').notNullable()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.text('tags')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
