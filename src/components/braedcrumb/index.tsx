export type BreadCrumbItemType = {
    url: string,
    title: string
}

export type BreadCurmbsPropsType = {
    items: any
}

const BreadCrumb = (props: BreadCurmbsPropsType) => {
    console.log(props);
    return (
        <div className="w-[80%] flex justify-end items-center mx-auto mt-3 ">
            <ul className="breadcrumb">
                {
                    props.items.map((item: BreadCrumbItemType, index: number) => {
                        if (index < (props.items.length - 1)) {
                            return <li key={index}>
                                <a className="text-orange-400 font-bold uppercase" href={`${item.url}`}>
                                    &nbsp;{item.title} 
                                    <span className="text-gray-300"> / </span>
                                </a>
                            </li>
                        } else {
                            return <li key={index} className='text-slate-400 uppercase font-medium'>
                                 {item.title}
                            </li>
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default BreadCrumb