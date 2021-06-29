const router = require(`express`).Router();
const express = require(`express`);
const path = require('path');
const app = express();
const staticpath =path.join(__dirname,'../../static');
app.use(express.static(staticpath));

console.log("redirect route");

router.get('/',(req,res) => {
    console.log("success in redirect");
   res.render(staticpath+'/login.ejs');
})
module.exports = router;