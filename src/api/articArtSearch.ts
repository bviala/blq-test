import { useState } from "react"

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
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${request}&limit=3&fields=image_id`)
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