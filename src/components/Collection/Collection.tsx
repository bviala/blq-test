import { useEffect, useState } from "react"
import { Artwork, useCollection } from '../../api/collection'
import classes from './Collection.module.css'
import ReactModal from "react-modal"

const Collection = () => {
    const { collection, getCollection, removeArtworkFromCollection } = useCollection()

    useEffect(() => {
        getCollection()
    }, [])

    const handleImageDoubleClick = (index: number) => {
        setArtworkPendingRemovalIndex(index)
    }

    const [artworkPendingRemovalIndex, setArtworkPendingRemovalIndex] = useState(-1)

    const confirmRemove = () => {
        removeArtworkFromCollection(artworkPendingRemovalIndex)
        closeModal()
    }

    const closeModal = () => {
        setArtworkPendingRemovalIndex(-1)
    }

    return (<>
        {collection.map((artwork, index) => (
            <div className={classes.artwork} key={index} onDoubleClick={() => handleImageDoubleClick(index)}>
                <img alt={artwork.id} src={artwork.imageSrc}/>
            </div>


        ))}
        <ReactModal
            isOpen={artworkPendingRemovalIndex >= 0}
            className={classes['remove-modal'] + ' modal-content'}
            overlayClassName={'modal-bg'}
        >
            <h3>Remove from collection?</h3>
            <button className="button--danger" onClick={confirmRemove}>Yes</button>
            <button className="button--white" onClick={closeModal}>Cancel</button>
        </ReactModal>
    </>)
}

export default Collection