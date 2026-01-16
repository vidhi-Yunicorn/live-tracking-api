import type { HttpContext } from '@adonisjs/core/http'
import TripService from '#services/trip_service'
import LocationService from '#services/location_service'

import { inject } from '@adonisjs/core'

@inject()
export default class TripsController {
  constructor(
    private tripService: TripService,
    private locationService: LocationService
  ) {}

  public async create({ request, response }: HttpContext) {
    try {
      const { start_lat, start_lng, end_lat, end_lng, user_id } = request.only([
        'user_id',
        'start_lat',
        'start_lng',
        'end_lat',
        'end_lng',
      ])

      const trip = await this.tripService.createTrip({
        userId: user_id,
        startLat: start_lat,
        startLng: start_lng,
        endLat: end_lat,
        endLng: end_lng,
      })

      return response.created({ data: trip })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

 
  public async accept({ params, request, response }: HttpContext) {
    try {
      const { driverId } = request.only(['driverId'])
      const tripId = params.id

      const trip = await this.tripService.acceptTrip(tripId, driverId)

      return response.ok({ data: trip })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

 
  public async show({ params, response }: HttpContext) {
    try {
      const trip = await this.tripService.getTrip(params.id)

      if (!trip) {
        return response.notFound({ error: 'Trip not found' })
      }

     
      let currentLocation = null
      if (trip.status === 'in_progress') {
        currentLocation = await this.locationService.getCurrentLocation(trip.id)
      }

      return response.ok({
        data: trip,
        current_location: currentLocation,
      })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

 
  public async end({ params, response }: HttpContext) {
    try {
      const tripId = Number(params.id)

      const trip = await this.tripService.endTrip(tripId)

      await this.locationService.clearLocation(tripId)

      return response.ok({ data: trip })
    } catch (error) {
      return response.badRequest({
        error: error.message ?? 'Unable to end trip',
      })
    }
  }
}
