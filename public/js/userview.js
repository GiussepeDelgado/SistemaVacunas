$('#userstables').DataTable({
  ajax: {
      url: "usuarios/data",
      dataSrc: ""
  },
  columns: [

      { "data": "order" },
      { 'data': 'name' },
      { 'data': 'email' },
      { 'data': 'access' },
      {
          "data": null,
          "render": function(data) {
              return '<div style="display:flex;justify-content:center"><a href="usuarios/editar/' + data._id + '"class="btn btn-outline-info"><i class="fas fa-user-edit"></i></a><a id="delete"onclick="confirmar(' + data._id + ')" class="btn btn-outline-danger mx-2 "><i class="fas fa-trash-alt"></i></a></div>'
          }
      }
  ],
  pageLength: 5,
  lengthMenu: [
      [5, 10, 20, -1],
      [5, 10, 20, 'Todos']
  ]

});

function confirmar(data) {
  console.log(data)
  Swal.fire({
      title: '¿Confirma eliminar el usuario: ' + data + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Confirmar'
  }).then((result) => {
      if (result.isConfirmed) {
          window.location = '/usuarios/delete/' + data;
      }
  });
};