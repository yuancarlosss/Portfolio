const form = document.getElementById("contactForm");

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

            alert(result.message);

            form.reset();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);

        alert("Failed to send message.");

    }

    button.disabled = false;
    button.textContent = "Send Message";

});