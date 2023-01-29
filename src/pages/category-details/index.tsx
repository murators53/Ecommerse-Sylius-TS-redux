import { AxiosResponse } from 'axios'
import React, { ChangeEvent, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import BreadCrumb from "../../components/braedcrumb"
import { LoadingContext } from '../../components/loading-context'
import useApi from "../../hooks/useApi"
import { RootState } from '../../redux/store'
import { CategoryType, ProductType, RouteCodeParamsType } from '../../Type'
import ProductBox from './product-box'

export type CategoryDetailsParamsType = {
    code: string
}

export type AscDescOrderType = 'asc' | 'desc'

const CategoryDetailsPage = () => {
    const categoryState = useSelector((state: RootState) => state.cateogry)
    const loadingContext = useContext(LoadingContext)

    const routeParams = useParams<RouteCodeParamsType>()
    const api = useApi()
    const [initialized, setInitialized] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductType[]>([])

    const [orderPrice, setOrderPrice] = useState<AscDescOrderType>('asc')
    const [orderCreatedAt, setOrderCreatedAt] = useState<AscDescOrderType>('asc')
    const [page, setPage] = useState<number>(1)
    const [itemsPerpage, setItemsPerpage] = useState<number>(2)

    console.log('ORDER PRICEEE', orderPrice);

    if (initialized === false) {
        loadingContext.setLoading(true)
        const params = {
            page: page,
            itemsPerPage: itemsPerpage,
            "productTaxons.taxon.code": routeParams.code,
            "order[price]": orderPrice,
            "order[createdAt]": orderCreatedAt
        }
        api.get<ProductType[]>('shop/products', { params })
            .then((response: AxiosResponse<ProductType[]>) => {
                setProducts(response.data)
                setInitialized(true)
                console.log(response.data);
                loadingContext.setLoading(false)

                
            })

    }

    const foundCategory: CategoryType | undefined = categoryState.categories
        .find((item: CategoryType) => item.code === routeParams.code)

    return (
        <>
            <BreadCrumb items={[
                { url: '/', title: 'Home' },
                { url: '/category', title: 'Category' },
                { url: '/category-details/' + routeParams.code, title: foundCategory?.name as string },
            ]} />

            <div className='w-[80%] mx-auto  '>

                <div className='select-option form-group w-[100%]'>
                    <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        setOrderPrice(event.target.value as AscDescOrderType)
                        setInitialized(false)

                    }}
                        className='w-[20%] form-control   float-right m-auto md:flex-col md:flex-shrink'>
                        <option selected={orderPrice === 'asc'} defaultValue="asc">By Price:high</option>
                        <option selected={orderPrice === 'desc'} defaultValue="desc">By Price:low</option>
                    </select>
                </div>
                <div className='select-option form-group w-[100%]'>
                    <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        setOrderCreatedAt(event.target.value as AscDescOrderType)
                        setInitialized(false)

                    }}
                        className='w-[20%] form-control   float-right m-auto md:flex-col md:flex-shrink'>
                        <option selected={orderCreatedAt === 'asc'} defaultValue="asc">By Date:new</option>
                        <option selected={orderCreatedAt === 'desc'} defaultValue="desc">By Date:old</option>
                    </select>
                </div>
                <div className='select-option form-group w-[100%]'>
                    <select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        setItemsPerpage(parseInt(event.target.value))
                        setInitialized(false)

                    }}
                        className='w-[20%] form-control   float-right m-auto md:flex-col md:flex-shrink'>
                        <option selected={itemsPerpage === 2} value='2'>2 show item</option>
                        <option selected={itemsPerpage === 3} value='3'>3 show item</option>
                        <option selected={itemsPerpage === 5} value='5'>5 show item</option>
                        <option selected={itemsPerpage === 10} value='10'>10 show item</option>
                    </select>
                </div>
            </div>

            <div className="w-[80%] flex justify-between m-auto my-5 md:flex-col md:flex-shrink">
                <div className="w-[20%]  h-min sm:w-[100%]  md:w-min  bg-red-400 shadow text-white flex  justify-between items-center">
                    <span className="p-3 text-xl uppercase ">Category </span>
                    <button className="p-3 text-xl uppercase ">+</button>
                </div>
                <div className=" w-[80%] flex flex-wrap  items-center   md:w-full   ">
                    {
                        products.map((product: ProductType, index: number) => {
                            return <ProductBox key={index} product={product} />
                        })
                    }
                </div>
            </div >

            <div className='flex justify-center items-center gap-2'>
                <div className="arrow-button">
                    <a onClick={() => {
                        if (page > 1) {
                            setPage(page - 1)
                            setInitialized(false)
                        }
                    }} aria-label='previous'><span aria-hidden='true'>
                            &lt;
                            Prev
                        </span></a>
                </div>
                <div className='active'>
                    <a className='arrow-button bg-yellow-500'>{page}</a>
                </div>
                <div className="arrow-button">
                    <a onClick={() => {
                        if (products.length > 0) {
                            setPage(page + 1)
                            setInitialized(false)
                        }
                    }} aria-label='next'><span aria-hidden='true'>
                            Next
                            &gt;
                        </span></a>
                </div>
            </div>
        </>
    )
}

export default CategoryDetailsPage