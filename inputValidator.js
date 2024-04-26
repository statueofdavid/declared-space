const InputValidator = {
	/* shout out to regex101.com and to AI for recommending I validate the expression
	 * 
	 * TODO: chop up regexEmail expression into more manageable chunks
	 * 1. for more strict validation controls on the frontend
	 * 2. easier diagnosis when spooky behavior presents while using the expression
	 */
	regexEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


	validateEmail(email) {
		return this.regexEmail.test(email)
	},

	wordMatch(word, match) {
		return word === match;
	},
}
