const connect = require('../helpers/connection')
const UserSchema = require('../model/User');
const passwordGen = require('../passwordHash')

module.exports =
function RegisterUser(data){
    const { firstName, lastName, email, password, cnfpass } = data;
    
    const passworData = passwordGen.genPassword(password);
    const hash = passworData.hash;
    const salt = passworData.salt;
    
    console.log(hash +" "+ salt);
    connect.then(db => {
        const saveDetails = new UserSchema({ username:email, name: { firstName, lastName }, email, password:{ salt, hash} });  //TODO username=email
        saveDetails.save(function(err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
          });
    })
}
