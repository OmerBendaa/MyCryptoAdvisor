
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/PageNotFound";
import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";
import OnBoardingQuizPage from "./pages/OnBoardingQuizPage";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/OnboardingQuiz" element={<OnBoardingQuizPage />} />
        <Route path="/myDashboard" element={<DashboardPage />} />
      </Route>
    </>
  )
);
function App() {
  return (
      <RouterProvider router={router}/>
  )
}

export default App;
