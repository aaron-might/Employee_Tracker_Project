# EMPLOYEE_TRACKER_PROJECT

  # Description

  
  Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, the task of this project is to build a solution for managing a company's employees.This app is command-line based that runs with Node.js using node, inquirer, and MySQL dynamically generating CMS.
 

  ## Table of Contents

  - [Description](#Description)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Licence](#Licence)
  - [Contributors](#Contributors)
  - [Test](#Test)
  - [Repository Link](#Repository)
  - [GitHub Info](#GitHub) 
  
  
  ## Installation
  
  Steps required to install project and how to get the development environment running: To generate your CMS first run npm install in order to install the following npm package dependencies as specified in the package.json: inquirer,sql,console.table, logo-asciiart.The application itself can be invoked with npm start.
  
  ## Usage
  
  the following is walkthrough video and explanation:
 
  When you run npm start, the application uses the inquirer package to prompt you in the command line with a series of questions about your company. The application then takes your responses and uses axios to fetch your GitHub profile from the GitHub API, including your GitHub profile picture (avatar) and email. From there, the application will generate markdown and a table of contents for the README conditionally based on your responses to the Inquirer prompts (so, if you don't answer the optional questions, such as Installation, an Installation section will not be included in your README). The README will also include badges for your GitHub repo.Finally, fs.writeFile is used to generate your project's README.md file.
  
  ## credits

  © 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.

  ## licences

  Apache license 2.0

  ## Licences badges

  https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg

  ## Contributors
  
  anyone is welcome to contribute to this project
  
  ## Test
  
  run:npm run test
  
  ## Repository
  
  - [Project Repo](github.com/aaron-might/team_profile_generator)
  
  ## GitHub
  
  ![Image of me](https://avatars.githubusercontent.com/u/83680026?v=4),
  -![GitHub name](null),
  -![GitHub Profile](https://github.com/aaron-might),
  - [GitHub email](null)