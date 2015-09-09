import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../components/Grid';
import * as GridActions from '../actions/grid';

let frameId = null;

class App extends Component {

  render() {
    const { data, dispatch } = this.props;
    const actions = bindActionCreators(GridActions, dispatch);

    return (
      <div>
        <div className="buttons-container">
          <button className="btn btn-primary" onClick={ actions.clear }>NEW</button>
          <button className="btn btn-success">SAVE</button>
          <button className="btn btn-default" onClick={ actions.tick }>NEXT</button>
          <label htmlFor="autoplay" className="btn btn-default">
            <input id="autoplay" type="checkbox" onChange={ this.toggleAutoplay(actions.tick) }/> Autoplay
          </label>
        </div>
        <div>
          <Grid data={ data } toggle={ actions.toggle }/>
        </div>
      </div>
    );
  }

  toggleAutoplay(tick) {
    return () => {
      if (!frameId) {
        return this.start(tick);
      };
      this.stop();
    };
  }

  start(tick) {
    frameId = requestAnimationFrame(() => this.start(tick));
    tick();
  }

  stop() {
    cancelAnimationFrame(frameId);
    frameId = null;
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    data: state.grid
  };
}

export default connect(mapStateToProps)(App);
