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
                <input autoFocus onChange={event => setSearchQuery(event.target.value)} type='text' placeholder='eg. blue'/>
                <input type='submit' value={isPending ? `looking for ${searchQuery}...` : 'search'} disabled={isPending} />
            </form>

            {error ? (<p className='error--text'>{error}</p>) : (
                result.map((item, index) => (
                    <div className={classes.artwork} key={index}>
                        <img alt={item.id} src={item.image_src}/>
                    </div>
                ))
            )}
        </main>
    )
}

export default App