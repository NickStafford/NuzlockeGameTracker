import logo from './logo.svg';
import './App.css';
import NuzlockeTable from './components/table';

function App() {
    console.log('Debug: Initial window.dataObj = ' + window.dataObj);

    return (
        <header className="App-header">
            <NuzlockeTable data={window.dataObj}></NuzlockeTable>
            <img src={logo} className="App-logo" alt="logo" />
        </header>
    );
}

export default App;
