const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const {
            firstName,
            lastName,
            email,
            subject,
            message
        } = req.body;

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

        const { error } = await resend.emails.send({

            from: "Portfolio Contact <onboarding@resend.dev>",

            to: "yuan_patawaran@dlsu.edu.ph",

            replyTo: email,

            subject: `📩 ${subject}`,

            html: `
                <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">

                    <h2 style="color:#6D28D9;">
                        📩 New Portfolio Contact
                    </h2>

                    <hr>

                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>

                    <p><strong>Email:</strong> ${email}</p>

                    <p><strong>Subject:</strong> ${subject}</p>

                    <h3>Message</h3>

                    <p style="white-space: pre-line;">
                        ${message}
                    </p>

                    <hr>

                    <p style="font-size:12px;color:#777;">
                        Sent from your Portfolio Website
                    </p>

                </div>
            `

        });

        if (error) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Failed to send email."
            });

        }

        return res.status(200).json({

            success: true,

            message: "Thank you! Your message has been sent."

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Something went wrong."

        });

    }

};