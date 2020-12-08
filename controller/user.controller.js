var { nanoid } = require("nanoid");
var db = require("../db.js");

module.exports.home = (req, res) => res.render(
    'users/index', { users: db.get('users').value() 
});

module.exports.search = function(req, res)
{
    var q = req.query.q;
    var matchedUsers = db.get('users')
                         .value()
                         .filter( user => user.name.toLowerCase()
                         .indexOf(q.toLowerCase()) !== -1);
    res.render('users/index', { users: matchedUsers });
};

module.exports.createUser = (req, res) => res.render('users/create');

module.exports.getUser = function(req, res) 
{
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/view', { user: user });
}

module.exports.createUserPOST = function(req, res)
{
    var errors = [];
    if (!req.body.name)
    {
        errors.push("Please enter your name.");
    }

    if (!req.body.phone)
    {
        errors.push('Please enter your phone number.');    
    }
    
    if (errors.length)
    {
        res.render('users/create', { errors: errors, values: req.body });
        return;
    }

    req.body.id = nanoid();
    db.get('users').push(req.body).write();
    res.redirect('/users');
}