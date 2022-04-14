let db;

const request = indexedDB.open('pizza_hunt', 1);

//this event will emit if the db version changes
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

//when it works
request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        uploadPizza()
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

//if connection don wanna connecta
function saveRecord(record) {
    const transaction = db.transaction(['new_pizza'], 'readwrite');
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    pizzaObjectStore.add(record);
}

//when connection finally connecta
function uploadPizza() {
    const transaction = db.transaction(['newPizza'], 'readwrite');
    const pizzaObjectStore = transaction.objectStore('new_pizza');
    const getAll = pizzaObjectStore.getAll();
    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json' }
            })
            .then(res => res.json())
            .then(serverRes => {
                if (serverRes.message) {
                    throw new Error(serverRes);
                }
                const transaction = db.transaction(['new_pizza'], 'readwrite');
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                pizzaObjectStore.clear();

                alert('we senda your olda pizza pies finally')
            })
            .catch(err => { console.log(err); });
        }
    }
};

window.addEventListener('online', uploadPizza);