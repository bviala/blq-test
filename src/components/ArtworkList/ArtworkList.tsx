import { Artwork } from "../../api/collection";
import classes from "./ArtworkList.module.css"

type ArtworkListProps = {
    artworks: Artwork[]
    handleImageDoubleClick?: (artwork: Artwork) => void
}

const ArtworkList = ({ artworks, handleImageDoubleClick } : ArtworkListProps) => {
    return (
        <>
            {artworks.map((item, index) => (
                <div onDoubleClick={() => handleImageDoubleClick?.(item)} className={classes.artwork} key={index}>
                    <img alt={item.id} src={item.imageSrc}/>
                </div>
            ))}
        </>
    )
}

export default ArtworkList