
// shop/product-variants/{code}
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { SlBasket } from '../../Icon'
import { useParams } from "react-router-dom"
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import useApi from '../../hooks/useApi'
import { Axios, AxiosResponse } from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { CartType, CategoryType, ProductType, ProductVariantType, ProdutImageType, RouteCodeParamsType } from '../../Type';
import BreadCrumb from '../../components/braedcrumb';
import { setCart } from '../../redux/reducers/CartSlice';

const ProductDetailsPage = () => {
    const cartState = useSelector((state: RootState) => state.cart)
    const routeParams = useParams<RouteCodeParamsType>()
    const api = useApi()
    const dispatch = useDispatch()

    const [productDetails, setProductDetails] = useState<ProductType | null>(null)
    const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(null)
    const [productVariants, setProductVariants] = useState<ProductVariantType[]>([])

    const [initialized, setInitialized] = useState<boolean>(false)

    const [selectedVariant, setSelectedVariant] = useState<ProductVariantType | null>(null)

    if (initialized === false) {
        (async () => {
            const productResult: AxiosResponse<ProductType> = await api.get<ProductType>(`shop/products/${routeParams.code}`)
            const promises: any[] = []
            for (let i = 0; i < productResult.data.variants.length; i++) {
                let variantCode = productResult.data.variants[i].split('/').reverse()[0]

                promises.push(api.get('shop/product-variants/' + variantCode))

            }//burda sirayla yapar hepsini ama Promise kullanirsak paralel oalrak yapar ayni anda
            //Promiseleri aynianda istek atip ayni anda cozmeye calisir
            const variantResponses: AxiosResponse<ProductVariantType>[] = await Promise.all(promises)

            //Bu yukaridaki set olan productVariants degildir
            let productVariants: ProductVariantType[] = variantResponses.map((item) => item.data)

            let taxonCode: string = productResult.data.mainTaxon.split('/').reverse()[0]
            const categoryResult = await api.get<CategoryType>(`shop/taxons/${taxonCode}`)
            console.log('PRODUCT RESL >>> ', productResult);
            setProductDetails(productResult.data)
            setCategoryDetails(categoryResult.data)
            setProductVariants(productVariants)
            setSelectedVariant(productVariants[0])//urun null oalrak projeye basl.na gore  null gorunmemsi icin
            //default olarak small secili kalmasi gerektir
            setInitialized(true)

        })()

        return <div className='w-full h-[500px] text-center flex items-center justify-center '>
            <p className='bg-red-200 h-full w-full flex justify-center items-center'>

                LOADING...
            </p>
        </div>
    }

    function onVariantChange(event: ChangeEvent<HTMLSelectElement>) {
        let foundVariant: ProductVariantType | undefined = productVariants.find(
            (item) => item.code === event.target.value
        )
        //foundVariant undefined  da olabilecegine gore if filtresineden gecirerek setSelectVariant etmliyiz 

        if (foundVariant) {
            setSelectedVariant(foundVariant)
        }

    }

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)//name baridiran butun inputlari alir
        //yani product_variant olani alir

        const formValue: any = Object.fromEntries(data.entries())

        formValue.quantity = parseInt(formValue.quantity)

        console.log('SSSSSS', formValue);

        if (cartState.cart) {
            api.post(`shop/orders/${cartState.cart.tokenValue}/items`, formValue)
                .then((response: AxiosResponse<CartType>) => {
                    console.log('>>API RES', response);
                    dispatch(setCart(response.data))
                })
        }
    }

    const images: ReactImageGalleryItem[] = [
        /*  {
             original: 'https://picsum.photos/id/1018/1000/600/',
             thumbnail: 'https://picsum.photos/id/1018/250/150/',
         },
         {
             original: 'https://picsum.photos/id/1015/1000/600/',
             thumbnail: 'https://picsum.photos/id/1015/250/150/',
         },
         {
             original: 'https://picsum.photos/id/1019/1000/600/',
             thumbnail: 'https://picsum.photos/id/1019/250/150/',
         }, */
    ];
    //map ile donerek yukaridaki hazir kutup de turunde donecez

    productDetails?.images.map((item: ProdutImageType, index) => {
        images.push({
            original: 'https://ecommerce-api.udemig.dev' + item.path,
            thumbnail: 'https://ecommerce-api.udemig.dev' + item.path,
            originalClass: 'object-fill h-80 '
        })
    })


    console.log('cartsState VAR>>.', cartState.cart?.items);

    return (
        <>
            <BreadCrumb items={[
                { url: '/', title: 'Home' },
                { url: '/product', title: 'Product' },
                { url: '/product-details/' + routeParams.code, title: routeParams.code as string },
            ]} />
            <form action="" className='' onSubmit={onFormSubmit}>

                <div className="w-[80%]  h-96 flex flex-row justify-center items-center mx-auto mt-2">
                    <div className="w-full h-full  mb-2 ">
                        <ImageGallery items={images} />
                    </div>

                    <div className="w-full h-full pl-5  flex flex-col justify-evenly flex-shrink ">
                        <div>
                            <h1 className='text-2xl'>{productDetails?.name}</h1>
                            <span>
                                &nbsp;
                                (
                                {productDetails?.averageRating}
                                &nbsp;
                                Review Stars
                                )
                            </span>
                        </div>
                        <div className=''>
                            <p className="product-price " style={{ fontSize: '38px' }}>
                                <span className='text-orange-400 font-bold mr-2 '>$
                                    {selectedVariant?.price}
                                </span>
                                <strong className='text-sm' style={{ textDecoration: 'line-through' }}>$1300</strong>
                            </p>
                            <p className='text-sm text-gray-500'>
                                {productDetails?.description.substring(0, 100)}...
                            </p>
                        </div>
                        <div className='inline-flex flex-row gap '>
                            <div className="product-quantity">
                                <h5>Quantity</h5>
                                <input type="number" name='quantity' defaultValue={1} min={0}
                                    className='border-orange-700 border-2 rounded p-1 w-[30%] mt-2' />
                            </div>
                            <div className="product-quantity flex flex-col">
                                <h5>Varıants</h5>
                                <select onChange={onVariantChange}
                                    name="productVariant" className='form-control border-green-700 border-2 rounded p-1 w-[70px] mt-2' >
                                    {
                                        productVariants.map((item: ProductVariantType, index: number) => {
                                            return <option value={item.code} key={index}>
                                                {item.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                        </div>
                        <div className='flex  justify-start items-center gap-2 rounded text-white p-2  bg-orange-500 w-fit'>
                            <button className='flex  items-center justify-center gap-1 outline-none' type='submit'><span><SlBasket /> </span> ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] flex mx-auto h-auto my-4 flex-col p-4'>
                    <div>
                        <h1 className='text-orange-400 text-xl font-semibold'>Product Details</h1>
                        <hr className='w-[150px]  text-orange-700  mt-2' />
                    </div>
                    <div className='mt-2'>
                        {productDetails?.description}
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProductDetailsPage

