
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');





// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'companysEmployee',
    multipleStatements: true,
  },
  console.log(`Connected to the companysEmployee database.`)
);

// Connect to MySQL

db.connect((err) => {

  if (err) throw err;


  console.log("MySql Connected");
  promptQuestions();

});

const promptQuestions = async () => {
    inquirer.prompt(
        [
           {
               type: 'list',
               name: 'task',
               message: 'What would you like to do?',
               choices: ['View all employees', 'Add Employee', 'Update Employee Role', 'View All Role', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
           }
       ])
       .then((answer) => {
       switch(answer.task ){

            case 'View all employees':
                viewEmployee();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View All Role':
                viewRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartment()
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quit(); 
                break;   
}
       });
}; 
const viewEmployee = async () => {
    const sql = `SELECT * FROM Employee`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        promptQuestions();
    });
   };

   const viewRole = async () => {
    const sql = `SELECT * FROM Role`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.table(result);
      promptQuestions();
    });
  };   

const addDepartment = async () => {
  const sql = `SELECT * FROM Department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    inquirer.prompt([
      {
        name: 'newDepartment',
        type: 'input',
        message: 'Enter new department you would like to add',
      },
      ])
      .then((answer) =>{
      db.query(`INSERT INTO Department(name) VALUE(?)`,
      [answer.newDepartment],
      (err, result) => {
        promptQuestions();
      }
      );
  });
});
};
const updateEmployee = async () => {
 
  const answer = await inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is your employee ID?",
    },
    {
      name: "role",
      type: "input",
      message: "What is your role ID?",
    },
  ])
  const sql = `UPDATE Employee SET rid_FK = ? WHERE id = ?`;
  db.query(sql, [answer.id, answer.role], (err, result) => {
    if (err) throw err;
    console.log(result);
    promptQuestions();
  });

  
};

const addRole = async () => {
  const sql = `SELECT * FROM Role; SELECT * FROM Department;`
  db.query(sql,  (err, result) => {
    if (err) throw err;
    console.table(result);
    inquirer.prompt([
      {
        name: "newTitle",
        type: "input",
        message: "Enter new title?",
      },
      {
        name: "newSalary",
        type: "input",
        message: "Enter new salary",
      },
      {
        name: "dept",
        type: "list",
  
        choices: function () {
          let choiceArr = result[1].map((choice) => choice.name);
          return choiceArr;
        },
        message: "Choose the department for the new title?",
      },
    ])
    .then((answer) => { 
    db.query(`INSERT INTO Role(title, salary, did_FK) 
    VALUES("${answer.newTitle}","${answer.newSalary}", 
    (SELECT did FROM Department WHERE name = "${answer.dept}"));`);
    promptQuestions();
  });
});
};
const viewDepartment = async () => {
  const sql = `SELECT * FROM Department`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
   promptQuestions();
  });
};
const addEmployee= () => {
  const sql = `SELECT * FROM Role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM Employee e`
  db.query(sql, (err, result) => {
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter first name',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter last name',
      },
      {
        name: 'role',
        type: 'list',
        message: 'Enter role',
        choices: function () {
          let choiceArr = result[0].map((choice) => choice.title);
          return choiceArr;
        },
      },
      {
        name: 'manager',
        type: 'list',
        message: 'Enter manager name',
        choices: function () {
          let choiceArr = result[0].map((choice) => choice.full_name);
          return choiceArr;
        },
      },

    ])
    .then((answer) => {
    db.query(`INSERT INTO Employee(first_name,last_name, rid_FK , manager_id) 
    VALUES (?,?, 
      (SELECT rid FROM Role WHERE title = ?), 
      (SELECT eid FROM (SELECT eid FROM Employee WHERE CONCAT(first_name,'',last_name) = ?)
      AS tmptable))`,
    [answer.firstName, answer.lastName, answer.role, answer.manager]
  );
  promptQuestions();
  });
});
};
const quit = async () => {
  db.end();
};


