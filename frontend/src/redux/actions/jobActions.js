// actions/jobActions.js
import axios from '../axios';

export const fetchJobsByRecruiter = (recruiterId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/recruiters/${recruiterId}/jobs/`);
        dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_JOBS_FAIL', payload: error.message });
    }
};
