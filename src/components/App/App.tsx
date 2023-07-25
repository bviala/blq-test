import useArticSearch from '../../api/articArtSearch'
import { FormEvent, useState } from 'react'
import classes from './App.module.css'

const App = () => {
const { isPending, error, smkArtSearch, result } = useArticSearch()

    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        smkArtSearch(searchQuery)
    }
    
    return (
        <main className={classes.main}>
            <form onSubmit={handleSubmit}>
                <input autoFocus onChange={event => setSearchQuery(event.target.value)} type='text'/>
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

export default App