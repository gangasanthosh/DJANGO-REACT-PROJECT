
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import appimage from '../assets/images/application-image.jpg';
import './JsApplicationForm.css'; // Import your custom CSS file

const YourComponent = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={appimage} alt="app image" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <form>
            <h1 className="mb-4"><b>Add CV for the Employer</b></h1>
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea name="remarks" className="form-control" id="remarks" rows="3" placeholder="Enter any remarks here" required></textarea>
            </div>
            <hr />
            <div className="form-group mt-3 d-flex justify-content-between align-items-center">
              <label className="mr-2">Upload your CV:</label>
              <input type="file" name="file" className="form-control-file" required />
            </div>
            <hr />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;

