import useArticSearch from '../../api/articArtSearch'
import useSmkArtSearch from '../../api/smkArtSearch'
import classes from './Main.module.css'
import { useEffect } from 'react'

const Main = () => {
const { isPending, error, smkArtSearch, result } = useArticSearch()

    useEffect(() => {
        smkArtSearch('devil')
    }, [])
    
    return (
        <main className={classes.main}>
            {isPending ? (<p>pending</p>) : error ? (<p>{error}</p>) : (
                result?.data.map((item, index) => (
                    <div key={index}>
                        {item.id}
                        <img src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}/>
                    </div>
                ))
            )}
        </main>
    )
}

export default Main