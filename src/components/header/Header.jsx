import  { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const StudentManagementSystem = () => {
  const STUDENTS = 'students';
  const STUDENT_GROUP = 'student_group';

  const groups = ['REACT N38', 'REACT N42', 'REACT N45', 'REACT N11'];

  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [group, setGroup] = useState(localStorage.getItem(STUDENT_GROUP) || 'all');
  const [search, setSearch] = useState('');
const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const studentsJSON = localStorage.getItem(STUDENTS);
    const parsedStudents = JSON.parse(studentsJSON) || [];
    setStudents(parsedStudents);
  }, []);

  useEffect(() => {
    localStorage.setItem(STUDENT_GROUP, group);
  }, [group]);

const handleGroupFilterChange = (e) => {
  setGroup(e.target.value.toLowerCase());
};

  const getStudents = () => {
  let filteredStudents = students.filter((student) => {
    return (
      student.firstName.toLowerCase().includes(search.toLowerCase()) &&
      (group === 'all' || student.group.toLowerCase() === group)
    );
  });

  return filteredStudents;
};
const handleFormSubmit = (e) => {
  e.preventDefault();

  const newStudent = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    group: e.target.group.value,
    doesWork: e.target.doesWork.checked
  };

  if (selected) {
    const updatedStudents = [...students];
    updatedStudents[selected.index] = newStudent;
    setStudents(updatedStudents);
  } else {
    setStudents([...students, newStudent]);
  }

  setSelected(null);

  e.target.reset();
};

  const handleEditStudent = (index) => {
  const editedStudent = students[index];

  setSelected({
    index: index,
    name: editedStudent.firstName,
    group: editedStudent.group,
    doesWork: editedStudent.doesWork
  });

  setShowModal(true);
};
  


  const handleDeleteStudent = (index) => {
  const updatedStudents = students.filter((student, i) => i !== index);
  setStudents(updatedStudents);
};

  const handleSearchStudent = (e) => {
  setSearch(e.target.value);
};




const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpen =() => showModal(true);

  

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control search-student"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearchStudent}
        />
        <span className="input-group-text">
          <select className="form-select groups-filter" value={group} onChange={handleGroupFilterChange}>            <option value="all">All</option>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </span>
        

        <Button variant="primary" onClick={handleShow}>
       Add student
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Adding student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="student-form needs-validation" onSubmit={handleFormSubmit} noValidate>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                  />
                  <div className="invalid-feedback">Please enter the firstname.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    required
                  />
                  <div className="invalid-feedback">Please enter the lastname.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="group" className="form-label">
                    Group
                  </label>
                  <select className="form-select" id="group" name="group" required>
                    <option value="">Select a group</option>
                    {groups.map((group, index) => (
                      <option key={index} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Please select a group.</div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="doesWork" name="doesWork" />
                  <label className="form-check-label" htmlFor="doesWork">
                    Does work?
                  </label>
                </div>
              </div>
              
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" className="btn btn-primary" variant="primary" onClick={handleOpen}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <table className="students-table table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Group</th>
            <th scope="col">Does work?</th>
            <th className="text-end" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {getStudents().map((student, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
             <td>{student.group}</td>
              <td>{student.doesWork ? 'Yes' : 'No'}</td>
              <td className="text-end">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditStudent(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteStudent(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal fade" id="studentModal" tabIndex="-1" aria-labelledby="studentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentModalLabel">
                Add/Edit Student
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagementSystem;