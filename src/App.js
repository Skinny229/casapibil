import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import About from './components/About'
import Contact from './components/Contact'; 
import Order from './components/Order';
import Menu from './components/Menu';

//<Menu/>
function App() {
  return (
    <div className="App">
    <Header/>
    <About/>
    <Order/>
    <Contact/>

    </div>
  );
}

export default App;
