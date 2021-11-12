import React from "react";

const SingleDrink = (props) =>{
  console.log(props, "THESE ARE THE PROPS FOR SINGLE ITEM")
  const {name, price, image, baseLiquor} = props.drink;
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
