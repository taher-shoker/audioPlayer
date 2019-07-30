import React, { Component, Fragment } from 'react';
import PlayAudio from 'react-simple-audio-player'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      allTracks: [],
      searchField: '',
      toggleInputs: false,
      trackName: '',
      trackArtist: '',
      trackLength: '',
      trackUrl: '',
      audioUrl:'',
      
    };

  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/hw8lz')
      .then(respose => respose.json())
      .then(data => this.setState({ allTracks: data.tracks }))

  }

  handleDelete = (trackName) => {
    const tracks = this.state.allTracks.filter((track) => track.name !== trackName);
    this.setState({ allTracks: tracks });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const newTrack = {
      name: this.state.trackName,
      artist: this.state.trackArtist,
      length: this.state.trackLength,
      url: this.state.trackUrl
    }
    this.setState({
      allTracks: [...this.state.allTracks, newTrack]
    })

  }
  

  render() {
    const { allTracks, searchField, audioUrl, toggleInputs, trackName, trackArtist, trackLength, trackUrl } = this.state

    const filterTracks = allTracks.filter(track => (
      track.name.toLowerCase().includes(searchField.toLowerCase())
      

    ))
    return (
      <Fragment>
        <div className="App">

          <input type='search' className='formInput' placeholder='Search by track name..' onChange={e => this.setState({ searchField: e.target.value })} />

          <PlayAudio url={audioUrl} width={'200'}  />
          <div>

            <ul className='list'>
              {filterTracks.map((track, i) => (
                <li className={audioUrl !== track.url ?('track'):('active')}  key={i}>
                  <a
                   href='!#'
                    onClick={(e)=>
                      this.setState({
                    audioUrl:track.url,
                   
                    })}> <h2>{track.name} - {track.artist}</h2></a>
                  <span>{track.length}</span>
                  <button type='button' className='deleteAction' onClick={this.handleDelete.bind(this, track.name)} >X</button>
                </li>
              ))}
            </ul>
          </div>

          <button type='button' className='addAction' onClick={() => this.setState({
            toggleInputs: !toggleInputs
          })}> Add new track</button>

          {toggleInputs && (

            <form className='formStyle' onSubmit={this.handleSubmit}>
              <input type='text' className='formInput' placeholder='Track name' name='trackName' value={trackName} onChange={this.handleChange} />
              <input type='text' className='formInput' placeholder='Artist' name='trackArtist' value={trackArtist} onChange={this.handleChange} />
              <input type='text' className='formInput' placeholder='Length' name='trackLength' value={trackLength} onChange={this.handleChange} />
              <input type='text' className='formInput' placeholder='Url' name='trackUrl' value={trackUrl} onChange={this.handleChange} />
              <button type='submit' className='formAdd'> Add </button>
            </form>

          )}

        </div>
      </Fragment>
    );
  }

}

export default App;
