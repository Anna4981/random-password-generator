const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/~"
};

const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const message = document.getElementById("message");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Random integer in [0, max). Uses the browser's cryptographic RNG,
// which is safer than Math.random() for passwords.
function randomInt(max) {
  const limit = Math.floor(0x100000000 / max) * max; // avoid modulo bias
  const buf = new Uint32Array(1);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % max;
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function getSelectedSets() {
  return Object.keys(CHARSETS).filter(
    (name) => document.getElementById(name).checked
  );
}

function generatePassword() {
  const selected = getSelectedSets();

  // Handle the case where no option is selected
  if (selected.length === 0) {
    passwordField.value = "";
    updateStrength(0, 0);
    showMessage("Please select at least one character type.", true);
    return;
  }

  const length = Number(lengthInput.value);
  const pool = selected.map((name) => CHARSETS[name]).join("");

  const chars = [];

  // Guarantee at least one character from each selected type
  selected.forEach((name) => {
    const set = CHARSETS[name];
    chars.push(set[randomInt(set.length)]);
  });

  // Fill the rest from the full pool
  while (chars.length < length) {
    chars.push(pool[randomInt(pool.length)]);
  }

  // Fisher-Yates shuffle so the guaranteed characters aren't always first
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  passwordField.value = chars.slice(0, length).join("");
  updateStrength(length, pool.length);
  showMessage("");
}

function updateStrength(length, poolSize) {
  if (!length || !poolSize) {
    strengthFill.style.width = "0";
    strengthText.textContent = "-";
    return;
  }
  const entropy = length * Math.log2(poolSize);
  let label = "Weak", color = "#c62828", width = "25%";
  if (entropy >= 100) { label = "Very strong"; color = "#16803c"; width = "100%"; }
  else if (entropy >= 70) { label = "Strong"; color = "#65a30d"; width = "75%"; }
  else if (entropy >= 45) { label = "Medium"; color = "#f97316"; width = "50%"; }
  strengthFill.style.width = width;
  strengthFill.style.background = color;
  strengthText.textContent = label;
}

async function copyPassword() {
  const value = passwordField.value;
  if (!value) {
    showMessage("Generate a password first.", true);
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    // Fallback for older browsers
    passwordField.select();
    document.execCommand("copy");
  }
  showMessage("Copied to clipboard!");
  copyBtn.textContent = "Copied";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
}

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
  if (passwordField.value) generatePassword();
});
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
document.querySelectorAll(".options input").forEach((box) =>
  box.addEventListener("change", () => {
    if (passwordField.value || getSelectedSets().length === 0) generatePassword();
  })
);

// Generate one on page load
generatePassword();