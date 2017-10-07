import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';

const Tours = new Mongo.Collection('Tours');
export default Tours;

Tours.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tours.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
