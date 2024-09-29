import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        
        getProducts: build.query({
            query: (search = "") => `products?search=${search}`, // Add search parameter
            providesTags: (result) =>
                result && Array.isArray(result)
                    ? [
                        ...result.map(({ id }) => ({ type: 'Products', id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        addProduct: build.mutation({
            query(body) {
                return {
                    url: `products`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),

        getProduct: build.query({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),

        updateProduct: build.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `products/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
        }),

        deleteProduct: build.mutation({
            query(id) {
                return {
                    url: `products/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi
