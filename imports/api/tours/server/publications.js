import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Tours from '../tours';

Meteor.publish('tours.list', (search) => {
  	check(search, Object);

	const finalSearch = { 
		city: search.city
	};

	return Tours.find(finalSearch);
});
