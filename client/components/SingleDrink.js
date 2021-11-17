import React from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

const SingleDrink = (props) => {
  const { name, price, image, baseLiquor, description } = props.drink;
  return (
    <div className='card'>
      <div className='card-header'>
        <img src={image} alt={name} />
      </div>
      <div className='card-body'>
        <span className='tag tag-black'>{baseLiquor}</span>
        <h4>{name}</h4>
        <p>{description}</p>
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
