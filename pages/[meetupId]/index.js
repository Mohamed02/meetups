import { Fragment } from "react"
import Head from 'next/head'
import { MongoClient, ObjectId } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"
function MeetupDetails(props) {
   
    return <Fragment>
        <Head>
            <title> Meetups Details</title>
            <meta name ='descriptio'
            content='Meetup Details '/>
        </Head>
        <MeetupDetail 
        meetupData={props.meetupData}/>
    </Fragment>
  }

  export async function getStaticPaths(){

    const client=await MongoClient.connect('mongodb://localhost/meetups')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    
    client.close();

    return {
        fallback:true,
        paths: meetups.map(elem =>(
            {
                params: {
                    meetupId: elem._id.toString()
                }
            }
        ))
    }
  }
  export async function getStaticProps(context){

    const meetupId=context.params.meetupId;

    const client=await MongoClient.connect('mongodb://localhost/meetups')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    console.log("########## Meeutp id"+meetupId);
    
    const objId=new ObjectId(meetupId);
    const selectedMeetup = await meetupsCollection.findOne({_id:objId});
    console.log("########## 123:  "+selectedMeetup.title);
    client.close();

    return {
        props: {
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                image:selectedMeetup.image
            }
        }
    }
  }
  
  export default MeetupDetails
  