// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


class BrandHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = '
			<header>
                		<nav>
                  		<ul>
					<li>Sign Up/li>
					<li>Log In</li>
					<li></li>
                        	</ul>
        	        	</nav>
        		</header>
		'
	}
}

customElements.define('brand-header', BrandHeader)
