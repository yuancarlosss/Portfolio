const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Sending...";

    const data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            form.reset();
        
            statusBox.classList.remove("hidden");
        
            statusTitle.textContent = " Message Sent!";
            statusTitle.className = "text-lg font-bold text-purple-700";
        
            statusMessage.innerHTML =
                "Thank you for reaching out!<br><span class='text-sm text-gray-500'>I'll get back to you as soon as possible.</span>";
        
        } else {
        
            statusBox.classList.remove("hidden");
        
            statusTitle.textContent = "Oops!";
            statusTitle.className = "text-lg font-bold text-red-600";
        
            statusMessage.textContent = result.message;
        
        }

    } catch (err) {

        console.error(err);
    
        statusBox.classList.remove("hidden");
    
        statusTitle.textContent = "Oops!";
        statusTitle.className = "text-lg font-bold text-red-600";
    
        statusMessage.textContent =
            "Something went wrong. Please try again.";
    
    }

    button.disabled = false;
    button.textContent = "Send Message";

});