import Trip from '#models/trip'
import { DateTime } from 'luxon'

type CreateTripPayload = {
  userId: number
  startLat: string          
  startLng: string          
  endLat: string            
  endLng: string            
}

export default class TripService {
  public async createTrip(payload: CreateTripPayload) {
    const trip = await Trip.create({
      userId: payload.userId,
      startLat: payload.startLat,
      startLng: payload.startLng,
      endLat: payload.endLat,
      endLng: payload.endLng,
      status: 'pending',
      driverId: null,
    })

    return trip
  }

  public async acceptTrip(tripId: number, driverId: number) {
    const trip = await Trip.find(tripId)
    if (!trip) {
      throw new Error('Trip not found')
    }

    if (trip.status !== 'pending') {
      throw new Error('Trip is not available')
    }

    trip.driverId = driverId
    trip.status = 'in_progress'
    trip.startedAt = DateTime.now()
    await trip.save()

    return trip
  }

  public async getTrip(id: number) {
    return Trip.query().where('id', id).preload('user').preload('driver').first()
  }

  public async endTrip(id: number) {
    const trip = await Trip.find(id)

    if (!trip) {
      throw new Error('Trip not found')
    }

    if (trip.status !== 'in_progress') {
      throw new Error('Only in-progress trips can be completed')
    }

    trip.status = 'completed'
    trip.endedAt = DateTime.now()

    await trip.save()
    return trip
  }

  public async cancelTrip(id: number) {
    const trip = await Trip.find(id)

    if (!trip) {
      throw new Error('Trip not found')
    }

    if (trip.status === 'completed') {
      throw new Error('Cannot cancel a completed trip')
    }

    if (trip.status === 'cancelled') {
      throw new Error('Trip is already cancelled')
    }

    trip.status = 'cancelled'
    trip.endedAt = DateTime.now()

    await trip.save()
    return trip
  }
}