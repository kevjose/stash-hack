import React from 'react';
import Table from './Table';

const initialState = {
  ramens: [],
  isFetching: false,
  hasError: false,
  isramenSubmitting: false,
  ramenHasError: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RAMENS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case 'FETCH_RAMENS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        ramens: action.payload
      };
    case 'FETCH_RAMENS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_RAMENS_REQUEST'
    });
    fetch('api/hacker-api', {
      method: 'GET'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        dispatch({
          type: 'FETCH_RAMENS_SUCCESS',
          payload: resJson
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_RAMENS_FAILURE'
        });
      });
  }, []);

  return (
    <React.Fragment>
      <div>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>{state.ramens.length && <Table ramens={state.ramens} />}</>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
