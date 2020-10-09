// TO-DO 
// Badge, Project Title, Description, Table of Contents, Installation, Usage, License, Contributing, Tests, Questions (Github profile, email)

const fs = require('fs');
const inquirer = require('inquirer');
const util = require("util");;

const writeFileAsync = util.promisify(fs.writeFile);

// Prompts to ask user for README information
inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?'
    },
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
        name: 'installation',
        message: 'Write out the installation instructions'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions for usage'
    },
    {
        type: 'list',
        message: 'Choose a license for your project',
        choices: ['MIT', 'Mozilla Public License 2.0', 'Apache License 2.0', 'GNU GPL v3'],
        name: 'license'
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
    // README Content

    const licenseTxt = (license) => {
        if(data.license === 'MIT') {
            return `[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)`;
        } else if(data.license === 'Mozilla Public License 2.0') {
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        } else if(data.license === `Apache License 2.0`) {
            return `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        } else  {
            return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        }
    }

    let content =
`[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat)]()
# ${data.title}

## Description
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)

## Installation
${data.installation}

## License
${licenseTxt(data.license)}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
[Github](https://github.com/${data.username}/)`;

    writeFileAsync('README.md', content, 'utf8');

})