import { useState } from "react"

type ArtItem = {
    id: string
}

type ArtSearchResponse = {
    items: ArtItem[]
    found: number
}

const useSmkArtSearch = () => {
    const [isPending, setIsPending] = useState(false)
    const [result, setResult] = useState<ArtSearchResponse>()
    const [error, setError] = useState('')

    const smkArtSearch = async (request: string) => {
        setIsPending(true)
        try {
            const response = await fetch(`https://api.smk.dk/api/v1/art/search?keys=${request}&offset=0&rows=10&lang=en`)
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
    return { isPending, error, smkArtSearch, result }
}

export default useSmkArtSearch