import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList"
import Layout from "../components/layout/Layout"
import { useState, useEffect } from "react";
import {MongoClient} from 'mongodb';

function HomePage(props) {
    return   <>
    <Head>
        <title>React Meetups</title>
        <meta name ='description'
        content='Browser a huge list of meetups'/>
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>
    
        
  }

export async function getStaticProps(){

    const client=await MongoClient.connect('mongodb://localhost/meetups')
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const results = await meetupsCollection.find({}).toArray();
    const meetups= results.map((elem,index)=>{
        return {
            id:elem._id.toString(),
            title:elem.title,
            address:elem.address,
            image:elem.image
        }
    })
    console.log("&&&&&&&"+JSON.stringify(meetups))
    client.close();
    return {
        props:{
            meetups:meetups
        },
        revalidate: 10
    }
}
//   export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return {
//         props:{
//             meetups:DUMMY_MEETUPS
//         }
//     }
//   }
  
  export default HomePage
  