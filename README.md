# Simple React Map Marker

### Observations

> * Ensure to run **npm install** inside **/react-app** folder.
> * API's URL and Google Maps API key setup are required on the file present at **/react-app/src/api.js** for ensure the application works correctly.
> * Create a file called **database.json** inside **the /api/ReactMapMarkerApi/ReactMap** folder, with your connection string. Example below:

```[json]
{
  "ConnectionString": "Data Source=DESKTOP-MACHINE-ID\\SQLEXPRESS;Database=reactmap;User Id=YourUserName;Password=YourPassword"
}
```

### Folders

* **/api**: the ASP.NET Web API's folder
* **/react-app**: the ReactJS Application's folder

### API routes

* **GET** /places
* **POST** /places
* **PUT** /places
* **DELETE** /places

### Commands

> * **Right Mouse Click** on the map for add a new place
> * **Mouse Click** on a marker on the map for show it's details and be able to Edit and Delete it

## Screenshots

![Main Screen](https://raw.githubusercontent.com/felzend/react-map-marker/master/screenshots/1.png)

![Marker Details](https://raw.githubusercontent.com/felzend/react-map-marker/master/screenshots/2.png)

![Adding New Place](https://raw.githubusercontent.com/felzend/react-map-marker/master/screenshots/3.png)
