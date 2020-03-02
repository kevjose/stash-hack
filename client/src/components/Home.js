import React from 'react';
import Table from './Table';

export const SongContext = React.createContext();

const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
  isSongSubmitting: false,
  songHasError: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case 'FETCH_SONGS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        songs: action.payload
      };
    case 'FETCH_SONGS_FAILURE':
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
      type: 'FETCH_SONGS_REQUEST'
    });
    fetch('//' + window.location.hostname + ':8080/api/hacker-api', {
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
        console.log(resJson);
        dispatch({
          type: 'FETCH_SONGS_SUCCESS',
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: 'FETCH_SONGS_FAILURE'
        });
      });
  }, []);

  // const handleChange = function(value) {
  //   if (!value) {
  //     return state.songs;
  //   } else {
  //     console.log(
  //       value,
  //       state.songs.filter(r =>
  //         r.Brand.toLowerCase().startsWith(value.toLowerCase())
  //       )
  //     );
  //     state.songs = state.songs.filter(r =>
  //       r.Brand.toLowerCase().startsWith(value.toLowerCase())
  //     );
  //   }
  // };

  return (
    <React.Fragment>
      <div>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>{state.songs.length > 0 && <Table ramens={state.songs} />}</>
        )}
      </div>
    </React.Fragment>
  );
};

export default Home;
