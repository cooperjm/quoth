//Thest two variables hold the quote and author for sharing
var txt = '';
var author = '';

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
  //$('.qBox').toggleClass('.slide-in-blurred-top');
  $('.qBox').toggle('fade', 400);

    $.ajax({
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#auth').html('~' + post.title);
        $('#txt').html(post.content);
        txt = $(post.content).text();
        author = post.title;
      },
      cache: false
    });

    $('.qBox').toggle('fade', 400);

};


$(document).ready(function() {
  getQuote();
  $('.button').on('click', getQuote);
  $('#tweet').on('click', function() {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + txt + '"' + " - " + author));
  });
  $('#tumblr').on('click', function() {
     openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption='+ encodeURIComponent(author)+'&content=' + encodeURIComponent(txt)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
 });
});
