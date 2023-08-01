import { useEffect } from "react"
import { useGetCollection } from '../../api/collection'
import ArtworkList from "../ArtworkList/ArtworkList"


const Collection = () => {
    const { collection, getCollection } = useGetCollection()

    useEffect(() => {
        getCollection()
    }, [])

    return (<>
        <ArtworkList artworks={collection} />
    </>)
}

export default Collection