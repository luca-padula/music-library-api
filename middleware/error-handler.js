const mongoose = require("mongoose")
const ApiError = require("../utils/error-classes/api-error")
const ApiValidationError = require("../utils/error-classes/api-validation-error")

function handleMongoDupKeyError(err, res) {
   const duplicateField = Object.keys(err.keyPattern)[0]
   const errMsg = `${duplicateField} is already taken`
   const resErr = new ApiError(409, errMsg)
   res.status(resErr.status).send(resErr)
}

function parseImmutableFieldInMongoError(err) {
   const errString = err.toString()
   const FieldStart = errString.indexOf("'") + 1
   const FieldEnd = errString.indexOf("'", FieldStart)
   return errString.slice(FieldStart, FieldEnd)
}

function handleMongoImmutableFieldError(err, res) {
   const invalidField = parseImmutableFieldInMongoError(err)
   const errMsg = `cannot update immutable field ${invalidField}`
   const resErr = new ApiError(422, errMsg)
   res.status(resErr.status).send(resErr)
}

function handleExpressValidatorError(err, res) {
   const validationErrs = []
   err.expressValidatorErrors.forEach((validatorErr) => {
      validationErrs.push(validatorErr.msg)
   })
   const errMsg = "express validator errors"
   const resErr = new ApiValidationError(422, errMsg, validationErrs)
   res.status(resErr.status).send(resErr)
}

function handleMongoValidationError(err, res) {
   const invalidFields = Object.keys(err.errors)
   const validationErrs = []
   invalidFields.forEach((field) => {
      validationErrs.push(`invalid ${field} entered`)
   })
   const errMsg = "mongodb validation errors"
   const resErr = new ApiValidationError(422, errMsg, validationErrs)
   res.status(resErr.status).send(resErr)
}

function handleMongoCastError(err, res) {
   const errMsg = `invalid ${err.kind} for field (${err.path})`
   const resErr = new ApiError(422, errMsg)
   res.status(resErr.status).send(resErr)
}

// **consider making separate error parser module if file gets too long**

module.exports = function (err, req, res, next) {
   console.log("in error handling middleware: ", err)
   if ("code" in err && err.code === 11000) {
      return handleMongoDupKeyError(err, res)
   }
   if ("code" in err && err.code === 66) {
      return handleMongoImmutableFieldError(err, res)
   }
   if ("expressValidatorErrors" in err) {
      return handleExpressValidatorError(err, res)
   }
   if (err instanceof mongoose.Error.ValidationError) {
      return handleMongoValidationError(err, res)
   }
   if (err instanceof mongoose.Error.CastError) {
      return handleMongoCastError(err, res)
   }
   if (err instanceof ApiError) {
      return res.status(err.status).send(err)
   }
   const resErr = new ApiError(500, "An unknown error occured")
   res.status(resErr.status).send(resErr)
}
