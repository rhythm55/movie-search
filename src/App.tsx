import Body from "./components/Body";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
