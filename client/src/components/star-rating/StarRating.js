

import './star_rating.css';

function StarRating(props) {

    const totalStars = 10;

    console.log(props.star_rating);
    // Get precentage
    const starPrecentage = `${(props.star_rating / totalStars) * 100}%`;
    console.log(starPrecentage);

    return <div className="stars-outer">
        <div className="stars-inner" style={{ width: starPrecentage}}></div>
    </div>
}

export default StarRating;