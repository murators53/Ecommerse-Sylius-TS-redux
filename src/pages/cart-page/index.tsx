//context tumapi icin kucuk apilerde redux gibi buyuk yapi kullanmaya gerek kalmaz contex sayesidnde
import { AiFillPauseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import BreadCrumb from "../../components/braedcrumb";
import useApi from "../../hooks/useApi";
import { RootState } from "../../redux/store";
import { CartItemType, CartType } from "../../Type";
import { AiFillCloseCircle, MdArrowBackIosNew } from './../../Icon'
import axios, { Axios, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { refreshCart, setCart } from "../../redux/reducers/CartSlice";
import { useContext } from "react";
import { LoadingContext } from "../../components/loading-context";
import { Link } from "react-router-dom";

export default function CartPage() {
    const cartState = useSelector((state: RootState) => state.cart)
    const api: Axios = useApi()
    const dispatch = useDispatch()
    const loadingContext = useContext(LoadingContext)


    function onItemDelete(itemId: number) {
        if (!cartState.cart) return

        loadingContext.setLoading(true)//loading showing

        api.delete<CartType>(`shop/orders/` + cartState.cart.tokenValue + `/items/` + itemId)
            .then((response: AxiosResponse<CartType>) => {
                // loadingElement[0].classList.remove('active')2.yontemde dolayi deactive
                loadingContext.setLoading(false)//loading not showing

                dispatch(refreshCart())
            })
    }


    function onQuantityChange(itemId: number, quantity: number | string) {
        ///api/v2/shop/orders/{tokenValue}/items/{orderItemId}
        if (!cartState.cart) return

        loadingContext.setLoading(true)//loading showing


        /* const loadingElement = document.getElementsByClassName("loading")//1.yontem
        loadingElement[0].classList.add('active')//1.yontem */
        // 2 .yonyemi kullangimizdan burayi kaldirdik

        const patchData = {
            "quantity": parseInt(quantity.toString())
        }
        //api.get('url',config)
        //api.post('url',postData, config) config ile sadece this patch istegi incin config
        //ile 3. parametre olarak duzenledigimiz sekilde gonderebliyoruz
        if (cartState.cart) {
            api.patch<CartType>(`shop/orders/` + cartState.cart?.tokenValue + `/items/` + itemId,
                patchData,
                {
                    headers: {
                        "content-type": "application/merge-patch+json"
                    }
                }
            )
                .then((response: AxiosResponse<CartType>) => {
                    // loadingElement[0].classList.remove('active')2.yontemde dolayi deactive
                    loadingContext.setLoading(false)//loading not showing
                    dispatch(setCart(response.data))
                    console.log('RESSS >>>.', response);
                })
        }
    }

    const totalItemQuantity = cartState.cart?.items.reduce((total: number, item: CartItemType) => {
        return total + item.quantity
    }, 0)

    const totalItemPrice = cartState.cart?.items.reduce((total: number, item: CartItemType) => {
        return total + item.total
    }, 0)

    return (
        <>
            <BreadCrumb items={[
                { url: '/', title: 'Home' },
                { url: '/cart', title: 'Cart' },
            ]} />

            <div className=" w-[80%] gap-5 my-5  h-full flex justify-center mx-auto items-start md:flex-col-reverse md:text-sm">
                <div className="w-[100%]">
                    <div className="bg-white m-2 p-3 rounded w-full">
                        <h1 className="mb-5 text-2xl font-medium">My Cart(02)</h1>
                        <hr />
                        <div className="">
                            <table className="table table-borderless ">
                                <thead className="bg-gray-200 ">
                                    <tr >
                                        <th className="font-extralight w-[30%]">ITEM</th>
                                        <th className="font-extralight">PRICE</th>
                                        <th className="font-extralight">QUANTITY</th>
                                        <th className="font-extralight">TOTAL</th>
                                        <th className="font-extralight"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartState.cart?.items.map((item: CartItemType, index) => {
                                            return (
                                                <tr key={index} >
                                                    <th className="uppercase font-normal">
                                                        <span>{item.productName}</span>
                                                    </th>
                                                    <td className="text-gray-400">${item.unitPrice}</td>
                                                    <td>
                                                        <div className="product-quantity  bg-red-800 w-16 h-full ">
                                                            <input type="number" name='quantity' value={item.quantity} min={0}
                                                                className='border-gray-300 border-2 p-2 w-full '
                                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                    onQuantityChange(item.id, event.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-gray-400">
                                                        ${item.total}
                                                    </td>
                                                    <td className="flex justify-center mt-1 text-gray-400">
                                                        <a className="hover:text-orange-600" onClick={() => onItemDelete(item.id)}>
                                                            <AiFillCloseCircle />
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex  items-center gap-2 mt-6">
                        <MdArrowBackIosNew />
                        <button className="font-semibold">BACK TO SHOPPING</button>
                    </div>
                </div>

                <div className={`w-full md:${'flex flex-row justify-between gap-5 w-[100%]'} `}>
                    <div className="p-3 rounded mb-4 bg-white">
                        <h1 className="text-2xl font-medium">Price Details</h1>
                        <div className="flex flex-row justify-between mx-2 mt-4">
                            <span>Price (
                                {totalItemQuantity}
                                &nbsp;
                                items)

                            </span>
                            <span className="text-gray-500">${totalItemPrice}</span>
                        </div>
                        <div className="flex flex-row justify-between mx-2">
                            <span>x</span>
                            <span className="text-green-600 font-semibold">Free</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex flex-row justify-between mx-2 mb-2">
                            <span className="font-semibold">x</span>
                            <span className="font-semibold">Y</span>
                        </div>
                        <Link to='/checkout' className="btn text-white md:text-sm hover:bg-orange-500 bg-orange-500 py-2 text-center w-full mt-2 rounded">
                            PROCOEED TO CHECKOUT
                        </Link>
                    </div>
                    <div className="p-3 bg-white rounded" >
                        <h1 className="text-2xl font-medium mb-3">Coupons & Offers</h1>
                        <div className="mt-5">
                            <input type="text" placeholder="COUPEN CODE" className="form-control placeholder:text-gray-400 mb-2" />
                            <button className="btn text-white text-center hover:bg-orange-500 bg-orange-500 py-2 w-full mt-2 rounded">APPLY CUPON</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}