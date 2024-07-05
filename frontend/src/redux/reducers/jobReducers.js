

// reducers/jobReducer.js
const initialState = {
    jobs: [],
    loading: false,
    error: null,
  };
  
  const jobReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_JOBS_SUCCESS':
        return { ...state, jobs: action.payload, loading: false };
      case 'FETCH_JOBS_FAIL':
        return { ...state, error: action.payload, loading: false };
      case 'FETCH_JOBS_REQUEST':
        return { ...state, loading: true };
      default:
        return state;
    }
  };
  
  export default jobReducer;
  