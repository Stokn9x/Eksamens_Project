import React, { useState, useEffect } from 'react';
import './AdminEmployeePage.css';

function AdminEmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
        address: '',
        workingHours: '',
        workState: '',
        position: '',
        availableWorkDays: [],
        shifts: []
    });
    const [errors, setErrors] = useState({});
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7265/api/Employee/GetEmployees')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEmployee((prevState) => {
            const availableWorkDays = checked
                ? [...prevState.availableWorkDays, name]
                : prevState.availableWorkDays.filter(day => day !== name);
            return { ...prevState, availableWorkDays };
        });
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!employee.name) newErrors.name = 'Name is required';
        if (!employee.age || isNaN(employee.age) || employee.age <= 0) newErrors.age = 'Valid age is required';
        if (!employee.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email)) newErrors.email = 'Valid email is required';
        if (!employee.address) newErrors.address = 'Address is required';
        if (!employee.workingHours || isNaN(employee.workingHours) || employee.workingHours <= 0) newErrors.workingHours = 'Valid working hours are required';
        if (!employee.workState) newErrors.workState = 'Work state is required';
        if (!employee.position) newErrors.position = 'Position is required';
        if (employee.availableWorkDays.length === 0) newErrors.availableWorkDays = 'Available work days are required';
        return newErrors;
    };

    const handleAddOrUpdateEmployee = (e) => {
        e.preventDefault();
        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const url = editingEmployee
            ? `https://localhost:7265/api/Employee/UpdateEmployee`
            : `https://localhost:7265/api/Employee/AddEmployee`;

        const method = editingEmployee ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...employee,
                age: parseInt(employee.age),
                workingHours: parseFloat(employee.workingHours),
                availableWorkDays: employee.availableWorkDays,
                shifts: []
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Employee added/updated:', data);
                if (editingEmployee) {
                    setEmployees(employees.map(e => (e.id === employee.id ? employee : e)));
                } else {
                    setEmployees([...employees, data]);
                }
                setEmployee({
                    name: '',
                    age: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    workingHours: '',
                    workState: '',
                    position: '',
                    availableWorkDays: [],
                    shifts: []
                });
                setErrors({});
                setEditingEmployee(null);
            })
            .catch(error => {
                console.error('Error adding/updating employee:', error);
            });
    };

    const handleEditEmployee = (employee) => {
        setEditingEmployee(employee);
        setEmployee(employee);
    };

    const handleDeleteEmployee = (id) => {
        fetch(`https://localhost:7265/api/Employee/DeleteEmployee/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(data => {
                console.log('Employee deleted:', data);
                setEmployees(employees.filter(e => e.id !== id));
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    return (
        <div className="admin-content">
            <h1>Admin Employee Page</h1>
            <form onSubmit={handleAddOrUpdateEmployee}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                {errors.name && <span className="error">{errors.name}</span>}
                <input
                    type="number"
                    name="age"
                    value={employee.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    required
                />
                {errors.age && <span className="error">{errors.age}</span>}
                <input
                    type="text"
                    name="phoneNumber"
                    value={employee.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <input
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                />
                {errors.address && <span className="error">{errors.address}</span>}
                <input
                    type="number"
                    name="workingHours"
                    value={employee.workingHours}
                    onChange={handleInputChange}
                    placeholder="Working Hours"
                    required
                />
                {errors.workingHours && <span className="error">{errors.workingHours}</span>}
                <select
                    name="workState"
                    value={employee.workState}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Work State</option>
                    <option value="PartTime">Part Time</option>
                    <option value="FullTime">Full Time</option>
                </select>
                {errors.workState && <span className="error">{errors.workState}</span>}
                <select
                    name="position"
                    value={employee.position}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Position</option>
                    <option value="Cook">Cook</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Cashier">Cashier</option>
                </select>
                {errors.position && <span className="error">{errors.position}</span>}
                <div>
                    <label>Available Work Days:</label>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day}>
                            <input
                                type="checkbox"
                                name={day}
                                checked={employee.availableWorkDays.includes(day)}
                                onChange={handleCheckboxChange}
                            />
                            <label>{day}</label>
                        </div>
                    ))}
                </div>
                {errors.availableWorkDays && <span className="error">{errors.availableWorkDays}</span>}
                <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
            </form>
            <h2>Employee List</h2>
            <ul>
                {employees.map((employee, index) => (
                    <li key={index}>
                        {employee.name} - {employee.email}
                        <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                        <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminEmployeePage;
