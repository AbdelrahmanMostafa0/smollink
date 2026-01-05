const BASE_URL = "http://localhost:3000/api/auth";

async function verifyAuth() {
  const testUser = {
    fullName: "Test User " + Date.now(),
    email: `test${Date.now()}@example.com`,
    password: "password123",
  };

  console.log("Starting Auth Verification...");

  // 1. Register
  console.log("\n1. Testing Registration...");
  const registerRes = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });

  const registerData = await registerRes.json();
  if (registerRes.ok && registerData.token) {
    console.log("✅ Registration Successful");
  } else {
    console.error("❌ Registration Failed:", registerData);
  }

  // 2. Login
  console.log("\n2. Testing Login...");
  const loginRes = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password,
    }),
  });

  const loginData = await loginRes.json();
  if (loginRes.ok && loginData.token) {
    console.log("✅ Login Successful");
  } else {
    console.error("❌ Login Failed:", loginData);
  }

  // 3. Duplicate Registration
  console.log("\n3. Testing Duplicate Registration...");
  const dupRes = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testUser),
  });

  if (dupRes.status === 400) {
    console.log("✅ Duplicate Registration Prevented correctly");
  } else {
    console.error(
      "❌ Duplicate Registration Check Failed. Status:",
      dupRes.status
    );
  }

  // 4. Invalid Login
  console.log("\n4. Testing Invalid Login...");
  const invalidLoginRes = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: testUser.email,
      password: "wrongpassword",
    }),
  });

  if (invalidLoginRes.status === 401) {
    console.log("✅ Invalid Login Rejected correctly");
  } else {
    console.error(
      "❌ Invalid Login Check Failed. Status:",
      invalidLoginRes.status
    );
  }
}

verifyAuth();
