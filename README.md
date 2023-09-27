# Pluralcode Node.js-Express Backend Cohort

- This is the remote repo that contains all our Nodejs backend <ins>lecture codes</ins> and <ins>assignment solutions</ins> for all covered weeks. It should serve as a <ins>progress guide</ins> and <ins>consistency tracker</ins>.
- The <ins>commit messages</ins> are detailed, and can be used to track what week and topic is treated in a <ins>specific sub-directory</ins>

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dev-willyy/pluralcode-backend-cohort.git
   ```

2. `Steps 3 & 4` only applies if you are in the nodejs-express sub-directory. For all other sub-directories, `steps 3 & 4`, and then proceed to **Usage** section

3. Navigate to the project directory:

   ```bash
   cd your-project
   cd nodejs-express
   ```

4. Create a config directory, inside the config directory, create a .env file:

   ```bash
   mkdir config
   cd config
   touch .env
   ```

## Usage

1. **Install Dependencies:**

   ```bash
   npm install
   ```

   - This command will install all the necessary dependencies for the project.

2. **Start the Server:**

   ```bash
   npm run dev
   ```

   - This command will start the server. It will run on the specified PORT which you can configure in the .env file.
   - The server will be accessible at http://localhost:3000 by default.

3. **Configuration:**

   - You can modify the PORT and SECRET_KEY by editing the .env file in the config directory.

4. **Contributing:**

   - If you'd like to contribute, please fork the repository and create a pull request. You can also open an issue for any bugs or feature requests.

5. **License:**

   - This project is licensed under the MIT License - see the [LICENSE file](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) for details.
