import { Axios, AxiosResponse } from "axios"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import BreadCrumb from "../../components/braedcrumb"
import { LoadingContext } from "../../components/loading-context"
import useApi from "../../hooks/useApi"
import { RootState } from "../../redux/store"
import { CountryType, ProvinceType } from "../../Type"
import { useState } from 'react'

export default function CheckoutPage() {
    const cartState = useSelector((state: RootState) => state.cart)
    const api: Axios = useApi()
    const dispatch = useDispatch()
    const loadingContext = useContext(LoadingContext)

    const [countries, setCountries] = useState<CountryType[]>([])
    const [initialized, setInitialized] = useState<boolean>(false)
    const [selectedCountry, setSelectedCountry] = useState<CountryType | undefined>(undefined)

    if ((cartState.cart === null) || (cartState.cart.items.length === 0)) {
        return (
            <div className="text-center w-full h-[500px]  flex items-center justify-center">
                <span className="bg-white flex items-center justify-center text-center w-fit px-3 h-[100px] text-3xl font-semibold">
                    Please add some item to cart!
                </span>
            </div>
        )
    }

    if (initialized === false) {
        loadingContext.setLoading(true);//loading yukleme 
        //immediate fon. oldg. icin noktali virgule dikakte edeblim
        (async () => {
            //burasi asenkron region

            const countryResponse: AxiosResponse<CountryType[]> = await api.get<CountryType[]>('shop/countries?page=1&itemsPerPage=30')
            console.log('COUNT RESP >>>', countryResponse.data);

            setCountries(countryResponse.data)
            setInitialized(true)
            loadingContext.setLoading(false);//loading kapatma
        })()
    }

    console.log('SELECTED COUNTRY>>>', selectedCountry);

    return (
        <>
            <BreadCrumb items={[
                { url: '/', title: 'Home' },
                { url: '/cart', title: 'Cart' },
                { url: '/checkout', title: 'checkout' },
            ]} />
            <div className=" w-[80%] gap-5 my-5  h-full flex justify-center mx-auto items-start md:flex-col-reverse md:text-sm">
                <div className="w-[60%] md:w-full">
                    <div className="bg-white  p-3 rounded w-full">
                        <h1 className="mb-5 text-2xl font-medium">Your Detail</h1>
                        <div className="flex flex-col gap-3">
                            <div className=" flex items-center gap-3 justify-center ">
                                <input className="border-2 p-2 w-full rounded" type="text" placeholder="ENTER YOUR FIRST NAME" />
                                <input className="border-2 p-2 w-full rounded" type="text" placeholder="ENTER YOUR LAST NAME" />
                            </div>
                            <div className=" flex items-center gap-3 justify-center ">
                                <input className="border-2 p-2 w-full rounded" type="text" placeholder="ENTER EMAIL ADDRESS " />
                                <input className="border-2 p-2 w-full rounded" type="text" placeholder="ENTER MOBILE NUMBER" />
                            </div>
                            <div className="">
                                <input className="border-2 p-2 w-full rounded" type="select" placeholder="STREET ADDRESS" />
                            </div>
                            <div className=" flex items-start gap-3 justify-center ">
                                <select
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        let selectedCountry = countries.find((item) => item.code === event.target.value)
                                        setSelectedCountry(selectedCountry)
                                    }}
                                    name="country"
                                    required
                                    className="form-select border-2 placeholder:text-gray-400" >
                                    <option className=" text-gray-500">PLEASE COUNTRY SELECT</option>
                                    {
                                        countries.map((item: CountryType, index: number) => {
                                            return <option value={item.code} key={index}>
                                                {item.name}
                                            </option>
                                        })
                                    }
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                {
                                    ((selectedCountry && (selectedCountry.provinces.length > 0))
                                        ? (
                                            <select name="city" required className="form-select border-2 placeholder:text-gray-400" >
                                                <option>[PLEASE SELECT]</option>
                                                {
                                                    selectedCountry.provinces.map((item: ProvinceType, index) => {
                                                        return <option value={item.code} key={index}>
                                                            {item.name}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        ) : (
                                            <input type="text" name="city" className="form-control"
                                                placeholder="ENTER PROVINCE" />
                                        )
                                    )
                                }

                            </div>
                            <div className="">
                                <input type="text" name="postcode" className="form-control placeholder:text-gray-400"
                                    placeholder="ENTER YOUR ZIPCODE" />
                                {/* <select className="form-select border-2 placeholder:text-gray-400" >
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select> */}
                            </div>
                            <div className="">
                                <textarea name="notes" className="form-control  rounded placeholder:text-gray-400" placeholder="NOTES ABOUT TOUR ORDER"></textarea>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="">
                                    <button className="btn  tracking-tight text-white text-center hover:bg-orange-500 bg-orange-500 py-2 w-full mt-2 rounded">
                                        PROCEDD TO PAYMENT
                                    </button>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input rounded" type="checkbox" value="" />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Create An Acount?
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={`w-[40%] md:flex md:flex-row md:justify-between md:w-full md:gap-3`}>
                    <div className="p-3 rounded mb-5 bg-white md:w-[50%]">
                        <h1 className="text-2xl font-medium">Your Order</h1>
                        <div className="flex flex-row justify-between mx-2 mt-4">
                            <span>PRODUCT</span>
                            <span className="text-gray-500">TOTAL</span>
                        </div>
                        <hr className="opacity-10 mt-1" />
                        <div className="flex flex-row justify-between mx-2">
                            <span>x</span>
                            <span className="text-green-600 font-semibold">Free</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex flex-row justify-between mx-2 mb-2">
                            <span className="font-semibold">x</span>
                            <span className="font-semibold">Y</span>
                        </div>
                    </div>
                    <div className="p-3 bg-white rounded md:w-[50%]" >
                        <h1 className="text-2xl font-medium mb-3">Check Payment</h1>
                        <div className="my-3">
                            <span className="text-gray-400">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode</span>
                            <button className="btn tracking-tight text-white text-center hover:bg-blue-500 bg-blue-500 py-2 w-full mt-2 rounded">
                                PLACE HORDER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
