

const dbName = "dsLocal"
const dbVersion = 3;
const objStore = "dsRegistered"

const request = window.indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
  // Do something with request.errorCode!
  console.log(request.errorCode);
};
request.onsuccess = (event) => {
	const db = event.target.result;
	console.log(request.result);

	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const repeatpw = document.getElementById("confirmPassword");

	const data = {
		email: email,
		password: password,
	};

	const transaction = db.transaction(objStore, 'readWrite');
	const persist = transaction.objectStore(objStore);
	
	persist.add(data);
};


