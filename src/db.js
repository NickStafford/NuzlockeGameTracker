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

          //Make a new object store for storing our data about the encounters. Title of the game is the key.
          this.db.createObjectStore('encounters', {
            keyPath: 'title',
          })

          //Make a new object store for storing our data about the routes. Title of the game is the key.
          this.db.createObjectStore('locations', {
            keyPath: 'title',
          })
        }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService

        this.dbRequest.onsuccess = function (event) {
          console.log('Database debug: Initial database request succeeded...')
          this.db = event.target.result

          //Generic error handler
          this.db.onerror = function (event) {
            console.log('Database error: ' + event.target.error.message)
          }

          this.loadInitial(successCallback)
        }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService
      })
  }

  loadInitial(successCallback) {
    //Load the game metadata as we don't store that client-side
    fetch(this.serverData.games.filter((game) => game.name == this.serverData.default)[0].path)
      .then((result) => result.json())
      .then((result) => {
        this.getOrAdd(
          this.db,
          this.serverData?.default,
          'games',
          {title: result.title,
          time: null},
          (dbResult) => {
            result.time = dbResult?.time;
            successCallback?.(result)
          }
        )
      })
  }

  /// Get or add for the indexed db, key is the game title,
  /// source is the location where this service can perform an HTTP request to get the JSON data of a game.
  /// Returns a promise for the db request.
  getOrAdd(db, key, store, data, successCallback) {
    //Get the first game to load in to the nuzlocke table.
    var getReq = db
      .transaction(store, 'readonly')
      .objectStore(store)
      .get(key)

    getReq.onsuccess = function (event) {
      //will be null if no games
      if (event.target.result) {
        successCallback?.(event.target.result)
      } else {
        db.transaction(store, 'readwrite')
          .objectStore(store)
          .add(data)
        successCallback?.()
      }
    }.bind(this) //Because this is set as a callback function we need to bind it to this instance of the dbService

    return getReq.onsuccess;
  }

  ///Generic Save
  ///Key is optional if a keypath is being used
  saveToDB(db, store, value, key) {
    db.transaction(store, 'readwrite').objectStore(store).put(value, key)
  }

  ///Instance specific save
  ///Key is optional if a keypath is being used
  save(store, value, key) {
    this.saveToDB(this.db, store, value, key)
  }
}

export default function (callback) {
  return new dbService(callback)
}
