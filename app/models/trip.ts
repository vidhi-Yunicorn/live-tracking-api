import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Trip extends BaseModel {
  public static table = 'trips'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare driverId: number | null

  @column()
  declare status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  
  @column()
  declare distance: number

  @column()
  declare startLat: string

  @column()
  declare startLng: string

  @column()
  declare endLat: string

  @column()
  declare endLng: string

  @column.dateTime()
  declare startedAt: DateTime | null

  @column.dateTime()
  declare endedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'driverId' })
  declare driver: BelongsTo<typeof User>
}