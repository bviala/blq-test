import { useState } from "react"
import { Artwork, ArtworkSource } from "./collection";

const NUMBER_OF_ARTWORK_REQUESTED = 3;

type ArticArtwork = {
    id: string
    image_id: string
    image_src?: string
}

type ArticSearchApiResponse = {
    data: ArticArtwork[]
}

const articArtworkMapper = (artwork: ArticArtwork): Artwork => {
    return {
        source: ArtworkSource.Artic,
        id: artwork.id,
        imageId: artwork.image_id
    }
}

/* const getImageSrc = (artwork: Artwork) => {
    switch (artwork.source) {
        case ArtworkSource.Artic:
            return `https://www.artic.edu/iiif/2/${artwork.imageId}/full/843,/0/default.jpg`
    }
} */

const useArticSearch = () => {
    const [isPending, setIsPending] = useState(false)
    const [result, setResult] = useState<ArticArtwork[]>([])
    const [error, setError] = useState('')

    const ArticSearch = async (request: string) => {
        setError('')
        setResult([])
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
            
            const _result = response.data.map(artwork => ({
                ...artwork,
                image_src: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
            }))
            setResult(_result)
        } catch(error) {
            console.error(error);

            const errorMessage = error instanceof Error ? error.message : 'An unknown error occured'
            
            setError(errorMessage)
        } finally {
            setIsPending(false)
        }
    }
    return { isPending, error, smkArtSearch: ArticSearch, result }
}

export default useArticSearch