const db = require('../config/dbConn');

const doesExists = async (name) => {
    return new Promise((resolve,reject) => {
        db.query(
            `select * from projects where name = ?`,
            [name],
            (error, rows) => {
              if (error) {
                reject(error);
              }
              return resolve(rows.length > 0);
            }
          );
    })
}

const create = async (userInfo) => {
    const { name, address, status, endDate } = userInfo;
    return new Promise((resolve,reject) => {
        const action = db.query(
            `insert into projects (name, address, image, status, endDate, comments) values (?, ?, ?, ?, ?, ?)`,
            [name, address, '', status, endDate, ''],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              return resolve(results ? 'Project Created Succesfully' : 'Project Failed to Create');
            }
          );
    })
}

const addImageToProject = async (imageS3Url, projectName) => {
    return new Promise((resolve,reject) => {
        const action = db.query(
            `update projects set image = ? where name = ?`,
            [imageS3Url, projectName],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              return resolve(results ? 'Project Created Succesfully' : 'Project Failed to Create');
            }
          );
    })
}

const getAllProjects = async () => {
    return new Promise((resolve,reject) => {
        const action = db.query(
            `select name from projects`,
            [imageS3Url, projectName],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              return resolve(results);
            }
          );
    })
}

module.exports = {
    doesExists,
    create,
    addImageToProject,
    getAllProjects
}