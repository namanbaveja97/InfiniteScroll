

import './App.css';
import IssueView from './Components/IssueView';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Components/Navbar';
import CheckUse from './Components/CheckUse';
function App() {
  return (
    <div className="App">
        <Navbar></Navbar>
        {/* <CheckUse></CheckUse> */}
        <IssueView></IssueView>
    </div>
  );
}

export default App;
