import LocationsController from '#controllers/locations_controller'
import TripsController from '#controllers/trips_controller'
import UsersController from '#controllers/users_controller'
import VehiclesController from '#controllers/vehicles_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.get('/', () => {
    return 'Live Tracking API is running'
  })
})

router
.group(() => {
  router.get('/users', [UsersController, 'index'])
  router.get('/users/drivers', [UsersController, 'drivers'])
  router.get('/users/:id', [UsersController, 'show'])
  router.post('/users', [UsersController, 'create'])
  router.put('/users/:id', [UsersController, 'update'])

  router.delete('/users/:id', [UsersController, 'destroy'])
})

router.group(() => {
  router.get('/vehicles', [VehiclesController, 'index'])
  router.get('/vehicles/type/:type', [VehiclesController, 'getByType']) // type means auto, bike, car
  router.get('/vehicles/:id', [VehiclesController, 'show'])
  router.post('/vehicles', [VehiclesController, 'create'])
  router.put('/vehicles/:id', [VehiclesController, 'update'])

  router.delete('/vehicles/:id', [VehiclesController, 'destroy'])
 
  router.get('/users/:userId/vehicles', [VehiclesController, 'getUserVehicles'])
})


router.group(() => {
  router.post('/trips', [TripsController, 'create'])
  router.get('/trips/:id', [TripsController, 'show'])
  router.post('/trips/:id/accept', [TripsController, 'accept'])
  router.post('/trips/:id/end', [TripsController, 'end'])
})


router.group(() => {
  router.post('/trips/:id/location', [LocationsController, 'updateLocation'])
  router.get('/trips/:id/location', [LocationsController, 'getLocation'])
})
