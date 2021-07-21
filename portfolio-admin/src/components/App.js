/** @format */

import "../css/App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className='App-header'>
      <h3>Nedim Omerovic Portfolio Admin Page</h3>
      <br />
      <div className='login-link-contianer'>
        <Link to='/login'>LOGIN</Link>
      </div>
    </div>
  );
}

export default App;
