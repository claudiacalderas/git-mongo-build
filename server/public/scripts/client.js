var editing = false;
var employeeId;

$(document).ready(function() {
  console.log("jquery sourced");
  getEmployees();

  $('#employeeTable').on('click', '.deleteEmployee',function() {
    console.log("Deleting: ", $(this).data("id"));

    var objectToSend = {
      id: $(this).data("id")
    };
    $.ajax({
      type: "DELETE",
      url: "/employees",
      data: objectToSend,
      success: function(response) {
        console.log('back from delete with response:',response);
        getEmployees();
      }
    });
  });

  $("#addButton").on("click",function() {
    console.log("addButton clicked");
    var name = $('#name').val();
    var position = $('#position').val();
    var salary = $('#salary').val();

    var objectToSend = {
      id: employeeId,
      name: name,
      position: position,
      salary: salary
    }

    if (editing) {
      console.log("updating: ", objectToSend);
      // update the document
      $.ajax({
        type: "PUT",
        url: "/employees",
        data: objectToSend,
        success: function(response) {
          console.log('back from update with response:',response);
          getEmployees();
        }
      });

      editing = false;
    } else {
      // insert new document
      $.ajax({
        type: "POST",
        url: "/employees",
        data: objectToSend,
        success: function(response) {
          console.log('back from insert with response:',response);
          getEmployees();
        }
      });
    }
  });

  $('#employeeTable').on('click', '.editEmployee',function() {
    editing = true;
    console.log('editEmployee clicked');

    $('#name').val($(this).data("name"));
    $('#position').val($(this).data("position"));
    $('#salary').val($(this).data("salary"));
    employeeId = $(this).data("id");


  });

});

function getEmployees() {
  $.ajax({
    type: "GET",
    url: "/employees",
    success: function(response) {
      console.log("Getting employees: ",response);

      $('#employeeTable').empty();
      for (var i = 0; i < response.length; i++) {
        var name = response[i].name;
        var position = response[i].position;
        var salary = response[i].salary;
        var id = response[i]._id;
        $('#employeeTable').append('<tr> </tr>');
        var $el = $('#employeeTable').children().last();
        $('#employeeTable').append('<td data-id="' + id +
        '">' + name + '</td>');
        $('#employeeTable').append('<td data-id="' + id +
        '">' + position + '</td>');
        $('#employeeTable').append('<td data-id="' + id +
        '">' + salary + '</td>');
        $('#employeeTable').append('<td><button class="deleteEmployee" data-id="' +
        id +'">Delete</button></td>');
        $('#employeeTable').append('<td><button class="editEmployee"'+
        ' data-id="' + id +
        '" data-name="' + name +
        '" data-position="' + position +
        '" data-salary="' + salary +
        '">Edit</button></td>');
      }
    }
  });
}
