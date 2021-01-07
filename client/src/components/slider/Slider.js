

import { useState, useEffect } from 'react';

const Slider = (props) => {

    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        let interval;

        console.log('useEffect');

        if (props.homePageImages.length) {
            interval = setInterval(() => {
                // const newIndex = (imageIndex + 1) % props.homePageImages.length;
                // setImageIndex(newIndex);
                console.log('props' ,props.homePageImages.length - 1 ,'inedx', imageIndex );
                if (props.homePageImages.length - 1 === imageIndex ) {
                    setImageIndex(0);
                } else {
                    setImageIndex((imageIndex) => imageIndex + 1)
                }
            }, 1000)
        }


        return () => {
            clearInterval(interval);
        };

    }, [props.homePageImages.length, imageIndex])

    let imageElement = (
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Movies_Coverart.jpg/220px-The_Movies_Coverart.jpg" alt="poster"
        />
    );

        // console.log('props', props.homePageImages[imageIndex], 'index',imageIndex);

    if (props.homePageImages.length && props.homePageImages[imageIndex].poster_path) {
        imageElement = (
            <img src={`https://image.tmdb.org/t/p/w500/${props.homePageImages[imageIndex].poster_path}`} alt="poster"/>
        )
    };

    return (
        <div>
            {imageElement}
        </div>
    )
}

export default Slider;
