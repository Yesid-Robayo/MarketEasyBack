
export const routerDIR = {
    main: '/apiV1',
    auth: {
        main: '/auth',
        children: {
            login: '/login',
        }
    },
    user: {
        main: '/user',
        children: {
            createUser: '/createUser',
        }
    },
    products: {
        main: '/products',
        children: {
            createProduct: '/createProduct',
            getProducts: '/getProducts',
        }
    },
    cart: {
        main: '/cart',
        children: {
            addProductToCart: '/addProductToCart',
            getCart: '/getCart',
            deleteProductFromCart: '/deleteProductFromCart',
            updateProductQuantity: '/updateProductQuantity',
        }
    }
}