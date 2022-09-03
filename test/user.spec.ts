import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../src/service/user.service";
import createServer from "../src/utils/server";

const userId = new mongoose.Types.ObjectId().toString()
const app = createServer()

export const userInput = {
    firstName: 'Test',
    lastName: 'User',
    email: 'example1@email.com',
    password: 'password123',
    phoneNumber: '1234567890',
    role: 'admin',
}

export const userDetails = {
    _id: userId,
    firstName: 'Test',
    lastName: 'User',
    email: 'example1@email.com',
    phoneNumber: '1234567890',
    role: 'admin',
}
describe('user', () => {
    describe('user registration', () => {
        describe('given username and password are valid', () => {
            it('should return a user', async () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userDetails)
            
                const { statusCode, body } = await supertest(app).post('/api/users').send(userInput)

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