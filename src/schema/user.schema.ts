import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First Name is required'
        }),
        lastName: string({
            required_error: 'Last Name is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Email is not valid'),
        password: string({
            required_error: 'Password is required'
        }).min(6, 'Password should be at least 6 characters long'),
        phoneNumber: string({
            required_error: 'Phone Number is required'
        }).length(10, 'Phone Number is not valid'),
        role: string({
            required_error: 'Role is required'
        })

    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>