let api = {};
api.index = (req, res) => {
    let data = req.viewData;
    data.flash = res.locals.sessionFlash;
    res.render('login', data);
}

api.login = (req, res) => {
    
    req.checkBody('username')
        .isLength({min:1})
        .withMessage('Your username can not be empty')
        .isEmail().withMessage('Invalid email format');    
    req.checkBody('password','Please insert your password').isLength({min:1});

    let errors = req.validationErrors(true);

    if(errors){
        console.warn('Kena error');
        console.log(errors);
        req.session.sessionFlash = {
            status: 'error',
            message: 'Please fix error(s) bellow',
            errors,
            form: {
                username: req.body.username,
                password: req.body.password
            }
        }
        res.redirect('/admin');
    }else{
        res.json({
            message: 'success'
        })
    }
}

module.exports = api;