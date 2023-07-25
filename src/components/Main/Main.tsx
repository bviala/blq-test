import useArticSearch from '../../api/articArtSearch'
import useSmkArtSearch from '../../api/smkArtSearch'
import classes from './Main.module.css'
import { FormEvent, useEffect, useState } from 'react'

const Main = () => {
const { isPending, error, smkArtSearch, result } = useArticSearch()

    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        smkArtSearch(searchQuery)
    }

    
    
    return (
        <main className={classes.main}>
            <form onSubmit={handleSubmit}>
                <input onChange={event => setSearchQuery(event.target.value)} type='text'/>
                <input type='submit' value={`show me ${searchQuery}`} />
            </form>


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