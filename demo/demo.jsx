"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {
  ReactSVGPanZoom,
  Toolbar,
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
  fitToViewer
} from '../src/index';
import Snake from './snake.svg';

export default class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      tool: TOOL_NONE,
      x: 0,
      y: 0,
      detectAutoPan: true,
      detectWheel: true,
      toolbarPosition: POSITION_RIGHT
    };

    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer()
  }

  handlerChange(value) {
    console.debug('onChangeValue', value);
    this.setState({value});
  }

  handlerChangeTool(tool) {
    console.debug('onChangeTool', tool);
    this.setState({tool});
  }

  handlerSetPosition(x, y) {
    this.setState({x, y});
  }

  debugClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
    console.log('SVGViewer', event.SVGViewer)
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <ReactSVGPanZoom
          width={500} height={500}
          ref={Viewer => this.Viewer = Viewer}

          value={this.state.value}                                        //lock value
          onChangeValue={value => this.handlerChange(value)}              //update state

          tool={this.state.tool}                                          //lock tool
          onChangeTool={tool => this.handlerChangeTool(tool)}             //update tool

          toolbarPosition={this.state.toolbarPosition}

          detectWheel={this.state.detectWheel}                            //detect zoom gestures
          detectAutoPan={this.state.detectAutoPan}                        //perform auto pan

          onClick={event => this.debugClick(event)}                        //display click on console
          onMouseMove={event => this.handlerSetPosition(event.x, event.y)} //display mouse position on window
          onMouseUp={event => console.info('up', event.x, event.y)}        //print mouseup on console
          onMouseDown={event => console.info('down', event.x, event.y)}    //print mousedown on console

          style={{border: '1px solid black'}}
        >
          <svg width={ 1440 } height={ 1440 }>
            <Snake />
          </svg>
        </ReactSVGPanZoom>

        <div style={{paddingLeft: "15px"}}>
          <strong>SVG Mouse Position</strong> <br/>
          x: {Number(this.state.x).toFixed(4)} <br/>
          y: {Number(this.state.y).toFixed(4)}
          <hr/>

          <div>
            <strong>Additional features</strong> <br/>
            <ul>
              <li>
                <input type="checkbox" id="detectWheel" checked={this.state.detectWheel}
                       onChange={ event => this.setState({detectWheel: event.target.checked})}/>
                <label htmlFor="detectWheel"> detectWheel</label>
              </li>
              <li>
                <input type="checkbox" id="detectAutoPan" checked={this.state.detectAutoPan}
                       onChange={ event => this.setState({detectAutoPan: event.target.checked})}/>
                <label htmlFor="detectAutoPan"> detectAutoPan</label>
              </li>
            </ul>
            <hr/>
          </div>

          <div>
            <strong>Toolbar position</strong> <br/>
            <select value={this.state.toolbarPosition}
                    onChange={ event => this.setState({toolbarPosition: event.target.value})}>
              <option value={POSITION_NONE}>none</option>
              <option value={POSITION_TOP}>top</option>
              <option value={POSITION_RIGHT}>right</option>
              <option value={POSITION_BOTTOM}>bottom</option>
              <option value={POSITION_LEFT}>left</option>
            </select>
            <hr/>
          </div>

          <div>
            <strong>Programmatically perform actions</strong> <br/>
            <ul>
              <li>
                <button onClick={event => this.Viewer.fitToViewer()}>Fit to viewer</button>
              </li>
              <li>
                <button onClick={event => this.Viewer.pan(0, -100)}>Pan top</button>
                <button onClick={event => this.Viewer.pan(100, 0)}>Pan right</button>
                <button onClick={event => this.Viewer.pan(0, 100)}>Pan bottom</button>
                <button onClick={event => this.Viewer.pan(-100, 0)}>Pan left</button>
              </li>
              <li>
                <button onClick={event => this.Viewer.fitSelection(725, 40, 200, 120)}>Zoom eyes</button>
              </li>
              <li>
                <button onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>Zoom in</button>
                <button onClick={event => this.Viewer.zoomOnViewerCenter(0.9)}>Zoom out</button>
              </li>
              <li>
                <button onClick={event => this.Viewer.changeTool(TOOL_NONE)}>Tool none</button>
                <button onClick={event => this.Viewer.changeTool(TOOL_PAN)}>Tool pan</button>
                <button onClick={event => this.Viewer.changeTool(TOOL_ZOOM_IN)}>Tool zoom in</button>
                <button onClick={event => this.Viewer.changeTool(TOOL_ZOOM_OUT)}>Tool zoom out</button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}


ReactDOM.render(
  <Demo />,
  document.getElementById('app')
);