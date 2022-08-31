import { array, number, object, string, TypeOf } from "zod";

const payload = {
    body: object({
        status: string({
            required_error: 'Status is required'
        }),
        value: number({
            required_error: 'Order Value is required'
        }),
        createdBy: string({
            required_error: 'Order is required'
        }),
        products: array(
            string({
                required_error: 'Product is required'
            })
        )
    })
}

const params = {
    params: object({
        orderId: string({
            required_error: 'Order ID is required'
        })
    })
}

export const createOrderSchema = object({
    ...payload
})

export const updateOrderSchema = object({
    ...params
})

export const findOrderSchema = object({
    ...params
})

export const deleteOrderSchema = object({
    ...params
})

export type CreateOrderInput = TypeOf<typeof createOrderSchema>
export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>
export type FindOrderInput = TypeOf<typeof findOrderSchema>
export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>