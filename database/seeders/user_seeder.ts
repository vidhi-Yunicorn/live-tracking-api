import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder {
  public async run() {
    await User.createMany([
      {
        fullName: 'Test Driver',
        email: 'driver@test.com',
        password: await hash.make('password123'),
        phone:'9302387864',
        role: 'driver',
      },

      {
        fullName: 'Test Rider',
        email: 'rider@test.com',
        password: await hash.make('password123'),
        phone:'8902837864',
        role: 'user',
      },
    ])
  }
}
