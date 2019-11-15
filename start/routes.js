'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.post('/forgot','ForgotPasswordController.store')
Route.put('/reset','ForgotPasswordController.update')


Route.post('/users','UserController.store')
Route.post('/sessions','SessionController.store')


