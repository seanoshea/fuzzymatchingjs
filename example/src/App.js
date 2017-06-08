import React, { Component } from 'react';
import './App.css';
import { fuzzyMatching } from 'fuzzymatchingjs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fuzzyMatchingText: "",
      fuzzyMatchingPattern: "",
      fuzzyMatchingResult: "",
      confidenceScoreText: "",
      confidenceScorePattern: "",
      confidenceScoreResult: "",
    };
  }

  handleFuzzyMatchingClick(e) {
    e.preventDefault();
    this.setState({fuzzyMatchingResult: fuzzyMatching.fuzzyMatchPattern(this.state.fuzzyMatchingText, this.state.fuzzyMatchingPattern, 0)});
  }

  handleConfidenceClick(e) {
    e.preventDefault();
    this.setState({confidenceScoreResult: fuzzyMatching.confidenceScore(this.state.confidenceScoreText, this.state.confidenceScorePattern, 0)});
  }

  handleFuzzyMatchingTextChange(e) {
    this.setState({fuzzyMatchingText: e.target.value});
  }

  handleFuzzyMatchingPatternChange(e) {
    this.setState({fuzzyMatchingPattern: e.target.value});
  }

  handleFuzzyMatchingConfidenceTextChange(e) {
    this.setState({confidenceScoreText: e.target.value});
  }

  handleFuzzyMatchingConfidencePatternChange(e) {
    this.setState({confidenceScorePattern: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <p>Fuzzy Matching JavaScript Example Application</p>
        <form>
          <fieldset>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" id="text" value={this.state.text} onChange={(e) => this.handleFuzzyMatchingTextChange(e) } />
            <label htmlFor="text">Pattern</label>
            <input type="text" name="pattern" id="pattern" value={this.state.pattern} onChange={(e) => this.handleFuzzyMatchingPatternChange(e) } />
            <input type="submit" id="submit" onClick={(e) => this.handleFuzzyMatchingClick(e) } />
          </fieldset>
        </form>
        <div>{this.state.fuzzyMatchingResult}</div>
        <p>Fuzzy Matching Confidence</p>
        <form>
          <fieldset>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" id="text" value={this.state.text} onChange={(e) => this.handleFuzzyMatchingConfidenceTextChange(e) } />
            <label htmlFor="text">Pattern</label>
            <input type="text" name="pattern" id="pattern" value={this.state.pattern} onChange={(e) => this.handleFuzzyMatchingConfidencePatternChange(e) } />
            <input type="submit" id="submit" onClick={(e) => this.handleConfidenceClick(e) } />
          </fieldset>
        </form>
        <div>{this.state.confidenceScoreResult}</div>
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};
export default App;
