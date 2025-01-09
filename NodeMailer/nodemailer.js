const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: " ", //Sender's email  
            pass: " "  //Sender's email app password
        }
        
    });

    const receiver = {
        from: " ", // Sender's email
        to: " ", // Receiver's email
        subject: "Sample Email From Node Js",
        text: "Hello, this is a Sample Mail! Refer the below attachment!",
        attachments: [
            {
                filename: ' ', // The file name to be displayed in the email
                path: ' ',  // Path to the file
            }
        ]
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            console.error("Error occurred:", error); 
            response.statusCode = 500; 
            response.end("Error sending email");
            return;
        }
        console.log('Success!');
        response.statusCode = 200; 
        response.end('Email sent successfully!');
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
