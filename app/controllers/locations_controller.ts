// import LocationService from '#services/location_service'
// import type { HttpContext } from '@adonisjs/core/http'

// export default class LocationsController {
//   private locationService = new LocationService()

 
//   public async updateLocation({ params, request, response }: HttpContext) {
//     try {
//       const tripId = params.id
//       const { lat, lng } = request.only(['lat', 'lng'])

//       const location = await this.locationService.updateLocation({
//         trip_id: tripId,
//         lat,
//         lng,
//       })

//       return response.ok({ data: location })
//     } catch (error) {
//       return response.badRequest({ error: error.message })
//     }
//   }


//   public async getLocation({ params, response }: HttpContext) {
//     try {
//       const location = await this.locationService.getCurrentLocation(params.id)

//       if (!location) {
//         return response.notFound({ error: 'Location not found' })
//       }

//       return response.ok({ data: location })
//     } catch (error) {
//       return response.badRequest({ error: error.message })
//     }
//   }
// }
import LocationService from '#services/location_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class LocationsController {
  private locationService = new LocationService()

  public async updateLocation({ params, request, response }: HttpContext) {
    try {
      const tripId = params.id
      const { lat, lng } = request.only(['lat', 'lng'])

      const location = await this.locationService.updateLocation({
        trip_id: tripId,
        lat,
        lng,
      })

      return response.ok({ 
        success: true,
        data: location 
      })
    } catch (error) {
      return response.badRequest({ 
        success: false,
        error: error.message 
      })
    }
  }

  public async getLocation({ params, response }: HttpContext) {
    try {
      const location = await this.locationService.getCurrentLocation(params.id)

      if (!location) {
        return response.notFound({ error: 'Location not found' })
      }

      return response.ok({ 
        success: true,
        data: location 
      })
    } catch (error) {
      return response.badRequest({ 
        success: false,
        error: error.message 
      })
    }
  }
}