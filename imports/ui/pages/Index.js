import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { Meteor } from 'meteor/meteor';
import Tours from '../../api/tours/tours';
import container from '../../modules/container';
import Result from '../components/Result';

const city = new ReactiveVar("");
const themes = new ReactiveVar([]);

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      formPos: 1,
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.selectThemes = this.selectThemes.bind(this);
    this.setThemes = this.setThemes.bind(this);
  }

  componentDidMount() {
  	$(".2").hide();
  	$(".3").hide();
  }

  next() {
  	const current = this.state.formPos;

  	$("." + current).fadeOut(400);
  	$(" [name='input_" + (current + 1) + "']").val("");
  	$("." + (current + 1)).delay(410).fadeIn(function(){
  		$(" [name='input_" + (current + 1) + "']").focus();
  	});

  	this.setState({ 
  		formPos: current + 1
  	});
  }

  prev() {
  	const current = this.state.formPos;

  	$("." + current).fadeOut(400);
  	$("." + (current - 1)).delay(410).fadeIn(function(){
  		$(" [name='input_" + (current + 1) + "']").focus();
  		$(" [name='input_" + (current + 1) + "']").blur();
  	});

  	this.setState({ 
  		formPos: current - 1
  	});
  }

  selectPlace(place) {
  	if (place.length == 0) {
  		return;
  	}

  	city.set(place[0]);

  	this.next();
  }

  selectThemes() {
  	if (!themes.get().length) {
  		return;
  	}

  	this.next();
  }

  setThemes(themesArg) {
  	themes.set(themesArg);
  }

  render() {
  	const { results } = this.props;
    const cities = ['London', 'New York City', 'Tokyo', 'Paris', 'San Francisco', 'Mexico City', "Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
    const themes = ['Adventure', 'Sights', 'Shopping', 'Food', 'Culture', 'Family'];

    return (
	  	<div className="Index">
	  		<div className="section 1">
			    <Grid>
			    	<Col md={ 6 }>
						<h2 className="text-center">
							Step 1.
						</h2>    			    	
			    		<Typeahead
			    			bsSize={ "lg" }
			    			inputProps={ { name: "input_1" } }
							options={ cities }
							onChange={ this.selectPlace }
							placeholder="Where would you like to go?"
						/> 
					</Col>
				</Grid>
			</div>
	  		
	  		<div className="section 2">
			    <Grid>
			    	<Col md={ 6 }>
						<h2 className="text-center">
							Step 2.
						</h2> 
			    		<Typeahead
			    			inputProps={ { name: "input_2" } }
							options={ themes }
							multiple
							onChange={ this.setThemes }
							placeholder="What are you looking for? (Adventure, Shopping, etc...)"
						/> 
						<nav aria-label="...">
						  <ul className="pager">
						    <li className="previous">
						    	<a onClick={ (e) => { e.preventDefault(); this.prev(); } } href="#">
						    		<span aria-hidden="true">&larr;</span> Back
						    	</a>
						    </li>
						    <li className="next">
						    	<a onClick={ (e) => { e.preventDefault(); this.selectThemes() } } href="#">
						    		Continue <span aria-hidden="true">&rarr;</span>
						    	</a>
						    </li>
						  </ul>
						</nav>
					</Col>
				</Grid>
			</div>

	  		<div className="section 3">
			    <Grid>
			    	<Col md={ 12 }>
				    	<Row>
					    	<Col md={ 6 }>
								<h2 className="text-center">
									Step 3.
								</h2> 
								<nav aria-label="...">
								  	<ul className="pager">
									    <li className="previous">
									    	<a onClick={ (e) => { e.preventDefault(); this.prev(); } } href="#">
									    		<span aria-hidden="true">&larr;</span> Back
									    	</a>
									    </li>
								  	</ul>
								</nav>
							</Col>
						</Row>
						{
						  	results.length > 0 ?
								results.map((result) => (
							      <Result key={ result._id } tour={ result }/>
							    ))
						  	:
						  		<div className="text-center">
						  			No tours available. 
						  		</div>
						}   
					</Col>
				</Grid>
			</div>
	  	</div>
    );
  }
}

export default container((props, onData) => {
  const subscription = Meteor.subscribe('tours.list', { city:city.get() || "New York City", themes: themes.get() });

  if (subscription.ready()) {
    const results = Tours.find().fetch();

    onData(null, { results });
  }
}, Index);
