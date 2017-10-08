import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Tours from '../tours';

Meteor.publish('tours.list', (search) => {
  	check(search, Object);
  	
	return Tours.find({ city: search.city });
});
