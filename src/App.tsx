import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { createStore, AnyAction, Dispatch } from 'redux';
import { createReducer } from 'redux-create-reducer'
import { Provider, connect } from 'react-redux';


export interface AppState {
  aList:string[];
  aNumber: number;
  aString: string
}

const initState:AppState = {
  aList: ['hello', 'world'],
  aNumber: 100,
  aString: 'I am Iron Man.'
};

const rootReducer = createReducer<AppState, AnyAction>(initState, {
  'myReducer': (state:AppState, action:AnyAction): AppState => Object.assign({}, initState) 
}) ;

const store = createStore<AppState, AnyAction, any, any>(rootReducer, initState);

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store} >
        <AnotherAppContainer />
    </Provider>
  );
}

export class AnotherApp extends React.Component<AppState,{}> {
  render() {
    return (
      <div>
        <h1>{this.props.aString}</h1>
        <h2>{this.props.aNumber}</h2>
        <ul>
          {this.props.aList.map((v, k) => (<li key={k}>{v}</li>))}
        </ul>
      </div>
    );
  }
}

const AnotherAppContainer = connect(
  (state:AppState )=> state, 
  (dispatch: Dispatch) => ({})
)(AnotherApp);

export default App;
