const DB_NAME = 'compilerium'
const DB_VERSION = 2
const STORES = ['nodes', 'relations', 'meta']

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = e.target.result
      for (const store of STORES) {
        if (!db.objectStoreNames.contains(store)) {
          const keyPath = store === 'meta' ? 'key' : 'id'
          db.createObjectStore(store, { keyPath })
        }
      }
    }
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function dbGet(db, store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).get(key)
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function dbGetAll(db, store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function dbPut(db, store, val) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).put(val)
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function dbDelete(db, store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).delete(key)
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

export function dbClear(db, store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).clear()
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}
