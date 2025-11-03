import {Link} from 'react-router-dom';
const DashboardPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Dashboard Page</h1>
      <p>The page you are looking for dosen't exist</p>
      <p>you can go back to the home page to</p>
      <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"center" }}>
        <Link to="/home" style={{marginRight:"20px"}}>Home Page</Link> 
        <Link to="/">Login Page</Link>
      </div>
    </div>
  );
};

export default DashboardPage