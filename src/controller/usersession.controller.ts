import { Request, Response } from 'express'
import config from 'config'
import { validatePassword } from '../service/user.service'
import { createUserSession, findUserSessions, updateUserSession } from '../service/usersession.service'
import { signJWT } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send('Invalid login credentials')
    }

    const session = await createUserSession(user._id)

    const accessToken = signJWT(
        {...user, session: session._id},
        { expiresIn: config.get('accessTokenTimeToLive') }
    )

    const refreshToken = signJWT(
        {...user, session: session._id},
        { expiresIn: config.get('refreshTokenTimeToLive') }
    )

    return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response){
    const userId = res.locals.user._id
    const sessions = await findUserSessions({user: userId, valid: true})
    return res.send(sessions)
}

export async function deleteUserSessionHandler(req: Request, res: Response){
    const userSessionId = res.locals.user.session

    await updateUserSession({ _id: userSessionId }, { valid: false })
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}