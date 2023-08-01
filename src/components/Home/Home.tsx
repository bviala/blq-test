import useArticSearch from '../../api/articArtSearch'
import { FormEvent, useState } from 'react'
import classes from './Home.module.css'
import { Artwork, addToCollection } from '../../api/collection'

const App = () => {
    const { isPending, error, articSearch, artworks } = useArticSearch()

    const [searchQuery, setSearchQuery] = useState<string>('')
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        articSearch(searchQuery)
    }
    
    const handleImageDoubleClick = (artwork: Artwork, index: number) => {
        addToCollection(artwork)
        
        setLikePendingArtworkIndex(index)
        setTimeout(() => {
            setLikePendingArtworkIndex(-1)
        }, 2000);
    }
    const [likePendingArtworkIndex, setLikePendingArtworkIndex] = useState(-1)
    
    return (<>
        <form className={classes['search-form']} onSubmit={handleSubmit}>
            <input autoFocus onChange={event => setSearchQuery(event.target.value)} type='text' placeholder='eg. blue'/>
            <input type='submit' value={isPending ? `looking for ${searchQuery}...` : 'search'} disabled={isPending} />
        </form>

        {error ? (<p className='error--text'>{error}</p>) : 

            artworks.map((item, index) => (
                <div onDoubleClick={() => handleImageDoubleClick?.(item, index)} className={classes.artwork} key={index}>
                    <img alt={item.id} src={item.imageSrc}/>
    
                    <svg className={`${classes['heart-icon']} ${likePendingArtworkIndex == index ? classes['heart-icon--active']: ''}`} 
                        viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.042 8.345c0 0-2-4.262-6.5-4.262-4.917 0-7.5 4.167-7.5 8.333 0 6.917 14 15.5 14 15.5s13.916-8.5 13.916-15.5c0-4.25-2.666-8.333-7.416-8.333s-6.5 4.262-6.5 4.262z"></path>
                    </svg>
                </div>
            )
        )}
    </>)
}

export default App