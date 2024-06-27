import React, { useState } from 'react';

const DetailsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    location: '',
    description: '',
    isFresher: false,
    educationLevel: '',
    fieldOfStudy: '',
    status: '',
    institution: '',
    startDate: '',
    endDate: '',
    grade: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Contact Number:
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Fresher:
        <input type="checkbox" name="isFresher" checked={formData.isFresher} onChange={handleChange} />
      </label>
      <br />
      <label>
        Education Level:
        <input type="text" name="educationLevel" value={formData.educationLevel} onChange={handleChange} />
      </label>
      <br />
      <label>
        Field of Study:
        <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
      </label>
      <br />
      <label>
        Status:
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </label>
      <br />
      <label>
        Institution:
        <input type="text" name="institution" value={formData.institution} onChange={handleChange} />
      </label>
      <br />
      <label>
        Start Date:
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>
      <br />
      <label>
        Grade:
        <input type="text" name="grade" value={formData.grade} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DetailsForm;
