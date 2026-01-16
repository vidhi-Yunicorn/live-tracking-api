import User from '#models/user'

type CreateUserPayload = {
  fullName: string
  email: string
  password: string
  phone?: string
  role?: 'user' | 'driver'
}

type UpdateUserPayload = Partial<Omit<CreateUserPayload, 'password'>>

export default class UserService {
  public async getAll() {
    return User.all()
  }

 
  public async getById(id: string) {
    return User.query().where('id', id).preload('vehicles').first()
  }

  
  public async getByEmail(email: string) {
    return User.findBy('email', email)
  }

  
  public async create(payload: CreateUserPayload) {
    
    const existingUser = await User.findBy('email', payload.email)

    if (existingUser) {
      throw new Error('Email already registered')
    }

    return User.create(payload)
  }

  
  public async update(id: string, payload: UpdateUserPayload) {
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    
    if (payload.email && payload.email !== user.email) {
      const existingUser = await User.findBy('email', payload.email)

      if (existingUser) {
        throw new Error('Email already registered')
      }
    }

    user.merge(payload)
    await user.save()

    return user
  }

  
   
  public async delete(id: string) {
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    await user.delete()
    return { message: 'User deleted successfully' }
  }

  public async getAllDrivers() {
    return User.query().where('role', 'driver')
  }

 
  public async getAllRiders() {
    return User.query().where('role', 'user')
  }
}
