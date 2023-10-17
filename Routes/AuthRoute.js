const {
  Signup,
  Login,
  Register,
  JobPost,
  GetJobPost,
  Employer,
  EmployerLogin,
  SalesEnquiry,
  AdminPanel,
  AdminLogin,
  GetJobApplied,
  emailSend,
  changePassword,
  GetSalesEnquiry,
} = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const JobSeekerModel = require("../models/JobSeekerModel");

// multer start
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

let upload = multer({ storage });

// multer end

router.route("/register").post(upload.single("resume"), (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const qualification = req.body.qualification;
  const resumePath = req.file.filename;
  const profile = req.body.profile;

  const newUserData = {
    name,
    email,
    mobile,
    qualification,
    resumePath,
    profile,
  };

  const newUser = new JobSeekerModel(newUserData);

  newUser
    .save()
    .then(() => res.json("you have successfully applied"))
    .catch((err) => res.status(400).json("Error:" + err));
});
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

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "path_to_your_pdf_directory", filename);
  res.download(filePath);
});

router.post("/signup", Signup);
router.post("/login", Login);
// router.post("/register", upload.single("resume"), Register);
router.post("/", userVerification);
router.post("/jobpost", JobPost);
router.get("/jobpostdata", GetJobPost);
router.post("/employer", Employer);
router.post("/employerlogin", EmployerLogin);
router.post("/salesenquiry", SalesEnquiry);
router.get("/getsalesenquiry", GetSalesEnquiry);
router.post("/adminpanel", AdminPanel);
router.post("/adminlogin", AdminLogin);
router.get("/jobseekersdata", GetJobApplied);
// router.get("/employerdata", GetEmployerData);
router.post("/email-send", emailSend);
router.post("/change-password", changePassword);
module.exports = router;
