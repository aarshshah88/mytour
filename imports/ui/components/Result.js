import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	showMap: false
    };
  }

  componentDidMount() {

  }

  render() {
  	const { tour } = this.props;

    return (
		<div className="row tour">
            <div className= "col-sm-2">
              <img className="circle" src={ "/guides/" + tour.guide_name } />
            </div>
            <div className="col-sm-10 info">
            <h4> { tour.guide_name } </h4>
            <h5> { tour.guide_rating } </h5>
            <h5> { tour.location_names.join(", ") }</h5>
            <h5> { tour.theme.join(", ") } </h5>
            <button type="button" className="btn btn-primary general"> View Tour </button>
            <button type="button" className="btn btn-secondary general"> Purchase Tour</button>

            </div> 
        </div>
    );
  }
}
