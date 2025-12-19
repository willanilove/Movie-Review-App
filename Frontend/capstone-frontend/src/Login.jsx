import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { Button, Center, PasswordInput, Text, TextInput, Tooltip, Title, Stack, Paper } from "@mantine/core";

// Main form component
function AuthForm({ mode = "login" }) {
  // I need state to track the inputs & if the tooltip is open
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // State for signup
  const [confirmPassword, setConfirmPassword] = useState(""); // State for signup
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Password must be at least 6 characters
  const passwordIsValid = password.trim().length >= 6;

  function handleSubmit(event) {
    event.preventDefault();

    // NOTE: Right now this just shows a popup
    // Later I need to replace alert() w/ real server code
    // (send email & password to backend for login/signup)
    if (mode === "login") {
      console.log("Logging in with:", email, password);
      alert("Logging in...");
    } else {
      console.log("Signing up with:", fullName, email);
      alert("Signing up...");
    }
  }

  return (
    <Center mih="70vh">
      <Paper shadow="sm" radius="md" p="lg" withBorder style={{ width: 420 }}>
        <Title order={3} mb="md" style={{ color: "#354760" }}>
          {mode === "login" ? "Sign in with email" : "Create an account"}
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack>
            {/* Show name field only during sign up */}
            {mode === "signup" && (
              <TextInput
                label="Full Name"
                placeholder="Your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                styles={{ label: { color: "#354760" } }}
              />
            )}

            {/* Email input w/ tooltip icon */}
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles={{ label: { color: "#354760" } }}
              rightSection={
                <Tooltip label="We store your data securely" withArrow>
                  <IconInfoCircle size={18} stroke={1.5} color="gray" />
                </Tooltip>
              }
            />

            {/* Password input w/ tooltip validation */}
            <Tooltip
              label={passwordIsValid ? "All good!" : "Password must include at least 6 characters"}
              opened={tooltipOpen}
              color={passwordIsValid ? "teal" : "red"}
              withArrow
            >
              <PasswordInput
                label="Password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
                styles={{ label: { color: "#354760" } }}
              />
            </Tooltip>

            {/* Show confirm password only during sign up */}
            {mode === "signup" && (
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                styles={{ label: { color: "#354760" } }}
              />
            )}

            <Button
              type="submit"
              mt="md"
              fullWidth
              style={{
                backgroundColor: mode === "login" ? "#FFC72C" : "#354760",
                color: mode === "login" ? "#354760" : "white",
              }}
            >
              {mode === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}

export default AuthForm;
