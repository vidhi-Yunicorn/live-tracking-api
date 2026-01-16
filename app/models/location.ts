
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Trip from '#models/trip'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TripLocation extends BaseModel {
  public static table = 'trip_locations'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'trip_id' })
  declare tripId: number

  @column()
  declare lat: string

  @column()
  declare lng: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Trip, { foreignKey: 'tripId' })
  declare trip: BelongsTo<typeof Trip>
}
