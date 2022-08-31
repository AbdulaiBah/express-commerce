import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../src/service/user.service";
import createServer from "../src/utils/server";

const creatorId = new mongoose.Types.ObjectId().toString()
const app = createServer()

export const userInput = {
    firstName: 'First',
    lastName: 'Last',
    bio: 'bio',
    email: 'example1@email.com',
    password: 'password123',
    instruments: ['keyboard', 'drums'],
    role: 'producer'
}

export const userDetails = {
    _id: creatorId,
    firstName: 'First',
    lastName: 'Last',
    email: 'example1@email.com'
}
describe('user', () => {
    describe('user registration', () => {
        describe('given username and password are valid', () => {
            it('should return a user', async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockReturnValueOnce(userDetails)
                const { statusCode, body } = await supertest(app).post('/api/users')

                expect(statusCode).toBe(200)
                expect(body).toEqual(userDetails)
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })
        })

        describe('given username and password are invalid', () => {
            it('should return a 400', () => {
                
            })
        })

        describe('given userservice throws an exception', () => {
            it('should return a 409 error', () => {
                
            })
        })
    })

    describe('user session', () => {
        describe('given username and password are valid', () => {
            it('should return a signed access and refresh tokens', () => {

            })
        })
    })
})