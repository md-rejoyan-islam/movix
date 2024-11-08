# Movix - Movie Information Platform

Movix is a feature-rich web application that provides users with an extensive database of movies and TV shows. Built with modern web technologies and deployed on Vercel, Movix offers a seamless and engaging experience for movie enthusiasts.

## Features

1. **Elegant Loading Screen**

   - Displays the Movix logo with a progress bar
   - 1-second delay for a smooth transition to the main content

2. **Responsive Header**

   - Logo and navigation menu
   - Search functionality
   - User account section

3. **Dynamic Hero Section**

   - Showcases popular or trending content
   - Auto-playing video background (when available)
   - Title, genre, and brief description overlay

4. **Content Categories**

   - Trending
   - Popular
   - Top Rated
   - Upcoming/Now Playing

5. **Content Carousels**

   - Horizontal scrolling for each category
   - Poster images with hover effects

6. **Detailed Content Pages**

   - Comprehensive information about movies/TV shows
   - Cast and crew details
   - Similar content recommendations

7. **Search Functionality**

   - Real-time search suggestions
   - Filter options (movies, TV shows, people)

8. **Responsive Design**
   - Optimized for various screen sizes (desktop, tablet, mobile)

## Technical Implementation

### Frontend

- React.js for building the user interface
- Redux-toolkit-query for state management
- Tailwind CSS for styling

### API Integration

- TMDB (The Movie Database) API for fetching movie and TV show data

### Deployment

- Vercel for hosting and continuous deployment

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movix.git
   cd movix
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage Guide

### Navigation

- Use the top menu to browse different categories
- Scroll through content carousels on the homepage
- Click on movie/show posters to view detailed information

### Searching

1. Click on the search icon in the header
2. Type your query in the search bar
3. Select from the real-time suggestions or press enter to view all results
4. Use filters to refine your search

## Loading Behavior

1. Initial 1-second loading screen with Movix logo and progress bar
2. Smooth transition to the main content
3. Lazy loading of images and content as the user scrolls

## Acknowledgments

- TMDB for providing the comprehensive movie and TV show database
- The open-source community for the various libraries and tools used in this project

## Preview

[Live Preview](https://movix-cinema.vercel.app)
