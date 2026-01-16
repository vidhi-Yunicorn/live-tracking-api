import Vehicle from '#models/vehicle'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder {
  public async run() {
    await Vehicle.createMany([
      {
        userId: 1,
        vehicleNo: 'MP09XL6050',
        type: 'bike',
        color: 'orange',
      }
    ])
  }
}
