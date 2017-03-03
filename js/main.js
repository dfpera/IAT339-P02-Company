// Main js file contains all interactions that will be present within the page.

// Functions
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 49.2589637, lng: -123.0648282}
  });
  // Create an array of alphabetical characters used to label the markers.
  var labels = 'abcdefghijklmnopqrstuvwxyz';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
      map: map
    });
  });
}
var locations = [
  {lat: 49.249510, lng: -123.104452},
  {lat: 49.278678, lng: -123.113368},
  {lat: 49.272966, lng: -123.002818}
];

function initCustomize(menuID) {
  // Customize (medium/large)
  $(menuID + '-big .panel-container').click(function() {
    var currentImg = $(this).find('.icon-container img');
    var currentSrc = currentImg.attr('src').split('.')[0];
    if (currentSrc.indexOf('-active') == -1) {
      // Reset active panel
      var allPanels = $(menuID + '-big .panel-container');
      allPanels.removeClass('active');
      allPanels.each(function() {
        var img = $(this).find('.icon-container img');
        var src = img.attr('src');
        img.attr('src', src.replace('-active', ''));
      });
      // Set large toggle active
      currentImg.attr(
        'src',
        currentSrc + '-active.png'
      );
      $(this).toggleClass('active');
      // Set small drop down text
      var content = $(this).children('h5').text();
      $(menuID + '.dropdown > h5.capitalize').text(content);
    }
  });

  // Customize (small)
  $(menuID).click(function(){
    $(this).find('.dropdown-box').slideToggle();
    $(this).find('.dropdown-caret').toggleClass('fa-caret-down');
    $(this).find('.dropdown-caret').toggleClass('fa-caret-up');
  });
  // Menu Options
  $(menuID + ' .dropdown-box > .dropdown-content').click(function() {
    var content = $(this).text();
    // Set small drop down text
    $(this).parents('.dropdown').children('h5.capitalize').text(content);
    // Set large toggle active
    var bigMenuOptions = $(menuID + '-big .panel-container');
    bigMenuOptions.each(function() {
      // Reset active panel
      var img = $(this).find('.icon-container img');
      var src = img.attr('src');
      img.attr('src', src.replace('-active', ''));
      $(this).removeClass('active');
      if ($(this).children('h5').text() === content) {
        var currentImg = $(this).find('.icon-container img');
        var currentSrc = currentImg.attr('src').split('.')[0];
        currentImg.attr(
          'src',
          currentSrc + '-active.png'
        );
        $(this).toggleClass('active');
      }
    });
  });
}

// Main Loop
$(function() {
  // Menu
  var hamburgers = $('header > .icons > .hamburger');
  hamburgers.children('i').removeClass('activeIcon');
  hamburgers.parents('header').children('nav.main').hide();
  // Hamburger listener
  hamburgers.click(function() {
    $(this).children('i').toggleClass('activeIcon');
    $(this).parents('header').children('nav.main').slideToggle('slow');
  });

  // Search
  var search = $('header > .icons > .search');
  search.click(function() {
    $(this).children('i').hide();
    $(this).children('.inputSearch').show(500);
    $(this).children('.inputSearch').focus();
  });
  search.focusout(function() {
    $(this).children('.results').slideUp(500);
    $(this).children('.inputSearch').delay(500).hide('slow');
    $(this).children('i').delay(900).show('fast');
  });
  search.focusin(function() {
    $(this).children('.results').delay(500).slideDown('slow');
  });

  // Customize form
  initCustomize('#size');
  initCustomize('#toppings');
  initCustomize('#ice-level');
  initCustomize('#sugar-level');

  // Cart Modal
  $('#modal-open').click(function(){
    $('#modal').show();
  });
  $('#cancel').click(function(){
    $('#modal').hide();
  });
   $('#review-open').click(function(){
    $('#reviews').show();
  });
  $('#reviews-close').click(function(){
    $('#reviews').hide();
  });
});
