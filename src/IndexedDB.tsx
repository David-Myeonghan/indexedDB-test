import { useEffect } from "react";

const IndexedDB = () => {
  console.log("test");

  useEffect(() => {
    console.log("useEffect");
    console.log(window.indexedDB);
    if (!window.indexedDB) {
      window.alert(
        "Your browser doesnt support a stable version of IndexedDB. Such and such feature will not be available"
      );
    }

    const name = "IndexedDB Name"; // db name
    const version = 1;
    let db = null;

    // IDBOpenDBRequest
    const request = indexedDB.open(name, version);
    console.log(request);

    // trigger when db is loaded with bigger version than existing number.
    request.onupgradeneeded = function (event) {
      // IDBDatabase
      db = request.result;
      console.log(db);

      const key = "id";
      const name = "store name"; // store name

      // IDBObjectStore
      const store = db.createObjectStore(name, { keyPath: key });
      console.log(store);

      const indexName = "by_name"; // table name
      const keyPath = "name";

      // IDBIndex
      const index = store.createIndex(indexName, keyPath);
      console.log(index);

      const obj = { [key]: 1, [keyPath]: "name" };
      store.put(obj);
    };
    request.onsuccess = function (event) {
      db = request.result;
      console.log(db);

      // IDBTransaction
      const transaction = db.transaction(["store name"], "readonly");

      // IDBObjectStore
      const objectStore = transaction.objectStore("store name");

      // IDBRequest
      const cursor = objectStore.openCursor();
      cursor.onsuccess = function (event: Event) {
        // IDBCursorWithValue
        console.log(event);
        const target = event.target as IDBRequest;
        const cursor = target.result ?? "";
        console.log(cursor)
        if (cursor) {
            // { id: 1, name: 'name' }
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log('end');
        }
      };
    };

    return () => {
      console.log("clean up");
    };
  }, []);
  return "test";
};

export default IndexedDB;
