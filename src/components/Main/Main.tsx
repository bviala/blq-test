import useSmkArtSearch from '../../api/smkArtSearch'
import classes from './Main.module.css'
import { useEffect } from 'react'

const Main = () => {
    const { isPending, error, smkArtSearch, result } = useSmkArtSearch()

    useEffect(() => {
        smkArtSearch('devil')
    }, [])
    
    return (
        <main className={classes.main}>
            {isPending ? (<p>pending</p>) : error ? (<p>{error}</p>) : (
                result?.items.map(item => (
                    <p>{item.id}</p>
                ))
            )}
        </main>
    )
}

export default Main