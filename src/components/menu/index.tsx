import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import useApi from "../../hooks/useApi"
import { RootState } from "../../redux/store"
import { CategoryType } from "../../Type"

const Menu = () => {
  const api = useApi()
  const categoryState = useSelector((state: RootState) => state.cateogry)


  return (
    <div className="flex h-10 bg-blue-400  ">
      <ul className=" flex justify-evenly w-full items-center text-white font-bold   ">
        <li><a href="/">Home</a></li>
        {
          categoryState.initialized === false ? (
            <li><a href="">LOADING ...</a></li>
          ) : (
            categoryState.categories.map((category: CategoryType, index) => {
              return <li key={index}>
                <a href={`category-details/${category.code}`}>{category.name}</a>
              </li>
            })
          )
        }
      </ul>
    </div>
  )
}

export default Menu