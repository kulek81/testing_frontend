import { configureStore } from '@reduxjs/toolkit'
import { Api } from '../api/api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [Api.reducerPath]: Api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Api.middleware)
})

setupListeners(store.dispatch)