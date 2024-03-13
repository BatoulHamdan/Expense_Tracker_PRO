const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../Managers/jwtManager");
const emailManager = require("../../../Managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  //Validations
  if (!name) throw "Name must be provided!";
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 6) throw "Password must be at least 6 characters long!";
  if (confirm_password !== password)
    throw "Password and confirm password does not match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  const text = `
    Welcome to Expense Tracker PRO!

    Congratulations on successfully registering with Expense Tracker PRO. We're excited to have you on board!

    With Expense Tracker PRO, you can effortlessly manage your finances, track your expenses, set budgets, and gain better control over your money. Whether you're looking to save for a vacation, plan for retirement, or simply stay on top of your day-to-day spending, we've got you covered.

    Here are a few things you can do to get started:
    - Set Up Your Profile: Customize your profile with a profile picture, preferred currency, and any other relevant details to personalize your experience.
    - Add Your Accounts: Link your bank accounts, credit cards, and other financial accounts to seamlessly import transactions and get a comprehensive view of your finances.
    - Create Budgets: Set up budgets for different categories such as groceries, dining out, entertainment, and more to help you stay within your spending limits.
    - Track Expenses: Record your expenses manually or let Expense Tracker PRO automatically categorize and track your transactions from linked accounts.
    - Visualize Your Finances: Use our intuitive charts and graphs to visualize your spending patterns, identify areas for improvement, and make informed financial decisions.

    If you have any questions or need assistance at any point, feel free to reach out to our support team. We're here to help you make the most of Expense Tracker PRO and achieve your financial goals.

    Once again, welcome aboard, and happy tracking!

    Best regards,
    Expense Tracker PRO Team
  `;

  const html = `
    <h1>Welcome to Expense Tracker PRO!</h1>
    <p>Congratulations on successfully registering with Expense Tracker PRO. We're excited to have you on board!</p>
    <p>With Expense Tracker PRO, you can effortlessly manage your finances, track your expenses, set budgets, and gain better control over your money. Whether you're looking to save for a vacation, plan for retirement, or simply stay on top of your day-to-day spending, we've got you covered.</p>
    <h2>Here are a few things you can do to get started:</h2>
    <ol>
        <li><strong>Set Up Your Profile:</strong> Customize your profile with a profile picture, preferred currency, and any other relevant details to personalize your experience.</li>
        <li><strong>Add Your Accounts:</strong> Link your bank accounts, credit cards, and other financial accounts to seamlessly import transactions and get a comprehensive view of your finances.</li>
        <li><strong>Create Budgets:</strong> Set up budgets for different categories such as groceries, dining out, entertainment, and more to help you stay within your spending limits.</li>
        <li><strong>Track Expenses:</strong> Record your expenses manually or let Expense Tracker PRO automatically categorize and track your transactions from linked accounts.</li>
        <li><strong>Visualize Your Finances:</strong> Use our intuitive charts and graphs to visualize your spending patterns, identify areas for improvement, and make informed financial decisions.</li>
    </ol>
    <p>If you have any questions or need assistance at any point, feel free to reach out to our support team. We're here to help you make the most of Expense Tracker PRO and achieve your financial goals.</p>
    <p>Once again, welcome aboard, and happy tracking!</p>
    <p>Best regards,<br>Expense Tracker PRO Team</p>
  `;

  await emailManager(
    createdUser.email,
    "Welcome to Expense Tracker PRO!",
    text,
    html
  );

  res.status(201).json({
    status: "success",
    message: "User registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
