import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	showMap: false
    };
    this.displayMap = this.displayMap.bind(this);
  }

  componentDidMount() {
    this.setState({
      map: L.Wrld.map("map_" + this.props.tour._id, "03b416aac99d127d4e23a65ce028b60a", {
        center: [this.props.tour.locations[0].Latitude, this.props.tour.locations[0].Longitude],
        zoom: 16
      })
    });
  }

  displayMap() {
    this.setState({
      showMap: true
    });

    let { locations, location_names } = this.props.tour;
    let { map } = this.state;
    let counter = 0;
  
    setInterval(function() {
      if (counter == locations.length * 2) {
        return;
      }

      let current = Math.floor(counter / 2);

      if (counter % 2 == 0) {
        map.openPopup(location_names[current], [locations[current].Latitude, locations[current].Longitude]);

        map.setView([locations[current].Latitude, locations[current].Longitude], 19, {
            animate: true,
            durationSeconds: 3
        });
      } else {
        map.setView([locations[current].Latitude, locations[current].Longitude], 12.58, {
            animate: true,
            durationSeconds: 3
        });
      }

      counter = counter + 1;
    }, 4000);
  }

  render() {
  	const { tour } = this.props;
    const { showMap } = this.state;

    return (
		  <div className="row tour">
          <div className= "col-sm-2">
            <img className="circle" src={ "/guides/" + tour.guide_name } />
          </div>
            <div className="col-sm-10 info">
            <h4> { tour.guide_name } </h4>
            <h5> { tour.guide_rating } </h5>
            <h5> { tour.location_names.join(", ") }</h5>
            <button type="button" className="btn btn-primary general" onClick={ this.displayMap }> View Tour </button>
            <button type="button" className="btn btn-secondary general"> Purchase Tour</button>

            <div className={ showMap? "" : "hidden"}>
              <div style={{ position: "relative" }}>
                <div id={ "map_" + tour._id } style={{ height: "400px" }}></div>
              </div>
            </div>
          </div> 
        </div>
    );
  }
}
