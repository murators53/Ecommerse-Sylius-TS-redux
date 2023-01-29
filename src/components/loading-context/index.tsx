import { createContext, useState } from "react";



export type LoadingContextValueType = {
    //param1 value e de oalbilir
    setLoading: (param1: boolean) => void
}

const defaultValue: LoadingContextValueType = {
    setLoading: () => {
        console.log('12 satir calisti');
    }
}

export const LoadingContext = createContext(defaultValue)

export default function Loading(props: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const contextValue: LoadingContextValueType = {
        setLoading: (param1: boolean) => {
            console.log('23. satir calisti');
            setIsLoading(param1)
        }
    }

    return (
        <LoadingContext.Provider value={contextValue}>
            <div className={[`loading`, (isLoading ? 'fixed z-50   w-full h-full  bg-[#00000022]  block' : '')].join('')}>
                <img className="absolute left-[50%] top-[30%] w-[64px]" src="assets/images/loading-1.gif" alt='loading' />
            </div>

            {props.children}
        </LoadingContext.Provider >
    )

}