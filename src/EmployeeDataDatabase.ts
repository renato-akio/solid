import pgp from "pg-promise"
import EmployeeData from "./EmployeeData";

export default class EmployeeDataDatabase implements EmployeeData {
    async getEmployee(employeeId: number) {
        const connection = pgp()("postgres://solid:123456@localhost:5432/solid");
        const [employee] = await connection.query("select * from code2you.employee where employee_id = $1", [employeeId]);

        await connection.$pool.end();

        return employee;
    }

    async getEmployeeTimeRecordsByMonthAndYear(employeeId: number, month: number, year: number) { 
        const connection = pgp()("postgres://solid:123456@localhost:5432/solid");
        const timeRecords = await connection.query("select * from code2you.time_record where employee_id = $1 and extract(month from checkin_date) = $2 and extract(year from checkin_date) = $3", [employeeId, month, year]);

        await connection.$pool.end();

        return timeRecords;
    }
}