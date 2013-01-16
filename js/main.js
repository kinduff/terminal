$(document).ready(function() {
  function focus() { $('#user').focus(); }
  $('.terminal').show(); focus();
  // Focus, focus everywhere.
  $(window).focus(function() {
    focus();
    $('#user').val($('#user').val());
  });
  $(document).click(function(e) {
    focus();
    $('#user').val($('#user').val());
  });
  $('#user').on('input',function(e){
    $('.clone').text($(this).val());
  });
  // Si es usuario presiona alguna tecla
  $('#user').keypress(function(e) {
    // Si es usuario presiona enter
    if(e.keyCode===13){
      e.preventDefault();
      var valor = $(this).val(); // Rescatamos valor
      $(this).val(''); // Hacemos clear al input
      $('.clone').text(''); // Hacemos clear al clon
      $('#respuesta').append('<p class="comando">'+valor+'</p>'); // Simulamos metida del comando en contenedor
      caso = cases.indexOf(valor); // views.js -> tomamos valor del array
      if (caso === -1) { // Si no existe el comando regresa -1
        $('#respuesta').append('<p class="respuesta">Comando "'+valor+'" no identificado.<br />Para ver lista de comandos, escribe: help</p>');
      } else { 
        terminal(caso); // Si existe regresa 1..oo, ejecutamos función terminal
      }
    }
  });
  function terminal(caso) {
    // Comando es un objeto, accedemos al caso
    if (comando[caso]) { // Si el caso tiene valor
      var x = comando[caso]; // asignamos a variable
      $('#respuesta').append('<p class="respuesta">'+x+'</p>'); // Simulamos respuesta
    } else { // Si no, es el primer comando, es decir, comando clear (limpia pantalla)
      $('#respuesta, .info').empty(); // Pasamos un trapito
    }
  }
  // Función para hacer blink al cursor
  $('.blink').each(function() {
    var elem = $(this);
    setInterval(function() {
      if (elem.css('visibility') == 'hidden') {
        elem.css('visibility', 'visible');
      } else {
        elem.css('visibility', 'hidden');
      }
    }, 500);
  });
  $("#handle").live("mousedown", function () {
    $(this).css('cursor','move');
  }).live("mouseup", function () {
    $(this).css('cursor','default');
  });
  var theHandle = document.getElementById("handle");
  var theRoot = document.getElementById("terminal");
  Drag.init(theHandle, theRoot);
});
