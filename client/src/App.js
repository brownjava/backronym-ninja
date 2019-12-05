import React from 'react';
import './App.css';

class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      fixedArray: [],
    }
  }

  async handleNewAcronym(acronym) {
    if (acronym.length > 0) {
      let fixedArray = this.state.fixedArray.slice(0, acronym.length)
      for (let i = 0; i < acronym.length; i++) {
        if (fixedArray[i] && acronym.toLowerCase()[i] !== fixedArray[i].toLowerCase()[0]) {
          fixedArray[i] = undefined;
        }
      }

      const response = await fetch(`/api/${acronym}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fixedArray)
      });
      const words = await response.json();
      this.setState({fixedArray, words});
      debugger
    } else {
      this.setState({fixedArray:[], words:[]});
    }
  }

  handleLockChange(index, locked) {
    let fixedArray = this.state.fixedArray;
    if (locked) {
      fixedArray[index] = this.state.words[index];
    } else {
      fixedArray[index] = undefined;
    }
    this.setState({fixedArray});
  }
  
  render() {
    return (
      <div className="App">
        <Input onChange={(acronym) => this.handleNewAcronym(acronym)} />
        {this.state.words.length > 0 ? (
          <>
          <br />
          Your backronym is:
          <br />
          <br />
          <div className="Words">
          {this.state.words.map((value, index) => {
            return (<Word value={value} key={index} onLockChange={(locked) => this.handleLockChange(index, locked)} fixed="false" />)
          })}
          </div>
          <br />
          Like some of the words but not others?<br />
          Click the lock icon next to the ones you like and try again!
          </>
          ) : null}
      </div>
    )
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onChange(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }
  
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <label>What's Your Acronym:
          <input type="text" value={this.state.value} onChange={(event) => this.handleChange(event)} />
        </label>
        <br />
        <br />
        <input type="submit" value="Generate my Backronym!" />
      </form>
    )
  }
}

class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locked: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.state.locked) {
      this.handleLockClicked()
    }
  }

  handleLockClicked() {
    this.setState({locked: !this.state.locked}, () => {
      this.props.onLockChange(this.state.locked);
    });
  }

  render() {
    return (
      <label><span onClick={() => this.handleLockClicked()}>{this.state.locked ? "🔒" : "🔓"}</span> {this.props.value}<br /></label>
    )
  }
}


function App() {
  return (
    <Application />
  );
}

export default App;
