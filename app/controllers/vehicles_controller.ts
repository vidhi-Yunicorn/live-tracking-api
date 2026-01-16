import type { HttpContext } from '@adonisjs/core/http'
import VehicleService from '#services/vehicle_service'

export default class VehiclesController {
  private vehicleService = new VehicleService()

  
  public async index({ response }: HttpContext) {
    try {
      const vehicles = await this.vehicleService.getAll()
      return response.ok({ data: vehicles })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

 
  public async show({ params, response }: HttpContext) {
    try {
      const vehicle = await this.vehicleService.getById(params.id)

      if (!vehicle) {
        return response.notFound({ error: 'Vehicle not found' })
      }

      return response.ok({ data: vehicle })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async create({ request, response }: HttpContext) {
    try {
      const payload = request.only(['user_id', 'vehicle_no', 'type', 'color'])

      const vehicle = await this.vehicleService.create({
        userId: payload.user_id,
        vehicleNo: payload.vehicle_no,
        type: payload.type,
        color: payload.color,
      })

      return response.created({ data: vehicle })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

    public async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['vehicleNo', 'type', 'color'])

      const updateData: any = {}
      if (payload.vehicleNo) updateData.vehicleNo = payload.vehicleNo
      if (payload.type) updateData.type = payload.type
      if (payload.color) updateData.color = payload.color

      const vehicle = await this.vehicleService.update(params.id, updateData)

      return response.ok({ data: vehicle })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async destroy({ params, response }: HttpContext) {
    try {
      const result = await this.vehicleService.delete(params.id)
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async getByType({ params, response }: HttpContext) {
    try {
      const vehicles = await this.vehicleService.getByType(params.type)
      return response.ok({ data: vehicles })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  
  public async getUserVehicles({ params, response }: HttpContext) {
    try {
      const vehicles = await this.vehicleService.getByUserId(params.userId)
      return response.ok({ data: vehicles })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}