var inquirer = require("inquirer");
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      message: "Enter Username : ",
      name: "userName",
    },
    {
      type: "password",
      message: "Enter Password : ",
      mask: "*",
      name: "password",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
