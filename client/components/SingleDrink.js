import React from "react";

const SingleDrink = (props) =>{
  const {name, price, image, baseLiquor} = props;
  return (
    <div className='singleDrink'>
      <img src={image}></img>
      <p>{name}</p>
      <p>{price}</p>
      <p>{baseLiquor}</p>
    </div>
  )
}

export default SingleDrink;
