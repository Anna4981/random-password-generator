Random Password Generator

Veda Technology Web Development Internship · Level 1 · Day 17 (Task 17)

A simple, secure password generator built with HTML5, CSS3 and vanilla JavaScript. Users choose a password length and the character types to include, then generate a password and copy it to the clipboard.

Features
Adjustable length slider (4 to 32 characters)
Checkboxes for uppercase letters, lowercase letters, numbers and symbols
Generated password display
Copy-to-clipboard button with a confirmation message
Password strength indicator (Weak, Medium, Strong, Very strong)
Friendly error message when no character type is selected
Responsive layout that works on desktop and mobile
Objective

Practice checkboxes, string building and randomization logic.

Tools Used
HTML5
CSS3
JavaScript
Project Structure
password-generator/
├── index.html   # Page structure and form controls
├── style.css    # Styling and responsive layout
├── script.js    # Password generation logic
└── README.md
How to Run
Download or clone the project and keep all files in the same folder.
Open index.html in any modern browser (or use the Live Server extension in VS Code).
Move the slider to set the length, tick the character types you want, and click Generate Password.
Click Copy to copy the password to your clipboard.
How It Works
Build a character pool. Each character type is stored in the CHARSETS object. The strings for the ticked checkboxes are joined into one pool.
Guarantee variety. One character from each selected type is added first, so the password always contains every type chosen.
Fill the rest randomly. The remaining characters are picked at random from the full pool.
Shuffle. A Fisher-Yates shuffle mixes the characters so the guaranteed ones are not always at the start.
Handle empty selection. If no checkbox is ticked, the generator stops and shows an error instead of producing a password.
Why Not Math.random()?

Math.random() is not cryptographically secure because its output comes from a predictable algorithm. This project uses crypto.getRandomValues(), which draws from the operating system's secure random source. A small helper also avoids modulo bias so every character has an equal chance of being picked.

Strength Indicator

Strength is estimated from entropy: length × log2(pool size). Longer passwords with more character types score higher.

Entropy (bits)	Rating
Below 45	Weak
45 to 69	Medium
70 to 99	Strong
100 and above	Very strong
Interview Questions

How would you build a character pool dynamically? Keep each character type as its own string, loop over the checked boxes, and join the matching strings into one pool.

Why is Math.random() not cryptographically secure? Its output is predictable if enough values are observed. crypto.getRandomValues() should be used for passwords.

How would you handle an empty selection? Check how many types are selected before building the pool. If none, stop and show an error message so the code never picks from an empty string.

Resources
MDN: Math.random()
MDN: Checkbox inputs
MDN: Crypto.getRandomValues()
Author

Anna Makgabo Thantsha# random-password-generator
