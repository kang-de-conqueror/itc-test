# Pokémon Explorer

This project is a Pokémon listing and filtering application built with Next.js, enabling users to explore Pokémon by types, paginate through the list, and dynamically filter results. It uses the PokéAPI for fetching Pokémon data.

## Features

- **Pokémon List**: Browse through Pokémon with pagination.
- **Type Filtering**: Filter Pokémon by their types (e.g., Water, Fire, Electric).
- **Pagination**: Navigate between pages to see more Pokémon.
- **Responsive Design**: Optimized for both mobile and desktop views.

## Getting Started

Follow the steps below to set up the project and get it running locally.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation
Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Usage

Once the development server is running, you can use the following features:

1. **Explore Pokémon**
   - Navigate through Pokémon with pagination.
   - By default, the app shows 10 Pokémon per page.

2. **Filter Pokémon by Type**
   - Select one or multiple types from the type filter (e.g., Water, Fire).
   - The Pokémon list will automatically update based on your selected types.

3. **Change Pagination Limit**
   - You can adjust the number of Pokémon displayed per page using the dropdown pagination control (options: 10, 25, 50, 100).

4. **Responsive UI**
   - The app is fully responsive, making it easy to use on mobile devices as well as desktops.

## Project Structure

The project follows a clean, modular architecture using Next.js's App Router.

- **/app**: The main entry point for the application.
- **/components**: Contains reusable components such as `PokemonList`, `PokemonItem`, `Pagination`, and `PokemonTypeFilter`.
- **/services**: Handles API calls to fetch Pokémon data.
- **/types**: Defines TypeScript types for the project.

## API

The application uses the PokéAPI to fetch data about Pokémon and their types. Learn more about PokéAPI's usage [here](https://pokeapi.co/docs/v2).

## Learn More

To learn more about Next.js and its features:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial.