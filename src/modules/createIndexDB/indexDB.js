let db;
export function initDB() {
  return new Promise((res, rej) => {
    let todoDB = window.indexedDB.open("TodoDB", 2);
    todoDB.addEventListener("success", () => {
      console.log("database open successfully");
      db = todoDB.result;
     
      res(db);
    });
    todoDB.addEventListener("error", () => {
      console.log("database error");
    });
    //@ upgrade dataBase
    todoDB.addEventListener("upgradeneeded",(e)=>{
        let db=e.target.result;
        let objectStore=db.createObjectStore("contentTodo",{
            keyPath:"id",
            autoIncrement: true,
        })
        objectStore.createIndex("titleTask","titleTask",{
            unique: false,
        })
        objectStore.createIndex("disTask","disTask",{
            unique: false,
        })
        objectStore.createIndex("hardTask","hardTask",{
            unique: false,
        })
        objectStore.createIndex("timeTask","timeTask",{
            unique: false,
        })
    })
  });
}
