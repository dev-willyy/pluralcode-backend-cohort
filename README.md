# Pluralcode Node.js-Express Backend Cohort

This is a basic Node.js Express project with a configuration directory for environment variables.

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

2. Navigate to the project directory:

   ```bash
   cd your-project
   ```

3. Create a config directory, inside the config directory, create a .env file:

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
   - This project is licensed under the MIT License - see the LICENSE file for details.
