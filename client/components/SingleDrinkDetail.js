import React from 'react';
import { connect } from 'react-redux'
import { fetchingSingleDrink } from '../store/singledrinks';

export class SingleDrinkDetail extends React.Component {
  async componentDidMount() {
    const { id } = this.props.match.params
    await this.props.getSingleDrink(id)
  }
}

const mapStateToProps = (state) => {
  return {
    singleDrinkDetail: state.singleDrink
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleDrink: (id) => {
      dispatch(fetchingSingleDrink(id))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleDrinkDetail)
