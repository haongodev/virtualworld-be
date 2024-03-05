
export const responseOrder = (order) => {
    return {
        id: order.id,
        customer_id: order.customer_id,
        status: {
            name:order.order_status.name,
            label:order.order_status.label
        },
        created_at: order.createdAt,
        payment_method:order.payment_method,
        shipping_method:order.shipping_method,
        subtotal:JSON.parse(JSON.stringify(order.subtotal)),
        total:JSON.parse(JSON.stringify(order.total)),
        currency:order.currency,
        exchange_rate:JSON.parse(JSON.stringify(order.exchange_rate)),
        payment_status:order.payment_status
    }
}

export const responseOrders = (orders) => orders.map((order) => responseOrder(order));