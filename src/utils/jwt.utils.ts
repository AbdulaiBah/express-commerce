import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

export function signJWT(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJWT(token: string){
    try{
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    }
    catch(error: any){
        return {
            valid: false,
            expired: error.message === 'Authentication token expired',
            decoded: null
        }
    }
}