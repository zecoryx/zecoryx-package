import inquirer from 'inquirer';

export const getPrompts = async () => {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-react-app',
      validate: input => !!input.trim() || 'Name cannot be empty'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose language:',
      choices: ['JavaScript (JSX)', 'TypeScript (TSX)'],
      filter: val => val.includes('TypeScript') ? 'tsx' : 'jsx'
    },
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'UI Library:',
      choices: ['Tailwind CSS', 'Chakra UI', 'None']
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Add React Router?',
      default: true
    },
    {
      type: 'confirm',
      name: 'icons',
      message: 'Add React Icons?',
      default: true
    },
    {
      type: 'list',
      name: 'notification',
      message: 'Notification library:',
      choices: ['react-toastify', 'sonner', 'None'],
      when: answers => answers.uiLibrary !== 'Chakra UI'
    },
    {
      type: 'list',
      name: 'structure',
      message: 'Project structure:',
      choices: ['ZCS', 'Classic']
    }
  ]);
};  