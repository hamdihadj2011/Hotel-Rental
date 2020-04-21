const Payment = require("../models/Payment");
const { normalizeErrors } = require("../helpers/mongoose");

exports.getPendingPayments = function (req, res) {
  const user = res.locals.user;

  Payment.where({ toUser: user })
  .populate({
    path: "booking",
    populate: { path: "rental" },
  }).populate('fromUser')
    .exec((err,foundPayment)=>{
        if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)})
        }
        return res.json(foundPayment)
    })
};
