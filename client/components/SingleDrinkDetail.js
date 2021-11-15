import React from 'react';
import { connect } from 'react-redux';
import { fetchingSingleDrink } from '../store/singledrinks';

export class SingleDrinkDetail extends React.Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.props.getSingleDrink(id);
  }

  render() {
    const currentDrink = this.props.drinkFromRedux;
    return (
      <div className='singleDrinkContainer'>
        <div className='detailsWrapper'>
          <img
            className='detailsImage'
            src='https://images.unsplash.com/photo-1629311782811-0676689953a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80'
          ></img>
          
          <button className='detailsButton'>Add to cart here</button>
          <div className='singleDrinkDesc'>
            <p>Drink: {currentDrink.name}</p>
            <p>Base: {currentDrink.baseLiquor}</p>
            <p>Price: {currentDrink.price}</p>
            <p>Alcohol Content: {currentDrink.alcoholContent}</p>
            <p>Current Stock: {currentDrink.stock}</p>
            <p>{currentDrink.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    drinkFromRedux: state.singleDrink,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleDrink: (id) => {
      dispatch(fetchingSingleDrink(id));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleDrinkDetail);
