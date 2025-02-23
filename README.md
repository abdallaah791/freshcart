# FreshCart

FreshCart is a modern e-commerce web application built with React and Vite. It leverages Tailwind CSS for styling and includes various libraries for enhanced functionality.

## Features

- Fast and optimized development with Vite
- Modern React setup with hooks and context
- Tailwind CSS for utility-first styling
- Form handling with Formik and Yup
- Routing with React Router
- Slick carousel for product sliders
- Toast notifications with React Hot Toast

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/freshcart.git
   cd freshcart
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server and you can view the application at `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

### Linting

To lint the codebase, run:

```bash
npm run lint
# or
yarn lint
```

### Previewing the Production Build

To preview the production build locally, run:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
/freshcart
├── public          # Static assets
├── src             # Source code
│   ├── components  # React components
│   ├── pages       # Page components
│   ├── styles      # CSS and Tailwind styles
│   └── ...         # Other directories and files
├── package.json    # Project metadata and dependencies
├── vite.config.js  # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── ...             # Other configuration files
```

## Dependencies

### Main Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Entry point of the DOM-related rendering paths.
- **React Router DOM**: Declarative routing for React applications.
- **Formik**: Build forms in React, without the tears.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **React Hot Toast**: Smoking hot React notifications.
- **React Slick**: Carousel component built with React.
- **Slick Carousel**: The last carousel you'll ever need.
- **Lucide React**: Beautiful & consistent icon toolkit made by the community.

### Development Dependencies

- **Vite**: Next generation frontend tooling.
- **Tailwind CSS**: A utility-first CSS framework.
- **ESLint**: Pluggable JavaScript linter.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins.
- **Autoprefixer**: Parse CSS and add vendor prefixes to CSS rules.

## License

This project is licensed under the MIT License.
