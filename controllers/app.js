const db = require("../database/db");

const bcrypt = require("bcryptjs");
const { schema, loginSchema } = require("../validation/validate");

const Register = async (req, res) => {
    // Validating the input body
    const { error } = await schema.validate(req.body);
    if(error){ 
        req.flash('error', error.details[0].message);
        return res.render('register', { message: req.flash('error') });
    } 

    // Checks if email already exists
    const searchQuery = `SELECT * FROM users WHERE email = ?`;
    await db.query(searchQuery, req.body.email, (err, result) => {
        if(err) return res.status(409).json(err);

        if(result.length){
            req.flash('error', 'Email Already Exists!');
            return res.render('register', { message: req.flash('error') })
        }else{
            // Hashing password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) return res.status(409).json(err);

                // Inserting record to the database
                const inputValues = {
                    username : req.body.username,
                    email : req.body.email,
                    password : hash
                }

                const sql = "INSERT INTO users SET ?";
                db.query(sql, inputValues, (err, result) => {
                    if(err) return res.status(409).json(err);

                    req.flash('success', 'Created User Successfully');
                    res.render('login', {message : req.flash('success')});
                })
            });
        }
    })

}

const Login = async (req, res) => {
    // Validating the user input
    const { error } = await loginSchema.validate(req.body);
    if(error) {
        req.flash('error', error.details[0].message)
        return res.status(409).render('login', {message: req.flash('error')})
    }

    // Checking if email exists
    const sql = "SELECT * FROM users WHERE email = ?";
    await db.query(sql, req.body.email, (err, result) => {
        if(err) return res.status(409).json(err);

        if(! result.length){
            req.flash('error', 'Email Not Found!!');
            return res.status(409).render('login', {message: req.flash('error')})
        }else{
            // Validating password
            bcrypt.compare(req.body.password, result[0].password, (err, success) => {
                if(err) return res.status(409).json(err);

                if(success){
                    //Setting Session
                    req.session.isAuth = true;
                    req.session.user = result[0];

                    res.redirect('/home')
                }
            })
        }
    })
}

const Logout = async (req, res) => {
    //Deleting the session
    req.session.destroy( err => {
        if(err) throw err;
    
        res.redirect('/login');
    } )
}

module.exports.Register = Register;
module.exports.Login = Login;
module.exports.Logout = Logout;