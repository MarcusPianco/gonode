'use strict'
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')
class ForgotPasswordController {
  async store({request, response }){
    try{
    const email = request.input('email')

    const user = await User.findByOrFail('email',email)

    user.token = crypto.randomBytes(10).toString('hex')
    user.token_created_at= new Date()
    await user.save()
    await Mail.send(['emails.forgot_password'],{
      email,
      token: user.token,
      link: `${request.input('redirect_url')}?${user.token}`

    }, message =>{
      message.to(user.email)
      .from('marcus.ufal@gmail.com', 'Marcus | Ufal')
      .subject('Recuperação senha')
    })


    }catch(err){
      console.log(err)
      response.status(err.status).json({error:{message:"Algo deu Errado"}})
    }
  }

  async update({request,response}){
    try{

    const {token, password}= request.all()



    const user = await User.findByOrFail('token', token)
    console.log(user)

    const tokenExpired = moment()
    .subtract('2', 'days')
    .isAfter(user.token_created_at)

    if(tokenExpired){
      return response.status(401).send({error: 'O token está expirado'})
    }
    user.token=null
    user.token_created_at=null
    user.password=password
    user.save()
  }catch(err){
    console.log(err)
    response.status(err.status).json({error:{message:"Algo deu Errado"}})
  }

  }

}

module.exports = ForgotPasswordController
