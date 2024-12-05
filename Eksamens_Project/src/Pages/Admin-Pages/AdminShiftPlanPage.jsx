import React, { useState, useEffect } from 'react';
import './AdminShiftPlanPage.css';

const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function AdminShiftPlanPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [shift, setShift] = useState({
        day: '',
        startTime: '',
        endTime: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch('https://localhost:7265/api/Employee/GetEmployees')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShift({ ...shift, [name]: value });
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployeeId(e.target.value);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!selectedEmployeeId) newErrors.employee = 'Employee is required';
        if (!shift.day) newErrors.day = 'Day is required';
        if (!shift.startTime) newErrors.startTime = 'Start time is required';
        if (!shift.endTime) newErrors.endTime = 'End time is required';
        return newErrors;
    };

    const handleAddShift = (e) => {
        e.preventDefault();
        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const shiftData = {
            ...shift,
            day: shift.day // Ensure day is a valid WorkDays enum value
        };

        fetch(`https://localhost:7265/api/Employee/AddShiftToEmployee?employeeId=${selectedEmployeeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shiftData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Shift added:', data);
                setShift({
                    day: '',
                    startTime: '',
                    endTime: ''
                });
                setErrors({});
                // Refresh employees to get updated shifts
                fetch('https://localhost:7265/api/Employee/GetEmployees')
                    .then(response => response.json())
                    .then(data => setEmployees(data))
                    .catch(error => console.error('Error fetching employees:', error));
            })
            .catch(error => {
                console.error('Error adding shift:', error);
            });
    };

    return (
        <div className="admin-content">
            <div className="admin-shift-plan">
                <h1>Admin Shift Plan Page</h1>
                <form onSubmit={handleAddShift}>
                    <select value={selectedEmployeeId} onChange={handleEmployeeChange} required>
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    {errors.employee && <span className="error">{errors.employee}</span>}
                    <select name="day" value={shift.day} onChange={handleInputChange} required>
                        <option value="">Select Day</option>
                        {workDays.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    {errors.day && <span className="error">{errors.day}</span>}
                    <input
                        type="time"
                        name="startTime"
                        value={shift.startTime}
                        onChange={handleInputChange}
                        placeholder="Start Time"
                        required
                    />
                    {errors.startTime && <span className="error">{errors.startTime}</span>}
                    <input
                        type="time"
                        name="endTime"
                        value={shift.endTime}
                        onChange={handleInputChange}
                        placeholder="End Time"
                        required
                    />
                    {errors.endTime && <span className="error">{errors.endTime}</span>}
                    <button type="submit">Add Shift</button>
                </form>
                <h2>Shift Plan</h2>
                <ul>
                    {employees.map(employee => (
                        <li key={employee.id}>
                            <h3>{employee.name}</h3>
                            <ul>
                                {employee.shifts.map((shift, index) => (
                                    <li key={index}>
                                        {shift.day} - {shift.startTime} to {shift.endTime}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminShiftPlanPage;
