import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import BookDetails from './BookDetails'
import SimilarBooks from './SimilarBooks'
import PopularBooks from './PopularBooks'

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <BookDetails bookDetails={{ ...this.props.pageData }} />
        <hr />
        <SimilarBooks data={this.props.api2} />
        <hr />
        <PopularBooks data={this.props.api3} />
      </div>
    );
  }
}

function mapStateToProps({ pageData, api2, api3 }) {
  return {
    pageData,
    api2,
    api3
  }
}

export default connect(mapStateToProps)(App)
