import useArticSearch from '../../api/articArtSearch'
import { FormEvent, useState } from 'react'
import classes from './Home.module.css'
import { Artwork, addToCollection } from '../../api/collection'

const App = () => {
    const { isPending, error, smkArtSearch, result: artworkList } = useArticSearch()

    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        smkArtSearch(searchQuery)
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
            artworkList.map((item, index) => (
                <div onDoubleClick={() => handleImageDoubleClick(item)} className={classes.artwork} key={index}>
                    <img alt={item.id} src={item.imageSrc}/>
                </div>
            ))
        )}
    </>)
}

export default App