import {Link} from 'react-router-dom';
const OnboardingQuizPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>EntryQuizPage - Not Found</h1>
      <p>Oops! It seems like the page you're looking for doesn't exist, or you may need to be a registered user to access it :(</p>
      <p>sign up now or login to your account and try again</p>
      <div style={{ display: 'flex', flexDirection: 'row',justifyContent:"center" }}>
        <Link to="/" style={{marginRight:"20px"}}>Login</Link> 
        <Link to="/signup"> Sign up</Link>
      </div>
    </div>
  );
};

export default OnboardingQuizPage;