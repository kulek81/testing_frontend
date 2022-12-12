import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { QuestionModel, VariantsModel } from '../models'

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    endpoints: (builder) => ({
        getVariants: builder.query<number[], ''>({
            query: () => 'variants'
        }),
        getQuestions: builder.query<QuestionModel[], number>({
            query: (variant) => `variants/${variant}`
        })
    })
})

export const {
    useGetVariantsQuery,
    useGetQuestionsQuery
} = Api