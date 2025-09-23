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

      // console.log("db: ", db);
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
  OBJS.add(newItem);

  transaction.addEventListener("complete", () => {
    console.log("successflly");
  });
}
// GTFDB=>getTask from dataBase and show in UI
export function GTFDB() {
  return new Promise((res, rej) => {
    let arrayTask = [];

    let OBJS = db.transaction("contentTodo").objectStore("contentTodo");
    OBJS.openCursor().onsuccess = (e) => {
      let cursor = e.target.result;
      if (cursor) {
        arrayTask.push(cursor.value);
        cursor.continue();
      } else {
        res(arrayTask);
      }
    };
  });
}
// removeTask=> remove task from dataBase
// removeTask => remove a specific task by id
export function removeTask(id) {
  return new Promise((res, rej) => {
    let transaction = db.transaction(["contentTodo"], "readwrite");
    let OBJS = transaction.objectStore("contentTodo");

    let request = OBJS.delete(id);

    request.onsuccess = () => {
      console.log(`Task with id ${id} removed`);
      res();
    };

    request.onerror = (e) => {
      console.error("Error removing task:", e.target.error);
      rej(e.target.error);
    };
  });
}





// export function removeTask(newValue){
//   return new Promise((res, rej) => {
//     let transaction = db.transaction(["contentTodo"], "readwrite");
//     let OBJS = transaction.objectStore("contentTodo");
//     OBJS.clear();

//     newValue.forEach((item) => {
//       OBJS.add(item);
//     });

//     transaction.addEventListener("complete", () => {

//       res();
//     });
//   });
  
// }




// updateTask => update a specific task
export function updateTask(task) {
  return new Promise((res, rej) => {
    let transaction = db.transaction(["contentTodo"], "readwrite");
    let OBJS = transaction.objectStore("contentTodo");

    let request = OBJS.put(task); // put = add or update

    request.onsuccess = () => {
      console.log(`Task with id ${task.id} updated`);
      res();
    };

    request.onerror = (e) => {
      console.error("Error updating task:", e.target.error);
      rej(e.target.error);
    };
  });
}
