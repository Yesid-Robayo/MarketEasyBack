export const routerDIR = {
    main: '/apiV1',
    auth:{
        main: '/auth',
        children:{
            login: '/login',
            register: '/register',
            logout: '/logout',
        }
    }
}