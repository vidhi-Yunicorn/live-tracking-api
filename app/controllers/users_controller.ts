
import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'

export default class UsersController {
  private userService = new UserService()

  
  public async index({ response }: HttpContext) {
    try {
      const users = await this.userService.getAll()
      return response.ok({ data: users })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async show({ params, response }: HttpContext) {
    try {
      const user = await this.userService.getById(params.id)

      if (!user) {
        return response.notFound({ error: 'User not found' })
      }

      return response.ok({ data: user })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async create({ request, response }: HttpContext) {
    try {
      const payload = request.only(['full_name', 'email', 'phone', 'password', 'role'])

      const user = await this.userService.create({
        fullName: payload.full_name,
        email: payload.email,
        password: payload.password,
         phone: payload.phone,
        role: payload.role || 'user',
      })

      return response.created({ data: user })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['full_name', 'email', 'phone', 'role'])

      const updateData: any = {}
      if (payload.full_name) updateData.fullName = payload.full_name
      if (payload.email) updateData.email = payload.email
      if (payload.phone) updateData.phone = payload.phone
      if (payload.role) updateData.role = payload.role

      const user = await this.userService.update(params.id, updateData)

      return response.ok({ data: user })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async destroy({ params, response }: HttpContext) {
    try {
      const result = await this.userService.delete(params.id)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

 
  public async drivers({ response }: HttpContext) {
    try {
      const drivers = await this.userService.getAllDrivers()
      return response.ok({ data: drivers })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async riders({ response }: HttpContext) {
    try {
      const riders = await this.userService.getAllRiders()
      return response.ok({ data: riders })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}