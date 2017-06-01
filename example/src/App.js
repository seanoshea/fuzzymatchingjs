import React, { Component } from 'react';
import './App.css';
import * as FuzzyMatchingJS from 'fuzzymatchingjs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      pattern: "",
      result: "",
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({result: FuzzyMatchingJS.fuzzyMatchPattern(this.state.text, this.state.pattern, 0)});
  }

  handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  handlePatternChange = (e) => {
    this.setState({pattern: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <p>Fuzzy Matching JavaScript Example Application</p>
        <form>
          <fieldset>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" id="text" value={this.state.text} onChange={this.handleTextChange} />
            <label htmlFor="text">Pattern</label>
            <input type="text" name="pattern" id="pattern" value={this.state.pattern} onChange={this.handlePatternChange} />
            <input type="submit" id="submit" onClick={this.handleClick} />
          </fieldset>
        </form>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default App;
