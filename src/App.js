import React, { Component } from 'react'
import './App.css';
import Bars from './components/Bars'
import SelectionSort from './components/algorithms/SelectionSort'
import BubbleSort from './components/algorithms/BubbleSort'
import InsertionSort from './components/algorithms/InsertionSort'
import MergeSort from './components/algorithms/MergeSort'
import HeapSort from './components/algorithms/HeapSort'
import QuickSort from './components/algorithms/QuickSort'

export class App extends Component {

  
  randomizeArray = (n = Math.floor(window.innerWidth / 10)) => {

    this.setState({idx1: -1, idx2: -1, leftSorted: -1, rightSorted: 1000, swapIdx1: -1, swapIdx2: -1, swapStage: '', skip: false, borderedIndices: []})

    let arr = []
    for(let i = 0; i < n; i++)
        arr.push(Math.floor(Math.random() * 99) + 1)
    
    return arr
  }

  constructor(props) {
    super(props)
    this.state = {
      arr: this.randomizeArray(),
      idx1: -1,
      idx2: -1,
      leftSorted: -1,
      rightSorted: 1000,
      swapIdx1: -1,
      swapIdx2: -1,
      swapStage: '',
      skip: false,
      delay: 300,
      borderedIndices: [],
      sortedIndices: [],
      currentlySorting: false,
      paused: false
    }
  }

  updateArr = arr => {
    this.setState({arr})
  }

  updateHighlightedIndices = (idx1, idx2, leftSorted, rightSorted) => {
    this.setState({idx1, idx2, leftSorted, rightSorted})
  }

  updateSwapIndices = (swapIdx1, swapIdx2, swapStage) => {
    this.setState({swapIdx1, swapIdx2, swapStage})
  }

  updateParameters = (skip, currentlySorting = true) => {
    this.setState({skip, currentlySorting})
  }

  updateBorderedIndices = (borderedIndices) => {
    this.setState({borderedIndices})
  }

  updateSortedIndices = (sortedIndices) => {
    this.setState({sortedIndices})
  }

  updateDelay = e => {
    this.setState({delay: e.target.value})
  }

  updateArraySize = e => {
    this.setState({arr: this.randomizeArray(e.target.value)})
  }

  sleep = async delay => {
      return new Promise(resolve => {setTimeout(async () => {
        if(!this.state.paused)
            resolve();
        else
            await this.sleep(100);
        resolve();
      }, delay)})
  }

  pause = async () => {
    this.setState({paused: !this.state.paused});
  }

  render() {

    let btnSize = (window.innerWidth > 600) ? "md" : "sm";
    let pauseColor = this.state.paused ? "btn btn-info" : "btn btn-danger";
    let icon = this.state.paused ? "fas fa-play" : "fas fa-pause"
    

    return (

          <div className="App container vh-100">

              <div id="toolbar" style={toolbarStyle} className="btn-toolbar container" role="toolbar">
                  <div className={"btn-group mr-2 btn-group-"+ btnSize} role="group">
                        <button onClick={() => {this.setState({arr: this.randomizeArray(this.state.arr.length)})}} disabled={this.state.currentlySorting}
                        className='btn btn-info'>
                          Randomize Array</button>
                  </div>

                  <div className={"btn-group m-auto d-flex flex-wrap btn-group-" + btnSize} role="group">
                        <SelectionSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />

                        <BubbleSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />

                        <InsertionSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />

                        <MergeSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            updateBorderedIndices={this.updateBorderedIndices}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />

                        <HeapSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />

                        <QuickSort
                            arr={this.state.arr} 
                            updateArr={this.updateArr}
                            updateHighlightedIndices={this.updateHighlightedIndices}
                            updateSwapIndices={this.updateSwapIndices}
                            skip={this.state.skip}
                            delay={this.state.delay}
                            updateParameters={this.updateParameters}
                            updateBorderedIndices={this.updateBorderedIndices}
                            sortedIndices={this.state.sortedIndices}
                            updateSortedIndices={this.updateSortedIndices}
                            currentlySorting={this.state.currentlySorting}
                            sleep={this.sleep}
                        />
                  </div>
              </div>

              <div className="container">
                    <Bars 
                        arr={this.state.arr}
                        idx1={this.state.idx1}
                        idx2={this.state.idx2}
                        leftSorted={this.state.leftSorted}
                        rightSorted={this.state.rightSorted}
                        swapIdx1={this.state.swapIdx1}
                        swapIdx2={this.state.swapIdx2}
                        swapStage={this.state.swapStage}
                        borderedIndices={this.state.borderedIndices}
                        sortedIndices={this.state.sortedIndices}
                    />  
              </div>

              <footer id="settings" className="container page-footer settings d-flex flex-wrap" style={settingStyle}>
                        

              <button onClick={() => this.pause(this.state.delay)} disabled={!this.state.currentlySorting} 
                    className={pauseColor}><i className={icon}></i></button>

                    <button onClick={() => this.updateParameters(true, false)} disabled={!this.state.currentlySorting || this.state.paused} 
                    className='btn btn-success'><i className="fas fa-fast-forward"></i></button>

                    <div className="m-auto">
                          <label>Speed</label>
                          <input type="range" name="speed" max="1000" min="0" onChange={this.updateDelay} style={reversedRangeStyle} value={this.state.delay}
                          ></input>
                    </div>

                    <div className="m-auto">
                          <label>Array Size</label>
                          <input type="range" name="array-size" max={Math.floor(window.innerWidth/10)} min="5" onChange={this.updateArraySize} value={this.state.arr.length} disabled={this.state.currentlySorting}></input>
                    </div>

                
              </footer>

              </div>

      
    );
  }
  
}

const reversedRangeStyle = {
  direction: 'rtl'
}

const settingStyle = {
  backgroundColor: 'grey',
  position: 'absolute',
  bottom: '0',
  left: '0',
  borderRadius: '3px',
  padding: '3px',
  color: 'white'
}

const toolbarStyle = {
  backgroundColor: 'grey',
  borderRadius: '3px',
  padding: '3px'
}


export default App;
