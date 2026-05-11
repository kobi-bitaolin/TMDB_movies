import './slider.css';
import { useState, useEffect } from 'react';

const Slider = (props) => {

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!props.homePageImages.length) return;

        const interval = setInterval(() => {
            setImageIndex((i) => (i + 1) % props.homePageImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [props.homePageImages.length])

    let imageElement = (
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Movies_Coverart.jpg/220px-The_Movies_Coverart.jpg" alt="poster"
        />
    );

    if (props.homePageImages.length && props.homePageImages[imageIndex].poster_path) {
        imageElement = (
            <img src={`https://image.tmdb.org/t/p/w500/${props.homePageImages[imageIndex].poster_path}`} alt="poster"/>
        )
    };

    return (
       <div className="slider-container">
        <div className="slider-image-wrapper">
            {imageElement}
        </div>
        {/* Optional: add a progress bar or dots at the bottom */}
    </div>
    )
}

export default Slider;
