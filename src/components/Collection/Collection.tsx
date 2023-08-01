import { useEffect } from "react"
import { Artwork, useGetCollection } from '../../api/collection'
import classes from './Collection.module.css'

const Collection = () => {
    const { collection, getCollection } = useGetCollection()

    useEffect(() => {
        getCollection()
    }, [])

    const handleImageDoubleClick = (artwork: Artwork, index: number) => {

    }

    return (<>
        {collection.map((artwork, index) => (
            <div className={classes.artwork} key={index} onDoubleClick={() => handleImageDoubleClick(artwork, index)}>
                <img alt={artwork.id} src={artwork.imageSrc}/>
            </div>
        ))}
    </>)
}

export default Collection