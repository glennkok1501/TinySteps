import Home from "../components/homepage/Home";
import HomeSideBar from "../components/navigation/HomeSideBar";
import Navigationbar from "../components/navigation/Navigationbar";
import Searchbar from "../components/Searchbar";

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