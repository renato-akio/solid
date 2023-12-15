import EmployeeData from "./EmployeeData";
import { SalaryCalculatorFactory } from "./SalaryCalculator";


export default class CalculatePayroll {
    //constructor(readonly employeeData: EmployeeData) { }
    constructor(readonly employeeData: EmployeeDataCalculatePayroll) {}
    
    async execute(input: Input): Promise<Output> {
        const employee = await this.employeeData.getEmployee(input.employeeId);
        const timeRecords = await this.employeeData.getEmployeeTimeRecordsByMonthAndYear(input.employeeId, input.month, input.year);

        let salary;
        try {
            salary = SalaryCalculatorFactory.create(employee.type).calculate(employee, timeRecords);
        } catch (error) {
            salary = 0;
        }

        return {
            employeeName: employee.name,
            salary
        };
    }
}

type Input = {
    employeeId: number,
    month: number,
    year: number
}

type Output = {
    employeeName: string,
    salary: number
}

export interface EmployeeDataCalculatePayroll {
    getEmployee(employeeId: number): Promise<any>;
    getEmployeeTimeRecordsByMonthAndYear(employeeId: number, month: number, year: number): Promise<any>;
}