const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// install Live Share
// Press Ctrl + Shift + P
// This opens the Command Palette at the top of VS Code
// Start typing: Live Share: Join Collaboration Session
// paste link : paste share link
