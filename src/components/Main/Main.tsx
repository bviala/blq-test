import classes from './Main.module.css'

const Main = () => {
    return (
        <main className={classes.main}>
            <h1 className='primary--text'>A better way <br/>to enjoy every day.</h1>
            <p>Be the first to know when we launch</p>
            <button>Request an invite</button>
        </main>
    )
}

export default Main