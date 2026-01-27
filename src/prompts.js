import inquirer from 'inquirer';
import chalk from 'chalk';

export const getPrompts = async () => {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-web-app',
      validate: input => !!input.trim() || 'Name cannot be empty'
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Choose project type:',
      choices: [
        { name: chalk.cyan('React (Vite)'), value: 'vite' },
        { name: chalk.magenta('Next.js (App Router)'), value: 'next' }
      ]
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose language:',
      choices: ['JavaScript', 'TypeScript'],
      filter: val => val.toLowerCase() === 'typescript' ? 'ts' : 'js'
    },
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'UI Library:',
      choices: ['Tailwind CSS', 'Chakra UI', 'None'],
      when: answers => answers.projectType === 'vite'
    },
    {
      type: 'list',
      name: 'auth',
      message: 'Choose Authentication provider:',
      choices: ['None', 'Clerk', 'Supabase', 'Firebase']
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Add React Router?',
      default: true,
      when: answers => answers.projectType === 'vite'
    },
    {
      type: 'list',
      name: 'icons',
      message: 'Choose Icon library:',
      choices: ['React Icons', 'Lucide React', 'None'],
      default: 'React Icons'
    },
    {
      type: 'list',
      name: 'notification',
      message: 'Notification library:',
      choices: ['react-toastify', 'sonner', 'None'],
      when: answers => answers.projectType === 'vite' && answers.uiLibrary !== 'Chakra UI'
    },
    {
      type: 'list',
      name: 'structure',
      message: 'Project structure:',
      choices: ['ZCS', 'Classic'],
      when: answers => answers.projectType === 'vite'
    },
    {
      type: 'confirm',
      name: 'stateManagement',
      message: 'Add Zustand for state management?',
      default: false,
      when: answers => answers.projectType === 'vite'
    },
    {
      type: 'confirm',
      name: 'axios',
      message: 'Add Axios for API requests?',
      default: true
    }
  ]);
};  