require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');
const app = express();
const url = process.env.MONGO_URI;

const portnumber = process.env.PORT;
const cors = require('cors');


mongoose.connect(`mongodb+srv://JenilPatel:GJ33d0779@dbb.hjoqiv2.mongodb.net/?retryWrites=true&w=majority
`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

  app.use(cors()); 
  

app.listen(portnumber, () => {
  console.log("Application started on port number " + portnumber);
});

app.use((req, res, next) => {
  const allowedOrigin =  process.env.ALLOWED_ORIGIN;

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());


app.use('/',require("./Routes/Login"))
app.use('/',require("./Routes/markUpload"))
app.use('/',require("./Routes/data_provider"))
app.use('/',require("./Routes/fetchSubjectData"))
app.use('/',require("./Routes/practice_question_provider"))
app.use('/',require("./Routes/questionUpload"))
app.use('/',require("./Routes/checkerforfncallapi"))
app.use('/',require("./Routes/assigned_questions_provider"))
app.use('/',require("./Routes/handlesubmission"))
app.use('/',require("./Routes/handleViewSubmission"))
app.use('/',require("./Routes/submissionLinkProvider"))
app.use('/',require("./Routes/verifySubmission"))
app.use('/',require("./Routes/download_sample_file"))
// app.use('/',require("../fsd_server/Routes/otp_verification"))
app.use('/',require("./Routes/otpsender"))
app.use('/',require("./Routes/addStudentAdmin"))
app.use('/',require("./Routes/addProfessorAdmin"))
app.use('/',require("./Routes/addStudentMapping"))
app.use('/',require("./Routes/remove_student"))
app.use('/',require("./Routes/view_student_admin"))
app.use('/',require("./Routes/remove_professor"))
app.use('/',require(".//Routes/view_professor_admin"))
app.use('/',require("./Routes/view_noof_student_admin"))
app.use('/',require("./Routes/massemailsender"))
app.use('/',require("./Routes/studentdataforadmin"))
app.use('/',require("./Routes/professordataforadmin"))
app.use('/',require("./Routes/mappingdataforadmin"))
app.use('/',require("./Routes/removeMappings"))
app.use('/',require("./Routes/adddepartment"))
















