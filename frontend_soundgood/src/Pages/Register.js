import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const fs = require("fs");
const AWS = require("aws-sdk");

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Function to upload an image to Amazon S3 bucket and retrieve the url
  const uploadImageToAWS = (fileToUpload) => {
    // S3 bucket configurations
    const ID = "us-east-1:a5ed82ab-852e-4099-b87b-949ef005b381";
    const bucketRegion = "us-east-1";
    const bucketName = "soundgoodimages";

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: ID,
      }),
    });

    // S3 Upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileToUpload.name,
      Body: fileToUpload,
    };

    let upload = new AWS.S3.ManagedUpload({
      params: params,
    });

    return upload.promise();
  };

  const registerUser = () => {
    // Waiting for image to be uploaded to Amazon S3
    const awsPromise = uploadImageToAWS(selectedFile);

    awsPromise.then((response) => {
      const url = response["Location"];

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        password: password,
        username: username,
        image_url: url,
      };

      const URL = "http://127.0.0.1:5000/api/register";

      axios
        .post(URL, payload)
        .then((resp) => {
          if (resp["data"]["status"] === "Succesfully created user") {
            const token = resp["data"]["token"];
            localStorage.setItem("userToken", token);
            navigate("/home");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  const processUserImageUpload = (event) => {
    setSelectedFile(event.target.files[0]);

    setIsFilePicked(true);
  };

  return (
    <div>
      <h1 onClick={() => navigate("/")}>SoundGood</h1>

      <div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />{" "}
        <br />
        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />{" "}
        <br />
        <label>Last Name</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />{" "}
        <br />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />{" "}
        <br />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />{" "}
        <br />
        <label>Profile Picture</label>
        <input type="file" name="filename" onChange={processUserImageUpload} />
      </div>

      <div>
        <button type="button" id="register" onClick={registerUser}>
          Register
        </button>

        <p>
          Have an account? <a href="/login">Login Instead</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
