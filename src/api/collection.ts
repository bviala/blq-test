import { useState } from "react"

export enum ArtworkSource {
    ARTIC = 'artic',
    SMK = 'smk'
  }

export type Artwork = {
    source: ArtworkSource,
    id: string,
    imageSrc: string
}

const addToCollection = async (artwork: Artwork) => {
    try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/collection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artwork),
        })
    } catch (error) {
        console.error(error);
    }
}

const useCollection = () => {
    const [collection, setCollection] = useState<Artwork[]>([])

    const getCollection = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/collection`)
            const json = await response.json()
            
            setCollection(json)
        } catch (error) {
            console.error(error);
        }
    }

    const removeArtworkFromCollection = async (artworkIndex: number) => {
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/collection`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: collection[artworkIndex].source,
                    id: collection[artworkIndex].id
                })
            })
            setCollection([
                ...collection.slice(0, artworkIndex),
                ...collection.slice(artworkIndex + 1)
            ])
        } catch (error) {
            console.error(error)
        }
    }

    return { collection, getCollection, removeArtworkFromCollection }
}

export { addToCollection, useCollection }