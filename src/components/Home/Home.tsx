import useArticSearch from '../../api/articArtSearch'
import { FormEvent, useState } from 'react'
import classes from './Home.module.css'
import { Artwork, addToCollection } from '../../api/collection'
import ArtworkList from '../ArtworkList/ArtworkList'

const App = () => {
    const { isPending, error, articSearch, artworks } = useArticSearch()

    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        articSearch(searchQuery)
    }

    const handleImageDoubleClick = (artwork: Artwork) => {
        addToCollection(artwork)
    }
    
    return (<>
        <form className={classes['search-form']} onSubmit={handleSubmit}>
            <input autoFocus onChange={event => setSearchQuery(event.target.value)} type='text' placeholder='eg. blue'/>
            <input type='submit' value={isPending ? `looking for ${searchQuery}...` : 'search'} disabled={isPending} />
        </form>

        {error ? (<p className='error--text'>{error}</p>) : (
            <ArtworkList artworks={artworks} handleImageDoubleClick={handleImageDoubleClick} />
        )}
    </>)
}

export default App