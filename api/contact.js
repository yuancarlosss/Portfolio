const connectDB = require("../lib/mongodb");
const Contact = require("../models/Contact");

module.exports = async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        await connectDB();

        const {
            firstName,
            lastName,
            email,
            subject,
            message
        } = req.body;

        // Validate fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !subject ||
            !message
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        // Save to MongoDB
        await Contact.create({
            firstName,
            lastName,
            email,
            subject,
            message
        });

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });

    }

}