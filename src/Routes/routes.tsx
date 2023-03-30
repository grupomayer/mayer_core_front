import Footer from "Components/Footer/footer";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "Pages/Login/login";
import { Suspense } from "react";
import LoadingModal from "Components/Modals/LoadingModal/loading_modal";
import Header from "Components/Header/header";
import BasePage from "Components/BasePage/base_page";
import AuthWrapper from "Components/AuthWrapper/auth_wrapper";

function PagesRoutes() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingModal />}>
          <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<BasePage />}>
              <Route element={<AuthWrapper />}>
              <Route path="/teste" element={<>oi</>} />
              </Route>
            </Route>
            </Routes>
          </Router>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default PagesRoutes;