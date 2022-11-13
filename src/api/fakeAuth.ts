import { useState } from "react"

type FakeAuthPayload = {
    name: string,
    email: string
}

const useFakeAuth = () => {
    const [isPending, setIsPending] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const fakeAuth = async (request: FakeAuthPayload) => {
        setError('')
        setIsPending(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fakeAuth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            })
            if (!response.ok) {
                const { errorMessage } = await response.json()
                throw new Error(errorMessage)
            } else {
                setIsSuccess(true)
            }
        } catch(error) {
            let errorMessage = 'unknown error'
            if (error instanceof Error) errorMessage = error.message
            setError(errorMessage)
        } finally {
            setIsPending(false)
        }
    }

    return { fakeAuth, isPending, isSuccess, error }
}

export default useFakeAuth