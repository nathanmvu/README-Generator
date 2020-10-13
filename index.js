const { default: Axios } = require('axios');
const fs = require('fs');
const inquirer = require('inquirer');
const util = require("util");;

const writeFileAsync = util.promisify(fs.writeFile);

async function init() {
    // Prompts to ask user for README information
    const userPrompt = await inquirer
    .prompt([
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
    ]);
    // Getting Github API response
    const gitResponse = await Axios.get(`https://api.github.com/users/${userPrompt.username}`);
    const userAvatar = gitResponse.data.avatar_url;
    const userEmail = gitResponse.data.email;

    // Getting license badge
    const licenseTxt = (license) => {
        if(userPrompt.license === 'MIT') {
            return `[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)`;
        } else if(userPrompt.license === 'Mozilla Public License 2.0') {
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        } else if(userPrompt.license === `Apache License 2.0`) {
            return `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        } else  {
            return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        }
    }

    //README Content
    let content =
`[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat)]()
# ${userPrompt.title}

## Description
${userPrompt.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)

## Installation
${userPrompt.installation}

## License
${licenseTxt(userPrompt.license)}

## Contributing
${userPrompt.contributing}

## Tests
${userPrompt.tests}

## Questions
[Github Avatar](${userAvatar})
[Github Email](${userEmail})
[Github](https://github.com/${userPrompt.username}/)`;

    writeFileAsync('README.md', content, 'utf8');

}
init();