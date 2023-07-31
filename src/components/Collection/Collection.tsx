import { useEffect } from "react"
import { useGetCollection } from '../../api/collection'


const Collection = () => {
    const { collection, getCollection } = useGetCollection()

    useEffect(() => {
        console.log('lol');
        
        getCollection()
    }, [])

    return (<>
        {collection.map(artwork => (
        <div key={artwork.id + artwork.source}>
            {`${artwork.id}, ${artwork.source}, ${artwork.imageId}`}
        </div>
        ))}
    </>)
}

export default Collection