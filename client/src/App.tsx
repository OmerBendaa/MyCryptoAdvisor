
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/PageNotFound";
import DashboardPage from "./pages/DashboardPage";
import SignUpPage from "./pages/SignUpPage";
import OnBoardingQuizPage from "./pages/OnboardingQuizPage";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import {QueryClient, QueryClientProvider}from '@tanstack/react-query'

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
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App;
