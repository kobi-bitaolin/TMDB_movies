import './home.css'
import { useState, useEffect } from 'react';
import Slider from '../../components/slider/Slider';

const Home = () => {

    const [homePageImages, setHomePageImages] = useState([]);
    const api_key = '4f5c14eec74770b20682e85f6fe0691b';

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.results);
                setHomePageImages(data.results);
            })
            .catch(err => console.log(err))
    }, [])

    console.log(homePageImages);

    return (
        <div className="home-page">
            <h1>top rating movies</h1>
            <div className="image-box">
                <div className="image">
                    <Slider homePageImages={homePageImages} />
                </div>
            </div>
        </div>

    )
}
export default Home;