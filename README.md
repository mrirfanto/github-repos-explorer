# GitHub Repositories Explorer

A React application that allows users to search and explore GitHub repositories through GitHub's public API.

## Project Description

This application provides a simple and intuitive interface to:

- Search for up to 5 GitHub users with usernames similar to the input value
- View detailed repository information for any selected GitHub user
- Display all repositories for the selected user without limitation

## Features

- Real-time user search with GitHub API integration
- Interactive user selection
- Comprehensive repository listing
- Clean and responsive user interface

## Technologies

- React
- TypeScript
- Vite
- GitHub REST API (2022-11-28 version)

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn
- GitHub Personal Access Token (for local development)

### Environment Setup

1. Create a GitHub Personal Access Token:

   - Go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
   - Generate a new token with the following permissions:
     - `read:user`
     - `repo`
   - Copy the generated token

2. Create a `.env.local` file in the root directory:

```bash
VITE_GITHUB_API_TOKEN=your_github_token_here
```

### Installation

1. Clone the repository:

```bash
git clone git@github.com:mrirfanto/github-repos-explorer.git
cd github-repos-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## API Integration

This project integrates with the GitHub API v3. For more information about the API, visit:
[GitHub API Documentation](https://developer.github.com/v3/)

Note: The GitHub API has rate limits. Using a personal access token increases your rate limit from 60 requests per hour to 5,000 requests per hour.

## Development

This project was bootstrapped with Vite and includes:

- TypeScript support
- ESLint configuration for code quality
- Hot Module Replacement (HMR)
- React Fast Refresh

## License

This project is open source and available under the MIT license.
