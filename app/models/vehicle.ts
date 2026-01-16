import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Vehicle extends BaseModel {
  public static table = 'vehicles'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare vehicleNo: string

  @column()
  declare type: 'car' | 'bike' | 'auto'

  @column()
  declare color: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>
}
