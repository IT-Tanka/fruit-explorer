# Fruit Explorer 🍏🍎🍇🍋‍🟩

Fruit Explorer is a single-page application (SPA) developed to work with fruit data. The app allows users to explore and filter fruit information, add fruits to a favorite list, and view details about fruits by their group. It is built with **Nuxt 3** and **Vue 3**, using the Composition API and **Pinia** for global state management.

## Features

- **Main Page (Home)**: Displays fruit cards in a grid layout. Allows dynamic filtering of fruits based on nutritional values such as calories, fat, sugar, carbohydrates, and protein. Filters update instantly as the user changes the values.
  
- **Fruit Card**: Each fruit card shows the main nutritional values and group information. It includes buttons to add or remove fruits from the favorites list. Clicking on the group name (family) navigates to a page showing fruits from that group.
  
- **Group Page (Family Page)**: Displays fruits of a selected group and allows filtering similar to the main page. Users can also add or remove fruits from the favorites list.
  
- **Favorites Page**: Displays a list of fruits added to the selected (favorites) list. Fruits can be removed from this list. The state of the favorites list is persisted between page reloads using `localStorage`.

## Technologies Used

- **Vue 3**: Front-end framework using the Composition API.
- **Nuxt 3**: Server-side rendering and routing.
- **Pinia**: Global state management for managing favorites.
- **SCSS/CSS**: Styling the application without external UI libraries.
- **API Integration**: Fetches fruit data from a provided API.

## Setup and Installation

To run the project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fruit-explorer.git
cd fruit-explorer
```
### 2. Install dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```
### 3. Run the development server
To start the project in development mode, run:
```bash
npm run dev
```
This will start the Nuxt 3 development server, and you can access the application at http://localhost:3000.

### 4. Build for production
To build the application for production, run:

```bash
npm run build
```

### Features and Optimizations
- Dynamic Filtering: Users can adjust the ranges for nutritional values, and the fruit cards update in real-time.
- Global State Management: Favorites are managed globally using Pinia and persist between sessions using localStorage.
- Optimized Rendering: The app uses Vue 3's features to prevent unnecessary re-renders, especially for dynamic filter updates.
### Deployment
The app is deployed on Vercel for live demo. You can visit the deployed version here (link to be provided once deployed).
