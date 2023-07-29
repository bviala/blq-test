import { Link } from 'react-router-dom'
import classes from './Header.module.css'

const Header = () => {
    return (
    <header className={classes.header}>
        <div>
            <Link to='/'>
                <h1 className='primary--text'>
                    artexp
                </h1>
            </Link>
        </div>
        <div className={classes.menu}>
            <Link to='collection' className='primary--text'>collection</Link>
        </div>
    </header>
    )
}

export default Header