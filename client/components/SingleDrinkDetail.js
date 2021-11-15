import React from 'react';
import { connect } from 'react-redux'
import { fetchingSingleDrink } from '../store/singledrinks';

export class SingleDrinkDetail extends React.Component {
  async componentDidMount() {
    const { id } = this.props.match.params
    await this.props.getSingleDrink(id)
  }

  render() {
    const currentDrink = this.props.drinkFromRedux
    return(
      <div>
        <img className ='detailsImage' src = {currentDrink.image}></img>
        <div className='detailsWrapper'>
          <button className = 'detailsButton'>Add to cart here</button>

        <p>Drink: {currentDrink.name}</p>
        <p>Base: {currentDrink.baseLiquor}</p>
        <p>Price: {currentDrink.price}</p>
        <p>Alcohol Content: {currentDrink.alcoholContent}</p>
        <p>Current Stock: {currentDrink.stock}</p>
        <p>{currentDrink.description}</p>
        </div>
      </div>
    )
  }
}


const mapState = (state) => {
  return {
    drinkFromRedux: state.singleDrink
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleDrink: (id) => {
      dispatch(fetchingSingleDrink(id))
    }
  }
}

export default connect(mapState,mapDispatch)(SingleDrinkDetail)
