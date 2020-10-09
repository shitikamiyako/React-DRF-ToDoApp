import React from 'react'
import LoginForm from '../usercomponents2/LoginFormContainer'
import Landing from '../usercomponents2/Landing'

export default {
    'login':{
        path:'/login',
        mode:'guest',
        component:(LoginForm),
        exact:true,
    },
    'landing':{
        path:'/'
        mode:'member',
        component:(Landing),
        exact:true,
    },
}