let db;
export function initDB() {
  return new Promise((res, rej) => {
    let todoDB = window.indexedDB.open("TodoDB", 2);
    todoDB.addEventListener("success", () => {
      console.log("database open successfully");
      db = todoDB.result;

      addTDB();
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
function addTDB(params) {
  let newITEM={
    title:"ali",
    des:";laksjdfl;kajs;ldfkjalskjdf;lakjsdf",
    hard:3,
    time:{
      h:3,
      min:3,
      sec:3
    }
  }
  console.log(newITEM.time.h);
  
  let transaction = db.transaction(["contentTodo"], "readwrite");
  let OBJS = transaction.objectStore("contentTodo");
    OBJS.add(newITEM)

  
  transaction.addEventListener("complete", () => {
    console.log("successflly");
  });
}
