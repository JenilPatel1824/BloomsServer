const fs = require('fs');
const xlsx = require('xlsx');
const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb+srv://JenilPatel:GJ33d0779@dbb.hjoqiv2.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB connection string

// Database and collection names
const dbName = 'dbb'; // Replace 'your_database' with your database name
const collectionName = 'markkl'; // Replace 'your_collection' with your collection name

// Excel file path
const excelFilePath = '/Users/jenil/Downloads/internal co.xlsx'; // Replace with the path to your Excel file

// Connect to MongoDB and upload Excel data
async function uploadExcelData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read Excel file and insert data into MongoDB
    const data = [];
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // Push each row into the data array
    jsonData.forEach((row) => {
      data.push(row);
    });

    // Insert all data into the MongoDB collection
    if (data.length > 0) {
      await collection.insertMany(data);
      console.log('Excel file successfully processed and data inserted into MongoDB');
    } else {
      console.log('Excel file is empty. No data inserted into MongoDB.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

// Run the function to connect to MongoDB and insert data
uploadExcelData().catch(console.error);
