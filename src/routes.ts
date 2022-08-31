import { Express, Request, Response } from "express"
import { applyToProjectHandler, createProjectHandler, findProjectHandler, updateProjectHandler } from "./controller/product.controller"
import { createUserHandler } from "./controller/user.controller"
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from "./controller/usersession.controller"
import requireUser from "./middleware/requireuser"
import validate from "./middleware/validateresource"
import { applyToProjectSchema, createProjectSchema, findProjectSchema, updateProjectSchema } from "./schema/product.schema"
import { createUserSessionSchema } from "./schema/session.schema"
import { createUserSchema } from "./schema/user.schema"

function routes (app: Express) {
    app.get('/healthCheck', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validate(createUserSchema), createUserHandler)

    app.post('/api/usersessions', validate(createUserSessionSchema), createUserSessionHandler)

    app.get('/api/usersessions', requireUser, getUserSessionsHandler)

    app.delete('/api/usersessions', requireUser, deleteUserSessionHandler)

    app.post('/api/projects', [requireUser, validate(createProjectSchema)], createProjectHandler)

    app.put('/api/projects/:projectId', [requireUser, validate(updateProjectSchema)], updateProjectHandler)

    app.put('/api/projects/apply/:projectId', [requireUser, validate(applyToProjectSchema)], applyToProjectHandler)

    app.get('/api/projects/:projectId', validate(findProjectSchema), findProjectHandler)
}

export default routes