import React, {useState, useEffect} from "react";
import "./App.css";

const restUrl = "https://api." + window.location.hostname + "/python";

function App() {
    const [apiData, setApiData] = useState({});

    useEffect(() => {
        getRestWithFetch();
    }, []);

    const getRestWithFetch = async () => {
        const response = await fetch(restUrl);
        const jsonData = await response.json();
        console.log(jsonData);
        setApiData(jsonData);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h2>Alteryx estate status</h2>
                <div className="user-container">
                    <ul>
                        <li>
                            Assets Service: OK
                        </li>
                        <li>
                            Settings Service: OK
                        </li>
                        <li>
                            Data/Connector Service: OK
                        </li>
                        <li>
                            User Management Service: OK
                        </li>
                        <li>
                            Vault: OK
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default App;

