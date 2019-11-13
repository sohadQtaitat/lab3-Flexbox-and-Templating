'use strict';

function Horn(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  keyArr.push(this.keyword);
}





Horn.allHorns = [];
let keyArr = [];
console.log(keyArr);
let uniqeArr = [];
Horn.prototype.render = function() {
  const $template = $('#hornsTem').html();
  const $source = Handlebars.compile($template);
  return $source(this);
};




var page = 'data/page-1.json';


var page = 'data/page-2.json';





function makeNewarr() {
  var newArr = [...new Set(keyArr)];
  uniqeArr.push(newArr);
}



let selectRend = () => {
  uniqeArr[0].forEach( element => {
    $('select').append('<option class="optClone"></option>');
    console.log(element);
    let optionClone = $('option[class="optClone"]');
    optionClone.text(element);
    optionClone.removeClass('optClone');
  });
};








Horn.readJson = (page) => {
  $.get(page, 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
    .then(Horn.loadHorns).then(makeNewarr).then(selectRend);
};




Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => {
    $('#photo-template').append(horn.render());
  });
};

$(() => Horn.readJson(page));

$('select').on('change',selShow);
function selShow(){
  let selItem=$(this).val();
  $('div').hide();
  $('div[id = "'+selItem+'"]').show();
}

$('#pg2').click(function(){
  page = 'data/page-2.json';
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  uniqeArr = [];
  keyArr = [];
  $(() => Horn.readJson(page));
});

$('#pg1').click(function(){
  page = 'data/page-1.json';
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  uniqeArr = [];
  keyArr = [];
  $(() => Horn.readJson(page));
});

$('#titleSort').click(function(){
  $('div').remove();
  uniqeArr[0] = [];
  Horn.allHorns.sort(function(a, b) {
    return a.title.localeCompare(b.title);
  });
  $('select').remove();
  $('#pg1').remove();
  $('#pg2').remove();
  Horn.loadHorns();
});

$('#numberSort').click(function(){
  $('div').remove();
  uniqeArr[0] = [];
  Horn.allHorns.sort( function ( a, b ) { return b.horns - a.horns; } );
  $('select').remove();
  $('#pg1').remove();
  $('#pg2').remove();
  Horn.loadHorns();
});

$('#home').click(function(){
  location.reload();
});