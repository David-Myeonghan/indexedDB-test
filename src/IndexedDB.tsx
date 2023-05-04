import { useEffect } from "react";

const IndexedDB = () => {
  console.log("test");

  useEffect(() => {
    console.log("useEffect");

    // 1. Check if 'window.indexedDB' exist.
    if (!window.indexedDB) {
      window.alert(
        "Your browser doesnt support a stable version of IndexedDB. Such and such feature will not be available"
      );
    }

    const name = "IndexedDB Name"; // db name
    const version = 1;
    let db = null;

    // 2. Open DB with 'indexedDB.open()' and returns IDBOpenDBRequest.
    const request = indexedDB.open(name, version); // IDBOpenDBRequest
    console.log(request);

    // 3. As DB is initialised first time, 'onupgradedneeded()' is called.
    request.onupgradeneeded = function (event) { // trigger when db is loaded with bigger version than existing number.
      // 4. get IDBDatabase as a result of request.
      db = request.result; // IDBDatabase
      console.log(db);

      const key = "id";
      const name = "store name"; // store name

      // 5. Create object store to store objects, returns IDBObjectStore.
      const store = db.createObjectStore(name, { keyPath: key }); // IDBObjectStore
      console.log(store);

      const keyPath = "name";
      const indexName = "by_name"; // table name

      // 6. Create 'Index' object store to store 'Index' objects, returns IDBIndex.
      const index = store.createIndex(indexName, keyPath); // IDBIndex
      console.log(index);

      const obj = { [key]: 1, [keyPath]: "name" };
      // 7. Add a record with IDBObjectStore.
      store.put(obj);
    };

    // 8. As DB is called successfully, onsuccess callback is invoked.
    // (not because of onupgradeneeded or store.pur(), but because of .open() successfully)
    request.onsuccess = function (event) {
      db = request.result;
      console.log(db);

      // 9. Create transaction context with transaction and returns IDBTransaction.
      const transaction = db.transaction(["store name"], "readonly"); // IDBTransaction

      // 10. Find object store with store name, and it returns IDBObjectStore.
      const objectStore = transaction.objectStore("store name"); // IDBObjectStore

      // 11. get IDBRequest using 'openCursor' that requests Cursor.
      const cursor = objectStore.openCursor(); // IDBRequest
      console.log(cursor)

      // 12. As Cursor request is successful, onsuccess is invoked.
      cursor.onsuccess = function (event: Event) {
        console.log(event);
        // 13. Get IDBCursorWithValue as result of event..?
        const target = event.target as IDBRequest;

        // 14. Find value contained in cursor.
        const cursor = target.result ?? "";
        console.log(cursor);
        if (cursor) {
          // { id: 1, name: 'name' }
          console.log(cursor.value);

          // 15. Call next cursor using 'continue'
          cursor.continue();
        } else {
          console.log("end");
        }
      };
    };

    //window.indexedDB > DB.open() 
    // >> initialise = onupgradedneeded() > db.createObjectStore > createIndex() > put() 
    // - Write
    // >> onsuccess > transaction context > find object store > openCursor() > cursor.onsuccess() > event.target as IDBRequest >  cursor.value > cursor.continue > end
    // - Read



    return () => {
      console.log("clean up");
    };
  }, []);
  return "test";
};

export default IndexedDB;
