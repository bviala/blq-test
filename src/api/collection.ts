import { useState } from "react"

export enum ArtworkSource {
    Artic,
    Smk
  }

export type Artwork = {
    source: ArtworkSource,
    id: string,
    imageId: string
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

const useGetCollection = () => {
    const [collection, setCollection] = useState<Artwork[]>([])

    const getCollection = async () => {
        try {
            console.log("lul");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/collection`)
            const json = await response.json()
            
            setCollection(json)
        } catch (error) {
            console.error(error);
        }
    }

    return { collection, getCollection }
}

export { addToCollection, useGetCollection }