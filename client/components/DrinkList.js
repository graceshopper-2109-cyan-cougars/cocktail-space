import React from "react";
import SingleDrink from "./SingleDrink";
import { setDrinks } from "../store/drinks";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// const DrinkList extends React.Component {
//   constructor(){
//     super()
//     this.state = {
//       value: "all"
//     }
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange(evt){
//     this.setState({value: evt.target.value});
//   }
//   render(){
//     let drinksToRender = [];
//     if(this.state.value === "all"){
//       drinksToRender = this.props.drinks
//     }
//   }
// }

export class AllDrinks extends React.Component {
  constructor(){
    super()
    this.state= {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    this.setState({value: evt.target.value});
  }

  componentDidMount(){
    this.props.invokeThunk()
  }
  render() {
    let drinks = this.props.drinksFromRedux
    let drinksToRender = [];
    if(this.state.value === "All"){
      drinksToRender = drinks
    } else if(this.state.value === "Bourbon"){
      drinksToRender = drinks.reduce(drink => drink.baseLiquor === 'Bourbon')
    }
    console.log(this.props.drinksFromRedux, "********")

    const rowData = this.props.drinksFromRedux.map(row => {
      return (
        <tr key={row.id} className='drink-row'>
          <td><Link to={`/drinks/${row.id}`}>{row.name}</Link></td>
          <td><img src={row.image}></img></td>
        </tr>
      )
    })
    return (
      <div>
      <div id="allContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </table>
      </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    drinksFromRedux: state.drinks
  };
};

const mapDispatch = (dispatch) => {
  return {
    invokeThunk: () => dispatch(setDrinks())
  };
};

export default connect(mapState, mapDispatch)(AllDrinks);
