
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/PageNotFound";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";

const privateRoutes = [
  { path: "/home", element: <DashboardPage /> },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<PrivateRoutes />}>
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
