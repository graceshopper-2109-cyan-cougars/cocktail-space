import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

const SingleDrink = (props) => {
  const { name, price, image, baseLiquor, description } = props.drink;
  return (
    // <div className='singleDrink'>
    //   <img src={image}></img>
    //   <p>{name}</p>
    //   <p>{price}</p>
    //   <p>{baseLiquor}</p>
    // </div>
    <div className='card'>
      <div className='card-header'>
        <img src={image} alt={name} />
      </div>
      <div className='card-body'>
        <span className='tag tag-black'>{baseLiquor}</span>
        <h4>{name}</h4>
        <p>{description}</p>
        {/* <Link to={`/drinks/${props.drink.id}`}> */}
        <button
          className='quizButton'
          onClick={() => {
            history.push(`/drinks/${props.drink.id}`);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default SingleDrink;
