import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminShiftPlanPage.css';

const localizer = momentLocalizer(moment);
const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function AdminShiftPlanPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [shift, setShift] = useState({
        day: '',
        date: '',
        startTime: '',
        endTime: ''
    });
    const [selectedShift, setSelectedShift] = useState(null);
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
        if (!shift.date) newErrors.date = 'Date is required';
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
                    date: '',
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

    const handleEditShift = (e) => {
        e.preventDefault();
        if (!selectedShift) return;

        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const shiftData = {
            ...shift,
            day: shift.day // Ensure day is a valid WorkDays enum value
        };

        fetch(`https://localhost:7265/api/Employee/EditShift?shiftId=${selectedShift.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shiftData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Shift edited:', data);
                setShift({
                    day: '',
                    date: '',
                    startTime: '',
                    endTime: ''
                });
                setSelectedShift(null);
                setErrors({});
                // Refresh employees to get updated shifts
                fetch('https://localhost:7265/api/Employee/GetEmployees')
                    .then(response => response.json())
                    .then(data => setEmployees(data))
                    .catch(error => console.error('Error fetching employees:', error));
            })
            .catch(error => {
                console.error('Error editing shift:', error);
            });
    };

    const handleDeleteShift = () => {
        if (!selectedShift) return;

        fetch(`https://localhost:7265/api/Employee/DeleteShift?shiftId=${selectedShift.id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Shift deleted:', data);
                setSelectedShift(null);
                // Refresh employees to get updated shifts
                fetch('https://localhost:7265/api/Employee/GetEmployees')
                    .then(response => response.json())
                    .then(data => setEmployees(data))
                    .catch(error => console.error('Error fetching employees:', error));
            })
            .catch(error => {
                console.error('Error deleting shift:', error);
            });
    };

    const handleSelectEvent = (event) => {
        const employee = employees.find(emp => emp.name === event.title.split(' - ')[0]);
        const shift = employee.shifts.find(s => s.startTime === event.start.toISOString().split('T')[1].slice(0, 5));
        setSelectedShift(shift);
        setShift({
            day: shift.day,
            date: shift.date.split('T')[0], // Extract date part
            startTime: shift.startTime,
            endTime: shift.endTime
        });
        setSelectedEmployeeId(employee.id);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.availableWorkDays.includes(shift.day)
    );

    const events = employees.flatMap(employee =>
        employee.shifts ? employee.shifts.map(shift => ({
            id: shift.id,
            title: `${employee.name} - ${shift.startTime} to ${shift.endTime}`,
            start: new Date(`${shift.date}T${shift.startTime}`),
            end: new Date(`${shift.date}T${shift.endTime}`)
        })) : []
    );

    return (
        <div className="admin-content">
            <div className="admin-shift-plan">
                <h1>Admin Shift Plan Page</h1>
                <form onSubmit={selectedShift ? handleEditShift : handleAddShift}>
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
                        type="date"
                        name="date"
                        value={shift.date}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.date && <span className="error">{errors.date}</span>}
                    <select value={selectedEmployeeId} onChange={handleEmployeeChange} required>
                        <option value="">Select Employee</option>
                        {filteredEmployees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        ))}
                    </select>
                    {errors.employee && <span className="error">{errors.employee}</span>}
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
                    <button type="submit">{selectedShift ? 'Edit Shift' : 'Add Shift'}</button>
                    {selectedShift && <button type="button" onClick={handleDeleteShift}>Delete Shift</button>}
                </form>
                <h2>Shift Plan</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </div>
    );
}

export default AdminShiftPlanPage;
