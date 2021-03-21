import Navbar from './Navbar';
import { useState } from 'react';
//import CreateEvent from './CreateEvent';

function HomePage(props){
    return(
        <div>
            {/* { console.log("in Home", props.name, props.usname )} */}
            <Navbar name = { props.name } usname = {props.usname} />
        </div>
    );
}

export default HomePage;