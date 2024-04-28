/*
 *******************************************************************
 * Thank you mozilla.org
 * REF: https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase
 *
 * although I do wish you had some better error handling in the ex.
 ********************************************************************
 */

const dbName = "dsLocalTest"
const dbVersion = 3;
const objStore = "dsRegistered"

console.log("constants: " + dbName + ", " + dbVersion + ", "+ objStore);

async function open() {
	const request = window.indexedDB.open(dbName, dbVersion);
	return new Promise((resolve, reject) => {	
		request.onsuccess = (event) => resolve(event.target.result);
		request.onerror = (event) => reject(new Error("Rip: " + request.errorCode));

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			const store = db.createObjectStore(objStore, {keyPath: "email",});
			console.log("ObjectStore: ", store);

			store.createIndex("emailIndex", "email", {unique: true});
			store.createIndex("passwordIndex","",{unique: false});
			store.createIndex("tosAgreementIndex", "tosAgreement", {unique: false});
		};
	});
}	

async function addUser(db, email, password, tosAgree) {
	const data = {
		email: email,
		password: password,
		tosAgreement: tosAgree,
	};

	console.log(data);

	const transaction = db.transaction(objStore, 'readwrite');
	console.log("starting transaction log...");
		
	const persist = transaction.objectStore(objStore);
	persist.add(data);
}

async function registerUser() {
	const emailElement = document.getElementById("signUpInputEmail");
	const passwordElement = document.getElementById("signUpInputPassword");
	const tosToggleElement = document.getElementById("invalidCheck");
	
	var email = emailElement.value;
        var password = passwordElement.value;
        var tosToggle = tosToggleElement.checked;

	try {
		const db = await open();
		console.log("love this db opening journey for us");

		await addUser(db, email, password, tosToggle);
		console.log("you are registered with deez");
	} catch (error) {
		console.error("crap: ", error);
	}
}
