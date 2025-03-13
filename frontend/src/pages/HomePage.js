import SchoolsList from "../components/homepage/SchoolsList";
import HomeSideBar from "../components/navigation/HomeSideBar";
import Navigationbar from "../components/navigation/Navigationbar";

const HomePage = () => {
    return ( 
        <>
            <Navigationbar />
            <div className="container-fluid">
                <div className="row h-100">
                    <div className="col-2">
                        <HomeSideBar />
                    </div>
                    <div className="col-10">
                        <SchoolsList />
                    </div>
                </div>
            </div>
        </>
        
     );
}
 
export default HomePage;