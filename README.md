# CareFinder

## Overview
CareFinder is a web application that allows users to search for healthcare providers based on various criteria and view detailed information. This app provides a clean and intuitive interface for managing search results and interacting with provider data.

## Deployment
[View Live Application](https://healthcare-search.vercel.app/)

## Features
- **Search Providers**: Search healthcare providers by classifications and other parameters.
- **View Provider Details**: Display key information, such as names, credentials, gender, taxonomy, phone numbers, and addresses.
- **Responsive Design**: Optimized for desktop and mobile devices with a responsive grid layout.
- **Load More Results**: Seamlessly load additional results as you scroll.

## Technologies
- **Frontend**: React.js with Tailwind CSS for styling.
- **Backend**: Node.js API integration for fetching provider data.

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to run locally
1. Clone the repository:
   ```bash
   git clone https://github.com/zwsaile/healthcare-search.git
   cd healthcare-search
2. Start the Development Server
   ```npm run dev```
3. Open your Browser and Navigate to:
   ```http://localhost:3000```

## Future Enhancements
- Add like/favorite functionality
- Add dynamic list of cities to choose from relative to the state selected 
- Add user authentication for saving liked providers across sessions.
- Integrate with a database to store user preferences and data.

## Contributing
1. Fork the repository.

1. Create a feature branch:
   ```git checkout -b feature/your-feature-name```
2. Commit your changes:
   ```git commit -m "Add your feature description"```
3. Push to your branch:
   ```git push origin feature/your-feature-name```
4. Open a pull request.
