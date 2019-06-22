import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();

const isCloud = true;

let mongodbHost = '127.0.0.1';
let mongodbPort = '27017';
const mongodbDatabase = process.env.DBNAME;

let authenticate = '';
if (isCloud) {
  mongodbHost = process.env.HOST;
  mongodbPort = process.env.PORT;
  authenticate = `${process.env.DBUSER}:${process.env.DBPASSWORD}@`;
}

// connect string for mongodb server running locally, connecting to a database called test
var url =
  'mongodb://' +
  authenticate +
  mongodbHost +
  ':' +
  mongodbPort +
  '/' +
  mongodbDatabase;

export const fetchRecipes = () => {
  MongoClient.connect(url, function(err, db) {
    console.log('Connected correctly to server.');
    db.collection('recipes')
      .find({})
      .limit(20)
      .toArray((err, results) => {
        console.log(JSON.stringify(results[0]));
      });
    db.close();
    console.log('Connection to database is closed.');
  }); //connect()
};
