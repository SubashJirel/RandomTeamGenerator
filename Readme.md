# Random Team Generator

A full-stack web application that helps organize players into balanced teams based on skill levels. Perfect for sports events, gaming tournaments, or any activity requiring fair team distribution.

## Features

- **Player Management**

  - Add single or multiple players
  - Assign skill levels (1-5) to players
  - Group players together
  - Edit and delete players

- **Team Generation**

  - Create balanced teams based on player skill levels
  - Customizable team names and count
  - View average team skill levels
  - Generate shareable public links for team distributions

- **Group Management**
  - Create player groups
  - Generate teams within specific groups
  - View players by group

## Tech Stack

### Frontend

- React with Vite
- React Router for navigation
- TanStack Query for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- MongoDB with Mongoose
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository

```sh
git clone https://github.com/SubashJirel/RandomTeamGenerator
cd RandomTeamGenerator
```

2. Install backend dependencies

```sh
cd server
npm install
```

3. Install frontend dependencies

```sh
cd client
npm install
```

4. Set up environment variables Create a .env file in the server directory:

```sh
MONGO_URI=your_mongodb_connection_string
```
