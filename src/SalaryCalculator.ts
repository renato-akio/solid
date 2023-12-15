export interface SalaryCalculator {
    calculate(employee: any, timeRecords: any): number;
}

export class HourlyCalculator implements SalaryCalculator {
    calculate(employee: any, timeRecords: any): number {
        let hours = 0;
        for (const record of timeRecords) {
            hours += (record.checkout_date.getTime() - record.checkin_date.getTime()) / (1000 * 60 * 60);
        }

        let salary = 0;
        salary = hours * parseFloat(employee.wage);

        return salary;
    }

}

export class SalariedCalculator implements SalaryCalculator {
    calculate(employee: any, timeRecords: any): number {
        let hours = 0;
        for (const record of timeRecords) {
            hours += (record.checkout_date.getTime() - record.checkin_date.getTime()) / (1000 * 60 * 60);
        }

        let salary = 0;
        const hourlyRate = parseFloat(employee.salary) / 160;
        const diff = (hours - 160) * hourlyRate;
        salary = parseFloat(employee.salary) + diff;

        return salary;
    }
}

export class SalaryCalculatorFactory {
    static create (type:string) {
        if (type==="hourly") return new HourlyCalculator();
        if (type==="salaried") return new SalariedCalculator();
        throw new Error();
    }
}
