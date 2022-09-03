import { Express, Request, Response } from "express"
import { createProductHandler, findProductHandler, updateProductHandler } from "./controller/product.controller"
import { createUserHandler } from "./controller/user.controller"
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "./controller/usersession.controller"
import requireUser from "./middleware/requireuser"
import validate from "./middleware/validateresource"
import { createProductSchema, findProductSchema, updateProductSchema } from "./schema/product.schema"
import { createUserSessionSchema } from "./schema/session.schema"
import { createUserSchema } from "./schema/user.schema"

function routes (app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validate(createUserSchema), createUserHandler)

    app.post('/api/usersessions', validate(createUserSessionSchema), createUserSessionHandler)

    app.get('/api/usersessions', requireUser, getUserSessionsHandler)

    app.delete('/api/usersessions', requireUser, deleteUserSessionHandler)

    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler)

    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler)

    app.get('/api/products/:productId', validate(findProductSchema), findProductHandler)
}

export default routes