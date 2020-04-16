const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:admin@cluster0-n9qm6.gcp.mongodb.net/test?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        await createMultipleToDos(
            client, [
                {
                    "title":"Conquer the world",
                    "priority": 5,
                    "createdAt": Date.now()
                },
                {
                    "title":"Make bread",
                    "priority": 5,
                    "createdAt": Date.now()
                },
                {
                    "title":"Meditate",
                    "priority": 5,
                    "createdAt": Date.now()
                },
            ])
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createToDo(client, newToDo) {
    const result = await client.db('done_it').collection('todos').insertOne(newToDo);
    console.log(`${result.insertedCount} new todo(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function createMultipleToDos(client, newToDos) {
    const result = await client.db('done_it').collection('todos').insertMany(newToDos);
    console.log(result);
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);