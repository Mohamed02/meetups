import { Fragment } from "react"
import classes from './MeetupDetail.module.css'

function MeetupDetail(props) {
   
    return <section className={classes.detail}>
        <img 
            src={props.meetupData?.image}
            alt={props.meetupData?.title}
            />
        <h1>{props.meetupData?.title}</h1>
        <address>{props.meetupData?.address}</address>
        <p> {props.meetupData?.description}</p>
    </section> 
  }
  
  export default MeetupDetail
  