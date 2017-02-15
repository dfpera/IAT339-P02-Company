// Main js file contains all interactions that will be present within the page.
$(function() {
  // Old js
  document.getElementById('modal-open').onclick=function(){
    document.getElementById('modal').style.display='block';
  };
  document.getElementById('cancel').onclick=function(){
    document.getElementById('modal').style.display='none';
  };
});
