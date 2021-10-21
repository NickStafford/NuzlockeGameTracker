/// Get or add for the indexed db, key is the game title,
/// source is the location where this service can perform an HTTP request to get the JSON data of a game.
function getOrAdd(db, key, source, successCallback) {
  //Get the first game to load in to the nuzlocke table.
  var getReq = db.transaction('games', 'readonly').objectStore('games').get(key)

  getReq.onsuccess = function (event) {
    //will be null if no games
    if (event.target.result) {
      console.log('Debug: Saved game data found for key \'' + key + '\'')
      console.log(event.target.result)
      window.dataObj = event.target.result
      successCallback()
    } else {
      console.log('Debug: No saved game data found for key \'' + key + '\'')
        .then((result) => result.json())
        .then((result) => {
          db.transaction('games', 'readwrite').objectStore('games').add(result)

          window.dataObj = result

          successCallback()
        })
    }
  }
}

function dbInit(successCallback) {
  fetch('data/games.json')
    .then((result) => result.json())
    .then((result) => {
      window.db = null
      window.dataObj = {}

      //Local Storage Setup
      window.dbRequest = window.indexedDB.open('nuzlocketracker')
      window.dbRequest.onerror = function (event) {
        alert(
          'You have not given this page the required permissions to save local state. This page will not work correctly.',
        )
      }
      //onupgradeneeded is fired if we have a newer version # of the database or if we have no existing database (version 1 is greater than version _null_)
      window.dbRequest.onupgradeneeded = function (event) {
        console.log('Database debug: Upgrade needed...')

        window.db = event.target.result

        //Make a new object store for storing our data about the games. Title of the game is the key.
        var gameStore = window.db.createObjectStore('games', {
          keyPath: 'title',
        })
      }

      window.dbRequest.onsuccess = function (event) {
        console.log('Database debug: Initial database request succeeded...')
        window.db = event.target.result

        //Generic error handler
        window.db.onerror = function (event) {
          console.log('Database error: ' + event.target.errorCode)
        }

        //Either load the existing default game or add it to the indexeddb.
        getOrAdd(
          window.db,
          result?.default,
          result.games.filter((game) => game.name == result.default)[0].path,
          successCallback,
        )
      }
    })
}

export default dbInit
