const { MongoClient } = require('mongodb');
const Area = require('./models/db/Area');

async function main() {
 
  const uri = "mongodb+srv://api-vacunacion:qaTwwuJnyPRsx6ns@cluster0.ofgjo.mongodb.net/Vacunas";


  const client = new MongoClient(uri,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

  try {
      // Connect to the MongoDB cluster
      await client.connect();
      const Area=client.db("Vacunas").collection("areas");
      const session = client.startSession();
      
      await session.withTransaction(async()=>{
        const area=await Area.insertOne({name:'Desarrollo',siglas:'Dev',status:'Habilitado'},{session});
        console.log(area);
      });
     
      session.commitTransaction();
      
      session.endSession();
      
      // Make the appropriate DB calls

  } catch{
      // Close the connection to the MongoDB cluster
      
      await client.close();
      
  }
  
}

main().catch(console.error);