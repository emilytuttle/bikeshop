const { body, validationResult, check} = require('express-validator')
const userValidationRules = () => {
  return [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty()
  ]
}


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}

// exports.createValidation = [
    
// ]
// exports.updateValidation = [
//     check('firstName', 'First name is required').not().isEmpty(),
//     check('lastName', 'Last name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('birthday', 'Birthday is required').not().isEmpty(),
//     check('startDate', 'start date is required').not().isEmpty(),
//     check('wage', 'Wage is required').not().isEmpty(),
//     check('position', 'Position is required').not().isEmpty(),
//     check('team', 'Team is required').not().isEmpty()
// ]