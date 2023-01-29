import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsSearch, SlBasket, AiOutlineMenu } from '../../Icon'
import { logout } from '../../redux/reducers/AuthSlice'
import { RootState } from '../../redux/store'


const Haeder = () => {
    const cartState = useSelector((state: RootState) => state.cart)
    const authState = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    console.log('AUTH SATE >>>', authState);

    return (
        <div className="p-5 font-yellow shadow flex justify-between items-center">
            <div>
                <Link to='/' className="text-4xl mr-1 sm:text-lg text-red-700 font-semibold uppercase ">lamek</Link>
                <Link to='/' className="text-4xl sm:text-lg text-black font-black uppercase">retlİ</Link>
            </div>
            <div className='flex items-center justify-center'>
                <input className='rounded-l p-2 outline-none flex-shrink-0 sm:w-10 w-full md:w-24' type="text" placeholder='Aradginiz sey' />
                <button className='flex items-center justify-center p-2  rounded-r text-slate-500 bg-white w-10 h-10'>
                    <BsSearch size={24} />
                </button>
            </div>
            <div>
                <div className='flex items-center justify-center gap-2'>
                    <ul className='flex gap-2 sm:hidden '>
                        {
                            authState.token ?
                                (
                                    <>
                                        <li>
                                            <a href="#" className='uppercase'>
                                                {authState.email}
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={() => {
                                                dispatch(logout())
                                            }}
                                                href="#" className='uppercase'>
                                                Logout
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/login" className=''>
                                                Login / Register
                                            </Link>
                                        </li>
                                    </>
                                )
                        }

                    </ul>
                    <div className='relative group'>
                        <button className='sm:flex hidden  text-white group-hover:bg-white group-hover:text-yellow-300 '>
                            <AiOutlineMenu size={20} />
                        </button>
                        <ul className='toggle-menu '>
                            <li>burcu</li>
                            <li>burcu</li>
                        </ul>
                    </div>
                    <Link to="/cart" className='relative'>
                        <SlBasket className='text-orange-400 font-extrabold' size={24} />
                        <span className='font-yellow text-white absolute top-[-10px] left-[-5px] bg-green-500 font-semibold first-letter: p-1 text-sm rounded-full w-5 h-5 flex items-center justify-center'>
                            {cartState.cart?.items.length}
                        </span>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Haeder