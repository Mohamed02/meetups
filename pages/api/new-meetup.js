import {MongoClient} from 'mongodb'
async function handler(req, res){
    if(req.method=='POST'){
        console.log("****** req.method is POST");
        const data= req.body;
        
        const client=await MongoClient.connect('mongodb://localhost/meetups')
        const db = client.db("meetups");
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'})
    }
}
export default handler