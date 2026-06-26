const form = document.getElementById("contactForm");

const modal = document.getElementById("statusModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");
const modalButton = document.getElementById("modalButton");

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

            modal.classList.remove("hidden");
            modal.classList.add("flex");

            modalTitle.textContent = "🎉 Message Sent!";
            modalMessage.innerHTML =
                "Thank you for reaching out!<br><span class='text-sm text-gray-500'>I'll get back to you as soon as possible.</span>";

        } else {

            modal.classList.remove("hidden");
            modal.classList.add("flex");

            modalTitle.textContent = "Oops!";
            modalMessage.textContent = result.message;

        }

    } catch (err) {

        console.error(err);

        modal.classList.remove("hidden");
        modal.classList.add("flex");

        modalTitle.textContent = "Oops!";
        modalMessage.textContent =
            "Something went wrong. Please try again.";

    }

    button.disabled = false;
    button.textContent = "Send Message";

});

closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");
    modal.classList.remove("flex");

});

modalButton.addEventListener("click", () => {

    modal.classList.add("hidden");
    modal.classList.remove("flex");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.add("hidden");
        modal.classList.remove("flex");

    }

});