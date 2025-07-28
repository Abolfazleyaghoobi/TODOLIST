let db;
export function initDB(newValue) {
  return new Promise((res, rej) => {
    let todoDB = window.indexedDB.open("TodoDB", 2);
    todoDB.addEventListener("success", () => {
      console.log("database open successfully");
      db = todoDB.result;
      if (newValue) {
 
        addTDB(newValue); 
        
      }
      res(db);
    });
    todoDB.addEventListener("error", () => {
      console.log("database error");
    });
    //@ upgrade dataBase
    todoDB.addEventListener("upgradeneeded", (e) => {
      let db = e.target.result;
          db.createObjectStore("contentTodo", {
        keyPath: "id",
        autoIncrement: true,
      });

    });
  });
}
// transaction
// addTDB=>add todo dataBase
function addTDB(newItem) {


  
  let transaction = db.transaction(["contentTodo"], "readwrite");
  let OBJS = transaction.objectStore("contentTodo");
    OBJS.add(newItem)

  
  transaction.addEventListener("complete", () => {
    console.log("successflly");
  });
}
