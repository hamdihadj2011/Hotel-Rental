const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/User");
const UserCtrl = require("../controllers/user");
const { normalizeErrors } = require("../helpers/mongoose");

router.get("/secret", UserCtrl.authMiddleware, (req, res) => {
  res.json({ secret: true });
});

router.get('/manage',UserCtrl.authMiddleware,(req,res)=>{
  const user=res.locals.user

  Rental.where({user})
        .populate('bookings')
        .exec((err,foundRentals)=>{ 
          if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          return res.json(foundRentals)
        })
})
router.get("/:id", (req, res) => {
  Rental.findById({ _id: req.params.id })
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err)
        return res.status(422).json({
          errors: [{ title: "Renatl Error", detail: "Cant find Rental" }],
        });
      return res.json(foundRental);
    });
});

router.get("/", (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings")
    .exec((err, foundRentals) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (foundRentals.length === 0) {
        return res.status(422).json({
          errors: [
            {
              title: "No Rentals Found",
              detail: `ther are no rental for ${city}`,
            },
          ],
        });
      }
      res.json(foundRentals);
    });
});
router.patch('/:id',UserCtrl.authMiddleware,(req,res)=>{
  const rentalDate=req.body
  const user=res.locals.user

  Rental.findById(req.params.id)
    .populate('user')
    .exec((err,foundRental)=>{
      if(err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
     if(foundRental.user.id !== user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      
     }

     foundRental.set(rentalDate)
     foundRental.save((err)=>{
      if(err){
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    return res.status(200).send(foundRental)
     })

    })

})

router.delete("/:id", UserCtrl.authMiddleware, (req, res) => {
  const user = res.locals.user;
  Rental.findById(req.params.id)
    .populate("user", "_id")
    .populate({
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } },
    })
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      if (user.id !== foundRental.user.id) { 
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }
  
      if (foundRental.bookings.length > 0) {
        return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!'}]});
      }
  
      foundRental.remove(function(err) { 
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
  
        return res.json({'status': 'deleted'});
      });
      
    });
});




router.post("/", UserCtrl.authMiddleware, (req, res) => {
  const {
    title,
    city,
    street,
    category,
    image,
    bedrooms,
    description,
    dailyRate,
  } = req.body;
  const user = res.locals.user;
  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    bedrooms,
    description,
    dailyRate,
  });
  rental.user = user;
  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    User.update({ _id: user.id }, { $push: { rentals: newRental } }, () => {});

    return res.json(newRental);
  });
});

module.exports = router;
