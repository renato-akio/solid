import express, {Request, Response, request} from "express";
import pgp from "pg-promise"
const app = express();
app.use(express.json());

app.post("/calculate_payroll", async function (req: Request, res: Response) {
    const connection = pgp()("postgres://solid:123456@localhost:5432/solid");
    const [employee] = await connection.query("select * from code2you.employee where employee_id = $1", [req.body.employeeId]);
    const timeRecords = await connection.query("select * from code2you.time_record where employee_id = $1 and extract(month from checkin_date) = $2 and extract(year from checkin_date) = $3", [req.body.employeeId, req.body.month, req.body.year]);
    //console.log(timeRecords)
    //console.log(employee);
    //console.log(req.bod); 

    let hours = 0;
    for(const record of timeRecords){
        hours += (record.checkout_date.getTime() - record.checkin_date.getTime())/(1000*60*60);
    }


let salary = 0;
    if (employee.type === "hourly")
        salary = hours * parseFloat(employee.wage);

    if (employee.type === "salaried"){
        const hourlyRate = parseFloat(employee.salary)/160;
        //console.log(hourlyRate)
        //console.log(hours)
        const diff = (hours - 160) * hourlyRate;
        salary = parseFloat(employee.salary) + diff;
    }
        
    await connection.$pool.end();

    //console.log(employee.name)

    res.json({
        employeeName: employee.name,
        salary
    });
})

app.listen(3333, ()=>{console.log("Server is running")});