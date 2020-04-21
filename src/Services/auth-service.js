import moment from 'moment'
import jwt from 'jsonwebtoken'
class authService{
    gettoken(){
        return localStorage.getItem('auth_token')
    }
    decode(token){
        return jwt.decode(token)
    }
    invalidateUser(){
        localStorage.removeItem('auth_token')
    }
    getExpiration(token){
        const exp=this.decode(token).exp
        return moment.unix(exp)
    }
    isValid(token){
return moment().isBefore(this.getExpiration(token))
    }
    isAuthenticated(){
        const token=this.gettoken()
        return (token && this.isValid(token)) ? true :false
    }
    getUsername(){
        return this.decode(this.gettoken()).username
    }
}

export default new authService()