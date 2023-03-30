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

function PagesRoutes() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<LoadingModal />}>
          <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default PagesRoutes;