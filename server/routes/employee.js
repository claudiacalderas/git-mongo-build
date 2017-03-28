var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Defines HOW Documents will be saved to the Database
var EmployeeSchema = mongoose.Schema({
  name : String,
  position: String,
  salary: Number
});

/*
  Employees - Is a reference to the collection when finding things in the DB,
  Employees - Is a reference to the Schema, when we are saving things to the DB.
*/
var Employees = mongoose.model("Employees", EmployeeSchema);

//GET employees
router.get("/", function(req,res){
  //Get all employees
  console.log("employees get route");
  Employees.find(function(err, allEmployees){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    console.log(allEmployees);
    res.send(allEmployees);
  });
});

//Save a new employee
router.post("/", function(req,res){
  //Instance of the Model to be saved to the database
  var employee = new Employees();
  employee.name = req.body.name;
  employee.position = req.body.position;
  employee.salary = req.body.salary;
  employee.save(function(err, savedEmployee){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.send(savedEmployee);
  });
});

//Update an employee
router.put("/", function(req,res){
  //Instance of the Model to be saved to the database
  var id = req.body.id;
  console.log("receiving: ", req.body);
  Employees.findById(id, function (err, editEmployee) {
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        console.log("editEmployee is: ",editEmployee);
        editEmployee.name = req.body.name;
        editEmployee.position = req.body.position;
        editEmployee.salary = req.body.salary;

        // Save the updated document back to the database
        editEmployee.save(function (err, todo) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            }
            res.send(editEmployee);
        });
    }
  });
});

/*
  $.ajax({
      type: "DELETE",
      url: "/employees/" + id,
      success stuff
  });
  $.ajax({
      type: "DELETE",
      data: data,
      url: "/employees/",
      success stuff
  });
*/

//Delete an employee
router.delete("/", function(req,res){
  //Delete an employee
  // { "id" : "83275019375918538?"}
  var id = req.body.id;
  Employees.findByIdAndRemove(id, function(err, deletedEmployee){
    /*
      if(undefined){} - False Value
      if("Some Error Code"){} - True Value
    */

    if(err){
      console.log(err);
      res.sendStatus(500);
    }

    res.send(deletedEmployee);
  });
});

module.exports = router;
