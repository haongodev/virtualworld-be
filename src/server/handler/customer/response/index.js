export const responseCustomer = (customer) => ({
    id: customer.id,
    first_name: customer.first_name,
    last_name: customer.last_name,
    phone: customer.phone,
    email: customer.email,
    birthday: customer.birthday,
    store_name: customer.store_name,
    avatar: customer.avatar,
});