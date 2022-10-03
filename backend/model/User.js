const db = require('../config/dbConn');

const doesExists = async (email) => {
    return new Promise((resolve,reject) => {
        db.query(
            `select * from users where email = ?`,
            [email],
            (error, rows) => {
              if (error) {
                reject(error);
              }
              return resolve(rows.length > 0);
            }
          );
    })
}

const getUserByEmail = async (email) => {
    return new Promise((resolve,reject) => {
        db.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
              const { email, password, role } = results[0];
              if (error) {
                reject(error);
              }
              if(results[0].email === email){
                return resolve({email, password, role});
              } else {
                reject(error);
              }
              
            }
          );
    })
}

const getUserByToken = async (token) => {
  const { refreshToken } = token;
  return new Promise((resolve,reject) => {
    const action = db.query(
        `select * from users where refreshToken = ?`,
        [refreshToken],
        (error, results, fields) => {
          if (error) {
            reject(error);
          }
          return resolve(results[0]);
        }
      );
})
}

const setTokenToUser = async (user) => {
    const { email, refreshToken } = user;
    return new Promise((resolve,reject) => {
        const action = db.query(
            `update users SET refreshToken = ? where email = ?`,
            [refreshToken, email],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              return resolve(results ? 'Token Saved Succesfully' : 'Token failed to save');
            }
          );
    })
}

const create = async (userInfo) => {
    const { email, password } = userInfo;
    return new Promise((resolve,reject) => {
        const action = db.query(
            `insert into users (email, password) values (?, ?)`,
            [email, password],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              return resolve(results ? 'User Created Succesfully' : 'User Failed to Create');
            }
          );
    })
}

module.exports = {
    doesExists,
    getUserByEmail,
    create,
    setTokenToUser,
    getUserByToken
}