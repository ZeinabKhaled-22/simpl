// import module
import jwt from 'jsonwebtoken'

// generate token
export const generateToken = ({ payload, secretKey = 'secretKey' }) => {
    return jwt.sign(payload, secretKey)
}

// verify token
export const verifyToken = ({ token, secretKey = 'secretKey' }) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return { message: error.message }
    }
}