// // Store data in MongoDB

// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://localhost:27017/'; // MongoDB connection string
// const dbName = 'test'; // database name
// const collectionName = 'tester'; // collection name

// //we will return a promite
// //takes a single parameter, user_data
// async function insertData(user_data) {

//     //creating a new instance of the MongoClient class from the mongodb library
//     //url is the string connection to the MongoDB server
//     const client = new MongoClient(url);
//     console.log('client:', client);
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     const result = await collection.insertOne(user_data);
//     console.log('Data inserted successfully:', result.insertedId);
//     return result;
//   } catch (err) {
//     console.error('Error inserting data:', err);
//     throw err;
//   } finally {
//     await client.close(); //close conncetion to the database
//   }
// }

// module.exports = { insertData };
