// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.User.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.id = id;
  try {
    const result = await tables.User.update(req.body);
    if (result) {
      res.json(result);
      res.status(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
// This operation is not yet implemented

// eslint-disable-next-line consistent-return

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    // Get the data submitted by the user in the request body
    const { name, email, naissance, civility, password } = req.body;

    // Add the new item to the database
    const newUser = await tables.User.create({
      name,
      email,
      naissance,
      civility,
      password,
    });

    // Respond with the newly added item in JSON format
    if (!newUser) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  add,
  edit,
  read,
};
