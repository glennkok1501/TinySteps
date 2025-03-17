import Home from "../components/homepage/Home";
import Navigationbar from "../components/navigation/Navigationbar";

const HomePage = () => {
    return ( 
        <>
            <Navigationbar />
            <div className="container">
                <Home />
            </div>
        </>
        
     );
}
 
export default HomePage;