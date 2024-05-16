# Getting Started with React Movie Search App

This project is a movie search application built with React. It allows users to search for movies by title and view detailed information about each movie.
***

## How to use

1. Enter a movie title in the search bar and press Enter or click the search button.
2. The application will fetch and display a list of movies matching the search query.
3. Click on a movie card to view detailed information about the movie, including the plot, actors, genre, director, and release date.

Enjoy searching for your favorite movies with the React Movie Search App!

- Desktop View


https://github.com/rhythm55/movie-search/assets/36883992/8b1d17fc-fa98-4a24-9696-01701babf54a


- Mobile View


https://github.com/rhythm55/movie-search/assets/36883992/ceae167d-6add-4aec-b82d-a8076b59544f


***

## How to run the application

Before running the application, make sure you have Node.js and npm installed on your machine.

### 1. `npm install`

Installs all the dependencies

### 2. add OMDb API key in .env file

1. visit to https://www.omdbapi.com/
2. open API Key tab
3. Generate API Key
4. in `.env` file add `REACT_APP_OMDD_API_KEY=OMDD_API_KEY`

### 3. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

***

## Project Requirements:

- Build a movie search application using ReactJS.
- Create two main components: a search bar and a display component for search results.
- Fetch movie data from the OMDb API based on user input.
- Display search results with movie title, poster image, and summary.
- Allow users to click on a movie to view details like release year, genre, director, actors, and plot.
- Implement basic error handling for cases where no results are found.

***

# Project Design

## Design Outline

### Search Movie
- User enters text in the search bar.
- OMDb API is called with the searched text.
- Results are displayed on the screen in cards with pagination.

### View Movie Details
- User clicks on a Movie Card to view details.
- OMDb API is called with imdbID to fetch movie details.
- A modal opens displaying information like release year, genre, director, actors, and plot.
- Modal can be closed by clicking on a close icon or outside the modal.

### Pagination
- Pagination appears at the bottom of the movie results.
- Users can click on Next/Previous buttons to navigate between pages, triggering API calls.
- Users can switch between sets of pages using NextSet/PreviousSet buttons.

## Component Design
![Screenshot 2024-05-13 at 2 13 44 AM](https://github.com/rhythm55/movie-search/assets/36883992/79d93c1b-d8fd-43d4-bd9d-45029074455b)
![Screenshot 2024-05-13 at 2 14 07 AM](https://github.com/rhythm55/movie-search/assets/36883992/70905b8f-0c26-45dc-8061-f6e7b48feb23)
![Screenshot 2024-05-13 at 2 14 20 AM](https://github.com/rhythm55/movie-search/assets/36883992/4e7210d4-dd42-4502-aed4-784bb8a34074)


***

## Libraries used​
- React​
- Typescript - improve code quality and maintainability​
- React Testing Library – for unit test and user-centric testing approach​
- Jest – for unit test runners, assertions, and mocking capabilities​
- Tailwind CSS –  For styling as Provides reusable, easy to maintain and consistent styling throughout application
- Hero Icons – For icons as work seamlessly with Tailwind CSS, easy to use and customizable​
- Sonarqube – checks code quality to ensure maintainable, reliable, and secure code​
***

## Testing 
![Screenshot 2024-05-13 at 2 33 40 AM](https://github.com/rhythm55/movie-search/assets/36883992/df7f3b9f-be24-45f7-90dc-9369b15d1d22)

***

## Sonarqube quality check 
![Screenshot 2024-05-16 at 12 10 08 AM](https://github.com/rhythm55/movie-search/assets/36883992/e586dd27-bda7-4685-b377-f892df92946d)


## States supported 

- ### No movie found
  - ![Screenshot 2024-05-13 at 2 35 48 AM](https://github.com/rhythm55/movie-search/assets/36883992/b33ffdc5-e4c3-490c-bd12-87552497be5e)


- ### Too Many search Result
  - ![Screenshot 2024-05-13 at 2 36 43 AM](https://github.com/rhythm55/movie-search/assets/36883992/f2525b35-b85c-4f8e-8319-4459e61ac365)


- ### Generic error state - shown in Error boundary , api failure or api response error
  - ![Screenshot 2024-05-13 at 2 37 39 AM](https://github.com/rhythm55/movie-search/assets/36883992/f3b1f6ff-26ab-4b96-9d3d-92e36ad66b0e)


- ### Poster not available
    - ![Screenshot 2024-05-13 at 2 41 02 AM](https://github.com/rhythm55/movie-search/assets/36883992/505a51bd-c11d-47cb-ac8f-c77b224ea8c6)

    - ![Screenshot 2024-05-13 at 2 41 13 AM](https://github.com/rhythm55/movie-search/assets/36883992/74fd8580-c1c9-4d2c-a862-1f64d6cf39c4)


***

## Search Input Validations

- Should not allow empty search
    - ![Screenshot 2024-05-13 at 2 45 04 AM](https://github.com/rhythm55/movie-search/assets/36883992/31b4ece4-5646-466a-bd00-067b9f8f9a20)


- Should only allow alphabets and numerics
  - ![Screenshot 2024-05-13 at 2 48 11 AM](https://github.com/rhythm55/movie-search/assets/36883992/bfe46e98-f016-41bc-ba0b-4a06a2e25ff7)

