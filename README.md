# GitHub Repository Portfolio Web App

## Overview

This web application allows you to view, update, create, and delete GitHub repositories. Built using Vite, React, TypeScript, and Tailwind CSS, it provides an interactive interface to manage your GitHub repositories.

## Features

- **View Repositories**: List all GitHub repositories with pagination.
- **Repository Details**: View details of a specific repository, including languages used.
- **Create Repository**: Add new repositories using a modal form.
- **Update Repository**: Modify the details of existing repositories.
- **Delete Repository**: Remove repositories with confirmation.
- **Error Handling**: Includes error boundaries and a custom 404 page.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **API**: GitHub REST API
- **HTTP Client**: Axios

## Prerequisites

- Node.js and npm installed
- GitHub account with a personal access token

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_USERNAME=your_github_username
```

Replace `your_github_token` and `your_github_username` with your actual GitHub token and username.

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

### 5. Build for Production

```bash
npm run build
```

The production build will be available in the `dist` directory.

## Usage

- **Home Page**: View a list of your GitHub repositories with pagination.
- **Repository Details**: Click on a repository name to view its details, including languages used.
- **Create Repository**: Click the "Create New Repository" button to open a modal for creating a new repository.
- **Update Repository**: In the repository details view, click "Update Repository" to modify its details.
- **Delete Repository**: In the repository details view, click "Delete Repository" to remove it.

## Error Handling

The application includes error boundaries to handle API errors gracefully and a custom 404 page for unmatched routes.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions, please reach out to [chukwukaycee17@gmail.com](mailto:chukwukaycee17@gmail.com).

```

### Customizing the README

1. **Project Description**: Update the overview and features sections to reflect the specific functionalities and purpose of your project.

2. **Tech Stack**: Adjust the tech stack section if you use any additional libraries or tools.

3. **Environment Variables**: Make sure the environment variables and setup instructions are accurate for your project.

4. **Contact Information**: Replace the contact information with your own or your team's contact details.

5. **License**: If you are using a different license, replace the license section accordingly.

Feel free to modify the sections and content to better fit your project and team’s needs.
