const signup = (req, res) => {
  const {name, password} = req.body;
  const {users, db} = req.app.locals;
  users.push({name, password});
  db.setUsers(users).then(() => res.redirect('/index.html'));
};

const serveIndexPage = (req, res, next) => {
  console.log(req.session.isNew);
  if (req.session.isNew) {
    return res.redirect('/index.html');
  }
  res.redirect('./home.html');
};

const attachDetails = (req, res, next) => {
  req.app.locals.db
    .getUsers()
    .then((users) => {
      req.app.locals.users = users || [];
    })
    .then(next);
};

const validateLogin = (req, res, next) => {
  const {users} = req.app.locals;
  const {name, password} = req.body;
  console.log(name, password, users);
  const isUserExists = users.some(
    (user) => user.name === name && user.password === password
  );
  if (isUserExists) {
    req.session.name = name;
    req.session.password = password;
  }
  res.json({isUserExists});
};

const logOut = (req, res) => {
  req.session = null;
  res.json({status: 'loggedOut'});
};

module.exports = {validateLogin, logOut, attachDetails, serveIndexPage, signup};
