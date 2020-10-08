// TO-DO 
// Badge, Project Title, Description, Table of Contents, Installation, Usage, License, Contributing, Tests, Questions (Github profile, email)

const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What should the title of the project be?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Give the project a description'
    },
    {
        type: 'input',
        name: 'tableOfContents',
        message: 'What should be in the table of contents?'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Write out the installation instructions'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions for usage'
    },
    {
        type: 'input',
        name: 'license',
        message: 'Provide a license name'
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Who contributed to this project?'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Give some examples of how to run tests'
    }
]).then(function(data) {
    console.log(data);

})