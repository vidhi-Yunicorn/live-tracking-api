// import Trip from '#models/trip'
// import TripLocation from '#models/location'
// import { DateTime } from 'luxon'
// import ws from '#services/ws'

// type LocationPayload = {
//   trip_id: number
//   lat: string
//   lng: string
// }

// export default class LocationService {
//   public async updateLocation(payload: LocationPayload) {
//     const trip = await Trip.find(payload.trip_id)

//     if (!trip || trip.status !== 'in_progress') {
//       throw new Error('Trip not found or not in progress')
//     }

//     const location = await TripLocation.updateOrCreate(
//       { tripId: payload.trip_id },
//       {
//         lat: payload.lat,
//         lng: payload.lng,
//         updatedAt: DateTime.now(),
//       }
//     )

//     const data = {
//       trip_id: payload.trip_id,
//       lat: location.lat,
//       lng: location.lng,
//       updated_at: location.updatedAt.toISO(),
//     }

//     ws.io.to(`trip:${payload.trip_id}`).emit('location_update', data)

//     return data
//   }

//   public async getCurrentLocation(tripId: number) {
//     const location = await TripLocation.findBy('tripId', tripId)

//     if (!location) return null

//     return {
//       trip_id: tripId,
//       lat: location.lat,
//       lng: location.lng,
//       updated_at: location.updatedAt.toISO(),
//     }
//   }

//   public async clearLocation(tripId: number) {
//     await TripLocation.query().where('tripId', tripId).delete()
//   }
// }
import Trip from '#models/trip'
import TripLocation from '#models/location'
import { DateTime } from 'luxon'

type LocationPayload = {
  trip_id: number
  lat: string
  lng: string
}

export default class LocationService {
  // Haversine formula
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 
    
    
    const toRad = (deg: number) => (deg * Math.PI) / 180
    
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    
   
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return R * c 
  }

  public async updateLocation(payload: LocationPayload) {
    const trip = await Trip.find(payload.trip_id)

    if (!trip || trip.status !== 'in_progress') {
      throw new Error('Trip not found or not in progress')
    }

    const previousLocation = await TripLocation.findBy('tripId', payload.trip_id)
    
    let distance = 0
    let totalDistance = trip.distance || 0

   
    if (previousLocation) {
      distance = this.calculateDistance(
        parseFloat(previousLocation.lat),
        parseFloat(previousLocation.lng),
        parseFloat(payload.lat),
        parseFloat(payload.lng)
      )
      totalDistance += distance
    }

 
    const location = await TripLocation.updateOrCreate(
      { tripId: payload.trip_id },
      {
        lat: payload.lat,
        lng: payload.lng,
        updatedAt: DateTime.now(),
      }
    )

    trip.distance = totalDistance
    await trip.save()

    return {
      trip_id: payload.trip_id,
      lat: location.lat,
      lng: location.lng,
      updated_at: location.updatedAt.toISO(),
      distance_from_previous: Math.round(distance * 1000) / 1000, 
      total_distance: Math.round(totalDistance * 1000) / 1000,
    }
  }

  public async getCurrentLocation(tripId: number) {
    const location = await TripLocation.findBy('tripId', tripId)

    if (!location) return null

    return {
      trip_id: tripId,
      lat: location.lat,
      lng: location.lng,
      updated_at: location.updatedAt.toISO(),
    }
  }

  public async clearLocation(tripId: number) {
    await TripLocation.query().where('tripId', tripId).delete()
  }
}