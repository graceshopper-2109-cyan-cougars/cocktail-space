import React from 'react';
import SingleDrink from './SingleDrink';
import { setDrinks } from '../store/drinks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AllDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'All',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.props.invokeThunk();
  }
  render() {
    let drinks = this.props.drinksFromRedux;
    let drinksToRender = [];
    if (this.state.value === 'All') {
      drinksToRender = drinks;
    } else{
      drinksToRender = drinks.filter((drink) => drink.baseLiquor === this.state.value);
    }

    return (
      <>
        <form className='form__allDrinks'>
          <label>
            Select available drinks:
            <select
              className='select'
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option value='All'>All</option>
              <option value='Bourbon'>Bourbon</option>
              <option value='Tequila'>Tequila</option>
              <option value='Vodka'>Vodka</option>
              <option value='Rum'>Rum</option>
            </select>
          </label>
        </form>
        <div className='drink-list'>
          {drinksToRender.map((item, index) => {
            return (
              // <Link to={`/drinks/${item.id}`}>
              <SingleDrink key={item.id} drink={item} />
            );
          })}
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    drinksFromRedux: state.drinks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    invokeThunk: () => dispatch(setDrinks()),
  };
};

export default connect(mapState, mapDispatch)(AllDrinks);
