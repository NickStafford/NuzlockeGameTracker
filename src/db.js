class dbService {
  constructor(successCallback) {
    //Class Properties
    this.successCallback = successCallback
    this.db = null
    this.dbRequest = null
    this.serverData = null

    //As promises, .then is executed in the scope of this instance of the class, so no need to bind the functions.
    fetch('data/games.json')
      .then((result) => result.json())
      .then((result) => {
        this.serverData = result

        //Local Storage Setup
        this.dbRequest = window.indexedDB.open('nuzlocketracker')
        this.dbRequest.onerror = function (event) {
          alert(
            'You have not given this page the required permissions to save local state. This page will not work correctly.',
          )
        }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService

        //onupgradeneeded is fired if we have a newer version # of the database or if we have no existing database (version 1 is greater than version _null_)
        this.dbRequest.onupgradeneeded = function (event) {
          console.log('Database debug: Upgrade needed...')

          this.db = event.target.result

          //Make a new object store for storing our data about the games. Title of the game is the key.
          this.db.createObjectStore('games', {
            keyPath: 'title',
          })
        }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService

        this.dbRequest.onsuccess = function (event) {
          console.log('Database debug: Initial database request succeeded...')
          this.db = event.target.result

          //Generic error handler
          this.db.onerror = function (event) {
            console.log('Database error: ' + event.target.errorCode)
          }

          this.loadInitial(successCallback)
        }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService
      })
  }

  loadInitial(successCallback) {
    //Either load the existing default game or add it to the indexeddb.
    this.getOrAdd(
      this.db,
      this.serverData?.default,
      this.serverData.games.filter((game) => game.name == this.serverData.default)[0].path,
      successCallback,
    )
  }

  /// Get or add for the indexed db, key is the game title,
  /// source is the location where this service can perform an HTTP request to get the JSON data of a game.
  getOrAdd(db, key, source, successCallback) {
    //Get the first game to load in to the nuzlocke table.
    var getReq = db
      .transaction('games', 'readonly')
      .objectStore('games')
      .get(key)

    getReq.onsuccess = function (event) {
      //will be null if no games
      if (event.target.result) {
        console.log("Debug: Saved game data found for key '" + key + "'")
        console.log(event.target.result)
        successCallback(event.target.result)
      } else {
        console
          .log("Debug: No saved game data found for key '" + key + "'")

          fetch(source)
          .then((result) => result.json())
          .then((result) => {
            db.transaction('games', 'readwrite')
              .objectStore('games')
              .add(result)
            successCallback(result)
          })
      }
    }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService
  }

  ///Generic Save
  ///Key is optional if a keypath is being used
  saveToDB(db, value, key) {
    this.db
      .transaction('games', 'readwrite')
      .objectStore('games')
      .put(value, key)
  }

  ///Instance specific save
  ///Key is optional if a keypath is being used
  save(value, key) {
    this.saveToDB(this.db, value, key)
  }
}

export default function (callback) {
  return new dbService(callback)
}
