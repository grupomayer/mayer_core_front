import Footer from "Components/Footer/footer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "Pages/Login/login";
import { lazy, Suspense } from "react";
import LoadingModal from "Components/Modals/LoadingModal/loading_modal";
import Header from "Components/Header/header";

const BasePage = lazy(() => import("Components/BasePage/base_page"));
const AuthWrapper = lazy(() => import("Components/AuthWrapper/auth_wrapper"));
const Users = lazy(() => import("Pages/Users/users"));

function PagesRoutes() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Suspense fallback={<LoadingModal />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<BasePage />}>
                <Route element={<AuthWrapper />}>
                  <Route path="/users" element={<Users />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default PagesRoutes;