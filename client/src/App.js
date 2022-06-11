import "./fonts/stylesheet.css";
import "./style.scss";

import Navbar from "./components/Navbar/Navbar";
import Schedule from "./components/Schedule/Schedule";

function App() {
    return (
        <div className="wrapper">
            <div className="for-mobiles">
                Sorry, this site is for computer devices only!
                <br/>
                You can download NURE schedule in App store OR Play market.
            </div>
            
            <div className="App">
                <Navbar />
                <Schedule />
            </div>
        </div>
    );
}

export default App;
