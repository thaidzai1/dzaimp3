//check product in production mode or development mode
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
}
else {
  module.exports = require('./dev');
}
