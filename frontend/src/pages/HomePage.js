import Home from "../components/homepage/Home";
import Sidebar from "../components/navigation/Sidebar";

const HomePage = () => {
    return ( 
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <Home />
            </main>
        </div>
    );
}
 
export default HomePage;