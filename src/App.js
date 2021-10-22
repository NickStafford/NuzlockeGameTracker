import logo from './logo.svg'
import './App.css'
import NuzlockeTable from './components/table'

function App(props) {
  console.log('Debug: Initial data object:')
  console.log(props.data)

  return (
    <header className="App-header">
      <NuzlockeTable db={window.dbService} data={props.data}></NuzlockeTable>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
  )
}

export default App
