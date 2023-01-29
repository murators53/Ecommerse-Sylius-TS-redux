import { useDispatch } from "react-redux";
import BreadCrumb from "../../components/braedcrumb";
import useApi from "../../hooks/useApi";
import { setAuthToken } from "../../redux/reducers/AuthSlice";
import { AiOutlineUser, AiOutlineLock } from './../../Icon'

export default function LoginPage() {
    const api = useApi()
    const dispatch = useDispatch()
    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement)//name baridiran butun inputlari alir

        const formValue: any = Object.fromEntries(data.entries())

        console.log('>> FORM VAL', formValue);

        api.post('shop/authentication-token', formValue)
            .then((response: any) => {
                const customerId = response.data.customer.split('/').reverse()[0]
                const token = response.date.token

                console.log('TOKEN RESP>>', response);

                dispatch(setAuthToken(token))

                setTimeout(() => document.location.href = '/' , 1e3);

            })

    }

    return (
        <>
            <BreadCrumb items={[
                { url: '/', title: 'Home' },
                { url: '/product', title: 'Product' },
            ]} />
            <div className="w-fit p-4 gap-3 bg-white flex justify-center flex-col text-center mx-auto ">
                <div className="">
                    <h1 className="text-3xl font-medium">Login</h1>
                </div>
                <div>
                    <form onSubmit={onFormSubmit} className="flex gap-3 flex-col">
                        <div className="flex input-group  items-center justify-center bg-gray-200 w-fit mx-auto border-2 border-gray-300 rounded-sm p-2">
                            <AiOutlineUser />
                            <input type="email" name="email" placeholder="COUPEN CODE" className=" focus-within:bg-gray-200 px-2 bg-gray-200 border-none focus-within:outline-none" />
                        </div>
                        <div className="flex input-group  items-center justify-center bg-gray-200 w-fit mx-auto border-2 border-gray-300 rounded-sm p-2">
                            <AiOutlineLock />
                            <input type="password" name="password" placeholder="*******" className=" focus-within:bg-gray-200 px-2 bg-gray-200 border-none focus-within:outline-none" />
                        </div>

                        <div className="">
                            <button type="submit" className="btn text-white text-center hover:bg-orange-500 bg-orange-500 py-2 w-full mt-2 rounded font-medium">LOGIN</button>
                        </div>
                        <div className="flex justify-start">
                            <span>Have An Account? <button className="font-medium" type="submit">Register</button></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
