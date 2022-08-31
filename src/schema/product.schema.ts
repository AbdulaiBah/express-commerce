import { array, number, object, string, TypeOf } from "zod"

const payload = {
    body: object({
        title: string({
            required_error: 'Product title is required'
        }),
        sellerName: string({
            required_error: 'Seller name is required'
        }),
        sellerStatus: array(
            string({
                required_error: 'Please list all seller government qualifications'
            })
        ),
        price: number({
            required_error: 'Price is required'
        }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'Product ID is required'
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...params
})

export const findProductSchema = object({
    ...params
})

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type FindProductInput = TypeOf<typeof findProductSchema>