const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Client 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yilt8mt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const projectCollection = client.db('nayan-portfolio').collection('projects');

        app.get('/projects', async(req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            
            res.send(projects);
        })
    }

    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Nayan Portfolio is running.');
})





app.listen(port, () => {
    console.log('Listening to the port', port);
})