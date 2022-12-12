import { Link } from 'react-router-dom'

interface variantsInterface {
    variants: number[]
}

export const Variants = ({ variants }: variantsInterface) => {
    return (
        <>
            {variants.map(v => <Link to={`variant/${v}`}><h1>Вариант {v}</h1></Link>)}
        </>
    )
}