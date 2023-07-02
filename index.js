// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: [3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(createEmployeeRecord);
  }
  
function createTimeInEvent(employeeRecord, ddateStamp) {
    // let [date, hour] = dateStamp.split("");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4), 10), // Extract hour from dateStamp
        date: dateStamp.slice(0, 10), // Extract date from dateStamp
        time: dateStamp // save the entire timestamp
    });
    return employeeRecord;
  }
  
function createTimeOutEvent(employeeRecord, dateStamp) {
    // let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4), 10), // Extract hour from dateStamp
        date: dateStamp.slice(0, 10), // Extract date from dateStamp
        time: dateStamp // save the entire timestamp
    });
    return employeeRecord;
  }
  
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date).hour;
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn) / 100;
  }
  
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;

}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(e => e.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecords) {
   return  employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
}

// sample data

const employeesData = [
    ["Bart", "Simpson", "teacher", 20],
    ["Lisa", "Jacobs", "HR", 20],
    ["Gray", "Owens", "developer", 40],
    ["Joy", "Mayor", "manager", 30]
];
// Execute functions
const employeeRecords = createEmployeeRecords(employeesData);
const bart = employeeRecords[0];
const lisa = employeeRecords[1];
const Gray = employeeRecords[2];
const Joy = employeeRecords[3];

createTimeInEvent(bart, "2023-07-02 0900");
createTimeOutEvent(bart, "2023-07-02 1600");

createTimeOutEvent(Gray, "2023-07-02 0900");
createTimeOutEvent(Gray, "2023-07-02 1500");

createTimeInEvent(lisa, "2023-07-02 1000");
createTimeOutEvent(lisa, "2023-07-02 1830");

createTimeOutEvent(Joy, "2023-07-02 0800");
createTimeOutEvent(Joy, "2023-07-02 1700");

// Build the output string
let output = "Payroll Information:\n";

output += `${bart.firstName} ${bart.familyName} earned $${wagesEarnedOnDate(bart, "2023-07-02")}\n`;
output += `${lisa.firstName} ${lisa.familyName} earned $${wagesEarnedOnDate(lisa, "2023-07-02")}\n`;
output += `${Gray.firstName} ${bart.familyName} earned $${wagesEarnedOnDate(bart, "2023-07-02")}\n`;
output += `${Joy.firstName} ${bart.familyName} earned $${wagesEarnedOnDate(bart, "2023-07-02")}\n`;
output += `Total payroll is: $${calculatePayroll(employeeRecords)}`;

// Output to the webpage
document.getElementById("output").innerText = output;