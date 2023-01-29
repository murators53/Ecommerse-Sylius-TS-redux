import { Link } from "react-router-dom"
import { ProductType } from "../../../Type"
import { AiFillEye, SlBasket } from '../../../Icon'

export type ProductBoxPropsType = {
    product: ProductType
}

export default function ProductBox(props: ProductBoxPropsType) {

    return (
        <div className=" card  items-center flex justify-center  ">
            <Link to={'/product-detail/'+ props.product.code}><img src={'https://ecommerce-api.udemig.dev' + props.product.images[0].path} alt=""
                className="img" /></Link>
            <h5>
                <Link to={'/product-detail/'+ props.product.code}>
                    <strong>{props.product.name.substring(15)}</strong>
                </Link>
            </h5>
            <p>This is a demo post</p>
            <div className="flex items-center justify-center gap-2 m-2 p-2">
                <Link to={'/product-detail/'+ props.product.code}  className="bg-orange-400 text-white rounded-full p-2"><AiFillEye /></Link>
                <button className="bg-green-700 text-white rounded-full p-2"><SlBasket /></button>
            </div>
        </div>
    )
}
