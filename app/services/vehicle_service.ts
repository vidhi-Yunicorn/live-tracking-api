import Vehicle from '#models/vehicle'

type CreateVehiclePayload = {
  userId: number
  vehicleNo: string
  type: 'car' | 'bike' | 'auto'
  color: string
}

type UpdateVehiclePayload = Partial<CreateVehiclePayload>

export default class VehicleService {
  
  public async getAll() {
    return Vehicle.query().preload('user')
  }

  
  public async getById(id: number) {
    return Vehicle.query().where('id', id).preload('user').first()
  }

    public async getByUserId(userId: number) {
    return Vehicle.query().where('userId', userId)
  }

 
  public async create(payload: CreateVehiclePayload) {
    
    const existingVehicle = await Vehicle.findBy('vehicleNo', payload.vehicleNo)
    
    if (existingVehicle) {
      throw new Error('Vehicle number already registered')
    }

    return Vehicle.create(payload)
  }

  
  public async update(id: number, payload: UpdateVehiclePayload) {
    const vehicle = await Vehicle.find(id)

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    
    if (payload.vehicleNo && payload.vehicleNo !== vehicle.vehicleNo) {
      const existingVehicle = await Vehicle.findBy('vehicleNo', payload.vehicleNo)
      
      if (existingVehicle) {
        throw new Error('Vehicle number already registered')
      }
    }

    vehicle.merge(payload)
    await vehicle.save()

    return vehicle
  }

  
  public async delete(id: number) {
    const vehicle = await Vehicle.find(id)

    if (!vehicle) {
      throw new Error('Vehicle not found')
    }

    await vehicle.delete()
    return { message: 'Vehicle deleted successfully' }
  }

 
  public async getByType(type: 'car' | 'bike' | 'auto') {
    return Vehicle.query().where('type', type).preload('user')
  }
}