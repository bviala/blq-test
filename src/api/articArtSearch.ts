import { useState } from "react"

const NUMBER_OF_ARTWORK_REQUESTED = 3;

type ArtItem = {
    id: string
    image_id: string
}

type ArtSearchResponse = {
    data: ArtItem[]
}

const useArticSearch = () => {
    const [isPending, setIsPending] = useState(false)
    const [result, setResult] = useState<ArtSearchResponse>()
    const [error, setError] = useState('')

    const ArticSearch = async (request: string) => {
        setIsPending(true)

        const urlQueryParams = {
            q: request,
            limit: NUMBER_OF_ARTWORK_REQUESTED.toString(),
            fields: 'id, image_id',
            'query[exists][field]': 'image_id' // API to only return artworks with existing 
        }

        try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks/search?' + new URLSearchParams(urlQueryParams).toString())
            if (!response.ok) {
                const { errorMessage } = await response.json()
                throw new Error(errorMessage)
            }
            const responseResult = await response.json()
            setResult(responseResult)
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