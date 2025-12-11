/ auth.js
const hashedPassword = "b6d81b360d3b89f4b9f1f4b1d093ff322d15c7d1d93d4501e4eaf7c87624199e"; // Change this

document.addEventListener("DOMContentLoaded", () => {

    // Wrap all page content in a container
    const pageContent = document.createElement("div");
    while (document.body.firstChild) {
        pageContent.appendChild(document.body.firstChild);
    }
    pageContent.id = "page-content";
    pageContent.style.display = "none"; // hide until login
    document.body.appendChild(pageContent);

    // Create login overlay
    const loginOverlay = document.createElement("div");
    loginOverlay.id = "login-overlay";
    loginOverlay.style.position = "fixed";
    loginOverlay.style.top = "0";
    loginOverlay.style.left = "0";
    loginOverlay.style.width = "100%";
    loginOverlay.style.height = "100vh";
    loginOverlay.style.backgroundColor = "#121212";
    loginOverlay.style.display = "flex";
    loginOverlay.style.justifyContent = "center";
    loginOverlay.style.alignItems = "center";
    loginOverlay.style.flexDirection = "column";
    loginOverlay.style.zIndex = "9999";

    loginOverlay.innerHTML = `
        <div style="text-align:center; background:#1e1e1e; padding:30px; border-radius:10px; border:1px solid #333;">
            <h2 style="color:#00ff99;">0x0 Group Portal Login</h2>
            <input type="password" id="password-input" placeholder="Enter Password" 
                style="padding:10px;width:200px;border-radius:5px;border:none;margin-top:10px;">
            <button id="login-btn" style="margin-top:10px;padding:10px;width:100%;background:#00ff99;border:none;cursor:pointer;">Login</button>
            <div id="error-message" style="color:#ff5555;margin-top:10px;font-size:0.9em;"></div>
        </div>
    `;

    document.body.appendChild(loginOverlay);

    // Hash the entered password using SHA-256
    function hashPassword(password) {
        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
            .then(hashBuffer => {
                // Convert ArrayBuffer to hex string
                let hashArray = Array.from(new Uint8Array(hashBuffer));
                let hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                return hashHex;
            });
    }

    // Login button logic
    document.getElementById("login-btn").addEventListener("click", async () => {
        const input = document.getElementById("password-input").value;
        const error = document.getElementById("error-message");

        const hashedInput = await hashPassword(input);

        if (hashedInput === hashedPassword) {
            // Hide login overlay
            loginOverlay.style.display = "none";
            // Show page content
            pageContent.style.display = "block";
        } else {
            error.textContent = "Incorrect password. Please try again.";
            document.getElementById("password-input").value = "";
            document.getElementById("password-input").focus();
        }
    });
});
