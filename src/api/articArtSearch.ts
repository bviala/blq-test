import { useState } from "react"
import { Artwork, ArtworkSource } from "./collection";

const NUMBER_OF_ARTWORK_REQUESTED = 3;

type ArticArtwork = {
    id: string
    image_id: string
}

type ArticSearchApiResponse = {
    data: ArticArtwork[]
}

const articArtworkMapper = (artwork: ArticArtwork): Artwork => {
    return {
        source: ArtworkSource.ARTIC,
        id: artwork.id.toString(),
        imageSrc: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    }
}

const useArticSearch = () => {
    const [isPending, setIsPending] = useState(false)
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [error, setError] = useState('')

    const ArticSearch = async (request: string) => {
        setError('')
        setArtworks([])
        setIsPending(true)

        const urlQueryParams = {
            q: request,
            limit: NUMBER_OF_ARTWORK_REQUESTED.toString(),
            fields: 'id, image_id',
            'query[exists][field]': 'image_id' // API to only return artworks with existing image_id
        }

        try {
            const responseStream = await fetch('https://api.artic.edu/api/v1/artworks/search?' + new URLSearchParams(urlQueryParams).toString())
            
            if (!responseStream.ok) {
                throw new Error(`${responseStream.status}: ${responseStream.statusText}`)
            }

            const response = await responseStream.json() as ArticSearchApiResponse
            
            const artworks = response.data.map(articArtworkMapper)
            setArtworks(artworks)
        } catch(error) {
            console.error(error);

            const errorMessage = error instanceof Error ? error.message : 'An unknown error occured'
            
            setError(errorMessage)
        } finally {
            setIsPending(false)
        }
    }
    return { isPending, error, smkArtSearch: ArticSearch, result: artworks }
}

export default useArticSearch