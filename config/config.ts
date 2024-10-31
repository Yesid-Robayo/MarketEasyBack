


const config = {
  port: 3000,

  database: {
    host: 'localhost',
    port: '3306', 
    username: 'root',
    password: '1234',
    name: 'marketeasy',
  },
  jwt: {
    secret: 'secret231',
    expiresIn:  '1d',
  },
 
  logLevel: 'info',
};

export default config;
