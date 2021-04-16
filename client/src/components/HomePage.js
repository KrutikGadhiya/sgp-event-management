import Navbar from './Navbar'

function HomePage(props){
    return(
        <div>
            <Navbar name = { props.name } usname = {props.usname} />
        </div>
    );
}

export default HomePage;