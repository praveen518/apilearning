const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://praveen:praveen@cluster0-dv9vn.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
const DATABASE_NAME = "Transactions";
 
 
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;
 
app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("transaction");
       
        console.log("Connected to `" + DATABASE_NAME +"with the collection "+collection.collectionName+ "`!");
    });
});

 app.get("/users", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/users", (request, response) => {
    var obj=request.body;
    response.send(obj);
    console.log(obj);
    collection.insertOne(obj, function(err, res){
     if(err){
         console.log(err);
     }   
    });
});







