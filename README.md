# JustDrive
CS-410 Project Just Drive

## Team Members
- Sergio Barro-Ojeda
- Rafael Cruz
- Adi Edelhaus

## Project Overview
JustDrive is a web application that provides routing and navigation functionalities using Leaflet.

## Development Guidelines
1. **Main Branch**: The `main` branch contains the stable production-ready code.
2. **Developer Branch**: The `developer` branch is used for integrating new features.
3. **Feature Branches**: Create a branch off of `developer` for each new feature.
4. **Committing Changes**: Once a feature is complete, commit to `developer`.
5. **Merging to Main**: After testing in `developer`, merge to `main`.

## Features
- **Custom UI Integration**: Uses a custom UI for search and click routing.
- **Routing and Navigation**: Syncs user inputs (search and map clicks) for dynamic routing.
- **Favorite Places**: Predefined favorite locations included in routes.
- **Comfort Score Calculation**: Calculates and displays comfort scores for routes.

## Technologies Used
- **React**: For building the user interface.
- **Leaflet**: For interactive maps.
- **Leaflet Routing Machine**: For route planning.
- **React-Leaflet**: For integrating Leaflet with React.

## Setup and Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/cruz27r/JustDrive.git
    cd JustDrive/JustDrive-Web
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

## License
This project is licensed under the MIT License.

## Acknowledgements
- [Leaflet](https://leafletjs.com/)
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/)
- [React-Leaflet](https://react-leaflet.js.org/)
