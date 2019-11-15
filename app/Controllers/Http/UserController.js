'use strict'
const User = use('App/Models/User')
const Logger = use('Logger')
class UserController {

  async store({request, response}){

    const data = request.only(['username','email','password'])
    const { username }= data;
    console.log(username)
    if(await User.findByOrFail('username', username)){
      return response.status(400).json({error:'User already exist'})
    }

    const user = await User.create(data)
    return user
  }

}

module.exports = UserController
