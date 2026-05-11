import './home.css'
import { useState, useEffect } from 'react';
import Slider from '../../components/slider/Slider';

const Home = () => {

    const [homePageImages, setHomePageImages] = useState([]);

    useEffect(() => {
        fetch('/api/movies/list/top_rated')
            .then(res => res.json())
            .then(data => {
                setHomePageImages(data.results);
            })
            .catch(err => console.log(err))
    }, [])

    // console.log(homePageImages);

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