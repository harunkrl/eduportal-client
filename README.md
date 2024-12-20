# EduPortal Client

This is the frontend application for the EduPortal system, built with React. It allows students and instructors to manage profiles, courses, and more.

## Features

- Student and Instructor management
- Course selection and details
- Responsive design
- Error handling and notifications

## Technologies Used

- React
- Vite
- Context API for state management
- Custom hooks for API calls and notifications

## Project Structure

- **components**: Contains UI components organized by feature (e.g., `course`, `instructor`, `student`).
- **context**: Manages global state using React Context API.
- **hooks**: Custom hooks for reusable logic.
- **services**: API service for handling HTTP requests.
- **utils**: Utility functions for error handling, theming, and validation.
- **layout**: Components for consistent layout and navigation.

## Setup

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harunkrl/eduportal-client.git
   cd eduportal-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   # or
   yarn build
   ```

## Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```plaintext
VITE_API_URL=http://localhost:8080/api
```

## API Integration

The frontend interacts with the backend API to perform CRUD operations for students, instructors, and courses. Ensure the backend is running and accessible.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
