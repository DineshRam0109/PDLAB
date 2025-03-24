require("dotenv").config();
const mysqlConnection = require("../config/mysqlConfig");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

// Configure Nodemailer Transporter (Using Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function sendDueReminders() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const dueDate = today.toISOString().split("T")[0];

    const query = `
    SELECT s.email, a.student_id, a.due_date 
    FROM allotment a
    JOIN students s ON a.student_id = s.id 
    WHERE a.due_date = ? AND a.isPaid = 0
  `;

    mysqlConnection.query(query, [dueDate], async (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return;
        }

        if (results.length === 0) {
            console.log("No pending payments for reminders.");
            return;
        }

        for (const row of results) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: row.email,
                subject: "Payment Due Reminder",
                text: `Dear Student, your payment is due on ${row.due_date}. Please make the payment on time to avoid penalties.`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${row.email}`);
            } catch (emailErr) {
                console.error(`Failed to send email to ${row.email}:`, emailErr);
            }
        }
    });
}

// Schedule the Cron Job to Run at Midnight (Every Day)
cron.schedule("0 0 * * *", () => {
    console.log("Running due payment reminder script...");
    sendDueReminders();
});

console.log("Cron job scheduled to run daily at midnight.");
