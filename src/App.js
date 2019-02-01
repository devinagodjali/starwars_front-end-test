import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Films from './components/Films';

import './stylesheets/index.css';
import logo from './logo.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
    }
  }

  componentDidMount() {

    const url = 'https://swapi.co/api/films/';

    fetch(url)
      .then(response => response.json())
      .then(film => this.setState({
        isLoading: true,
        data: film.results,
      }))
  }

  render() {
    const {data, isLoading} = this.state;

    if (!isLoading){
      return <img className="logo" src={logo}/>
    } else {
      return (
        <div className='App'>
            <Navbar />
            <Films data = {data} />
        </div>
      );
    }
  }
}

export default App;
