import supertest from "supertest"
import createServer from "../src/utils/server"
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { createProduct } from "../src/service/product.service"
import { signJWT } from "../src/utils/jwt.utils"

const app = createServer()
const creatorId = new mongoose.Types.ObjectId().toString()
export const projectDetails = {
    createdBy: creatorId,
    name: "Project 1",
    projectType: "Music Project",
    genre: "Afrobeat",
    paid: true,
    started: false,
    instruments: ["drums"],
    mood: "upbeat"
}
export const userDetails = {
    _id: creatorId,
    firstName: 'First',
    lastName: 'Last',
    bio: 'bio',
    email: 'example1@email.com',
    password: 'password123',
    instruments: ['keyboard', 'drums'],
    role: 'producer'
}
describe('testing product endpoints', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('get product', () => {
        describe('given product exists', () => {
            it('should return a 200', async () => {
                const project = await createProduct(projectDetails)
                const { body,  statusCode} = await supertest(app).get(`/api/projects/${project.projectId}`)

                expect(statusCode).toBe(200)
                expect(body.projectId).toBe(project.projectId)
            })
        })

        describe('given project does not exist', () => {
            it('should return a 404', async () => {
                const projectId = 'project-123'
                await supertest(app).get(`/api/projects/${projectId}`).expect(404)
            })
        })
    })

    describe('create project', () => {
        describe('when the user is logged in', () => {
            it('should return a 200 and a user and create a new project', async () => {
                const jwt = signJWT(userDetails)
                const {statusCode, body} = await supertest(app).post(`/api/projects`).set('Authorization', `Bearer ${jwt}`).send(projectDetails)

                expect(statusCode).toBe(200)
                expect(body).toEqual(
                    {"__v": 0, "_id": expect.any(String), "applications": [], "createdAt": expect.any(String), "createdBy": expect.any(String), "genre": "Afrobeat", "instruments": ["drums"], "mood": "upbeat", "name": "Project 1", "paid": true, "projectId": expect.any(String), "projectType": "Music Project", "started": false, "team": [], "updatedAt": expect.any(String)}
                )
            })
        })

        describe('when the user is not logged in', () => {
            it('should return a 403 only', async () => {
                const { statusCode } = await supertest(app).post(`/api/projects`)

                expect(statusCode).toBe(403)
            })
        })
    })
})

