// const express = require("express");
// const mongoose = require("mongoose");
// const userModel = require("./models/User.js");

// const app = express();
// require("dotenv").config();
// app.use(express.json());

// const PORT = process.env.PORT || 8000;

// // mongoose to connect
// mongoose.connect("mongodb://127.0.0.1:27017/jmd");

// // GET API
// app.get("/", (req, res) => {
//   res.send("Get api working");
// });

// // post API
// app.post("/post", (req, res) => {
//   userModel
//     .create(req.body)
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// // put API
// app.put("/put", (req, res) => {
//   res.send("put api working");
// });

// // patch API
// app.patch("/patch", (req, res) => {
//   res.send("patch api working");
// });

// // delete API
// app.delete("/delete", (req, res) => {
//   res.send("delete api working");
// });

// // listen
// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });

// Testing

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// storage start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.post("/api/users", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const resumePath = req.file.filename;
//     const user = new User({ name, email, resumePath });
//     await user.save();
//     res.json({ message: "User data saved successfully" });
//   } catch (error) {
//     console.error("Error saving user data:", error);
//     res.status(500).json({ error: "Error saving user data" });
//   }
// });

app.get("/api/download/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "uploads", filename);
    res.download(filePath);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
});

// storage end

// const express = require("express");
// const mongoose = require("mongoose");
// const userModel = require("./models/User.js");

// const app = express();
// require("dotenv").config();
// app.use(express.json());

// const PORT = process.env.PORT || 8000;

// // mongoose to connect
// mongoose.connect("mongodb://127.0.0.1:27017/jmd");

// // GET API
// app.get("/", (req, res) => {
//   res.send("Get api working");
// });

// // post API
// app.post("/post", (req, res) => {
//   userModel
//     .create(req.body)
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// // put API
// app.put("/put", (req, res) => {
//   res.send("put api working");
// });

// // patch API
// app.patch("/patch", (req, res) => {
//   res.send("patch api working");
// });

// // delete API
// app.delete("/delete", (req, res) => {
//   res.send("delete api working");
// });

// // listen
// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`);
// });

// Testing

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const authRoute = require("./Routes/AuthRoute");
// const { MONGO_URL, PORT } = process.env;
// app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));

// app.use(cookieParser());

// app.use(express.json());

// app.use(bodyParser.json());
// app.use("/", authRoute);

// Testing

// Replace with your email and email server settings

const emailConfig = {
  service: "gmail",
  auth: {
    user: "mrengineer101098@gmail.com",
    pass: "uuospkrkqazxnwbl",
  },
};

// const transporter = nodemailer.createTransport(emailConfig);

app.post("/reset", (req, res) => {
  const { email } = req.body;

  // Generate a unique token (you should use a library like `uuid` for this)
  const resetToken = "randomtoken";

  // Send an email with a link that includes the resetToken
  const mailOptions = {
    from: "mrengineer101098@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click this link to reset your password:  http://localhost:8001/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true });
    }
  });
});

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mrengineer101098@gmail.com",
    pass: "uuospkrkqazxnwbl",
  },
});

// Function to send reset password email
const sendResetPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    from: "mrengineer101098@gmail.com",
    to: email,
    subject: "Password Reset",
    html: `
        <p>You have requested a password reset. Click the link below to reset your password.</p>
        <a href="http://localhost:8001/reset-password/${resetToken}">Reset Password</a>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

app.post("/api/users/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Password reset token sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// nodemailer end
