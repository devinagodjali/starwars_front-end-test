import React, { Component } from 'react';
import Modal from './Modal';

class FilmComponent extends Component {
  constructor() {
    super()
    this.state = {
      characters : ['Loading...'],
      starships : ['Loading...'],
      show: false,
    }
  }

  componentDidMount() {
    //director//
    fetch(this.props.episode_id[0])
        .then(resp => resp.text())
        .then(data => this.setState({episode_id: data.name}))

    //director//
    fetch(this.props.director[0])
        .then(resp => resp.text())
        .then(data => this.setState({director: data.name}))

    //release_date//
    fetch(this.props.release_date[0])
        .then(res => res.text())
        .then(data => this.setState({release_date: data.name}))
        
    //producer//
    fetch(this.props.producer[0])
        .then(respo => respo.text())
        .then(data=> this.setState({producer: data.name}))

    //characters//
    const charactersArray = [];

    const fetchCharacter = this.props.characters.map((characterUrl, i) => fetch(characterUrl)
        .then(re => re.json())
        .then(data=> {
            charactersArray.push(`${data.name} , ${data.gender}`);
            charactersArray.sort();
    }));
    
    Promise.all(fetchCharacter)
        .then(_promisesArray => { this.setState({characters:charactersArray}) })
        .catch((err) => console.log('error: ', err))

    //Starships//
    const starshipsArray = [];

    const fetchStarships = this.props.starships.map((starshipUrl, i) => fetch(starshipUrl)
        .then(re => re.json())
        .then(data=> {
            starshipsArray.push(`${data.name} , ${data.model}, ${data.manufacturer}`);
            starshipsArray.sort();
    }));
    
    Promise.all(fetchStarships)
        .then(_promisesArray => { this.setState({starships:starshipsArray}) })
        .catch((err) => console.log('error: ', err))
      }

    // Modal //
    showModal = () => {
      this.setState({ show: true });
    }
    
    hideModal = () => {
      this.setState({ show: false });
    }

  render() {
    const {title} = this.props;

    return (

      <div className='Container'>

          <button className="Title" type='button' onClick={this.showModal}> {title} </button>
       
          <Modal show={this.state.show} handleClose={this.hideModal} >
            <div className="Modals">

              <h1 className="titleModal"> {title} </h1>

              <h4> Episode:  </h4>   <label className="titleCom"> {this.props.episode_id} </label>
              <h4> Director: </h4>      <label className="titleCom"> {this.props.director}  </label>
              <h4> Release Date: </h4>  <label className="titleCom"> {this.props.release_date} </label>
              <h4> Producer: </h4>      <label className="titleCom"> {this.props.producer} </label>

              <div> <h4> Characters: </h4>
                <ul>
                    {this.state.characters.map((character, i) => (
                    <li key={i}>
                      {character}
                    </li>
                  ))}
                </ul>
              </div>

              <div> <h4> Starships: </h4>
                <ul>
                    {this.state.starships.map((starship, i) => (
                    <li key={i}>
                      {starship}
                    </li>
                  ))}
                </ul>  
              </div>
            </div>
        </Modal>
      </div>
    )
  }
}

export default FilmComponent;