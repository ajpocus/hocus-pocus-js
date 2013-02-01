// From http://stackoverflow.com/questions/824349/modify-the-url-without-reloading-the-page
//
// Don't wrap with $()! This is meant to be global.

Trickster = {
  replacePage: function (opts) {
    if (!window.location.path) {
      window.history.pushState({
        "html": $("#page").html(),
        "pageTitle": document.title
      }, "", "");
    }
    
    $("#page").html(opts.content);
    document.title = opts.title || 'Joke.io';
    window.history.pushState({
      "html": opts.content,
      "pageTitle": opts.title
    }, "", opts.path);
  }
};

window.onpopstate = function(e){
  if (e.state) {
    $("#page").html(e.state.html);
    document.title = e.state.pageTitle;
  }
};

$(function () {
  $("#page a.trickster").on('click', function (ev) {
    ev.preventDefault();

    var title = $(this).data('title') || document.title;
    var path = $(this).attr('href');

    $.get(path, function (res) {
      Trickster.replacePage({
        "content": res,
        "title": title,
        "path": path
      });
    });
  });
});
