# Getting Started with React Movie Search App

This project is a movie search application built with React. It allows users to search for movies by title and view detailed information about each movie.
***

## How to use

1. Enter a movie title in the search bar and press Enter or click the search button.
2. The application will fetch and display a list of movies matching the search query.
3. Click on a movie card to view detailed information about the movie, including the plot, actors, genre, director, and release date.

Enjoy searching for your favorite movies with the React Movie Search App!

***

## How to run the application

Before running the application, make sure you have Node.js and npm installed on your machine.

### 1. `npm install`

Installs all the dependencies

### 2. `npm start`

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

![Screenshot 2024-05-13 at 2 13 44 AM](https://github.com/rhythm55/test2/assets/36883992/70255f38-c91b-4dae-b69a-adb5f750a62a)

![Screenshot 2024-05-13 at 2 14 07 AM](https://github.com/rhythm55/test2/assets/36883992/f80e745c-2b4d-4207-ab9f-201b494a836e)

![Screenshot 2024-05-13 at 2 14 20 AM](https://github.com/rhythm55/test2/assets/36883992/d3840cd9-f8fd-4df9-83f7-c52e8465eafd)

***

## Libraries used​
- React​
- Typescript - improve code quality and maintainability​
- React Testing Library – for unit test and user-centric testing approach​
- Jest – for unit test runners, assertions, and mocking capabilities​
- Tailwind CSS –  For styling as Provides reusable, easy to maintain and consistent styling throughout application
- Hero Icons – For icons as work seamlessly with Tailwind CSS, easy to use and customizable​

***

## Testing 
![Screenshot 2024-05-13 at 2 33 40 AM](https://github.com/rhythm55/test2/assets/36883992/40f548f1-1228-4a23-b313-d6e82db20372)

***

## States supported 

- ### No movie found
  - ![Screenshot 2024-05-13 at 2 35 48 AM](https://github.com/rhythm55/test2/assets/36883992/2e7f9a6d-672f-46b2-adc3-c85773320a7b)

- ### Too Many search Result
  - ![Screenshot 2024-05-13 at 2 36 43 AM](https://github.com/rhythm55/test2/assets/36883992/13337643-9c06-4255-9efe-ec55c10e7bcf)

- ### Generic error state - shown in Error boundary , api failure or api response error
  - ![Screenshot 2024-05-13 at 2 37 39 AM](https://github.com/rhythm55/test2/assets/36883992/63ac5706-55a1-48f7-b114-ad0bb724d597)

- ### Poster not available
    - ![Screenshot 2024-05-13 at 2 41 13 AM](https://github.com/rhythm55/test2/assets/36883992/05e3d383-16a4-423a-a49a-8ae0e2089cfd)
    - ![Screenshot 2024-05-13 at 2 41 02 AM](https://github.com/rhythm55/test2/assets/36883992/5b0290fe-4cdd-4339-bf42-ff91b57710a2)

***

## Search Input Validations

- Should not allow empty search
    - ![Screenshot 2024-05-13 at 2 45 04 AM](https://github.com/rhythm55/test2/assets/36883992/d6b157b0-f227-425d-a105-36f091eb9020)

- Should only allow alphabets and numerics
  - ![Screenshot 2024-05-13 at 2 48 11 AM](https://github.com/rhythm55/test2/assets/36883992/157eb68d-f17b-4f47-a059-1a451bf8573d)
