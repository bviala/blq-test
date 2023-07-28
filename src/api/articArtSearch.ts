import { useState } from "react"

const NUMBER_OF_ARTWORK_REQUESTED = 3;

type ArticArtwork = {
    id: string
    image_id: string
    image_src?: string
}

type ArticSearchApiResponse = {
    data: ArticArtwork[]
}

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
            const response = await fetch('https://api.artic.edu/api/v1/artworks/search?' + new URLSearchParams(urlQueryParams).toString())
            if (!response.ok) {
                const { errorMessage } = await response.json()
                throw new Error(errorMessage)
            }
            const responseResult = await response.json() as ArticSearchApiResponse
            const _result = responseResult.data.map(artwork => ({
                ...artwork,
                image_src: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
            }))
            setResult(_result)
        } catch(error) {
            let errorMessage = 'unknown error'
            if (error instanceof Error) errorMessage = error.message
            setError(errorMessage)
        } finally {
            setIsPending(false)
        }
    }
    return { isPending, error, smkArtSearch: ArticSearch, result }
}

export default useArticSearch