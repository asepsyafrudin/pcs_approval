import "./App.css";
import Header from "./component/atom/header";
import RoutingPage from "./component/page/routingPage";
import { GlobalProvider } from "./context/store";
import Footer from "./component/atom/Footer";

function App() {
  return (
    <div className="background-cover">
      <Header />
      <div className="content">
        <RoutingPage />
      </div>
      <Footer />
    </div>
  );
}

export default GlobalProvider(App);
