// Import the necessary libraries.
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignInSignUpForm = () => {
  // Create state variables to track the form fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(true);

  // Handle the form submission.
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the user is signing in or signing up.
    if (isSigningIn) {
      // Sign in the user.
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Redirect the user to the home page.
          window.location.href = "/";
        })
        .catch((error) => {
          // Handle the error.
          alert(error.message);
        });
    } else {
      // Sign up the user.
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Redirect the user to the home page.
          window.location.href = "/";
        })
        .catch((error) => {
          // Handle the error.
          alert(error.message);
        });
    }
  };

  // Handle the toggle between sign in and sign up.
  const handleToggle = () => {
    setIsSigningIn(!isSigningIn);
  };

  // Render the form.
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </Form.Group>

      <Button type="submit">{isSigningIn ? "Sign In" : "Sign Up"}</Button>
      <Button onClick={handleToggle}>{isSigningIn ? "Sign Up" : "Sign In"}</Button>
    </Form>
  );
};

export default SignInSignUpForm;