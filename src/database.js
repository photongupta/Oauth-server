class Database {
  constructor(db) {
    this.db = db;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      this.db.get('users', (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(res));
      });
    });
  }

  setUsers(users) {
    return new Promise((resolve, reject) => {
      this.db.set('users', JSON.stringify(users), (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = Database;
