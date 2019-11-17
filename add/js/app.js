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
console.log(Horn.allHorns);
let keyArr = [];
let UniqueKeyArr = [];
Horn.prototype.render = function() {
  const $template = $('#hornsTem').html();
  const $source = Handlebars.compile($template);
  return $source(this);
};




var page = 'data/page-1.json';

function newArrCreat() {
  var uniArr = [...new Set(keyArr)];
  UniqueKeyArr.push(uniArr);
}

let selectRend = () => {
  UniqueKeyArr[0].forEach( element => {
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
    .then(Horn.loadHorns).then(newArrCreat).then(selectRend);
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

$('#page2').click(function(){
  page = 'data/page-2.json';
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  UniqueKeyArr = [];
  keyArr = [];
  $(() => Horn.readJson(page));
});

$('#page1').click(function(){
  page = 'data/page-1.json';
  $('div').remove();
  $('option').remove();
  Horn.allHorns = [];
  UniqueKeyArr = [];
  keyArr = [];
  $(() => Horn.readJson(page));
});

$('#title').click(function(){
  $('div').remove();
  UniqueKeyArr[0] = [];
  Horn.allHorns.sort(function(a, b) {
    return a.title.localeCompare(b.title);
  });
  $('select').remove();
  $('#page1').remove();
  $('#page2').remove();
  Horn.loadHorns();
});

$('#hornNumber').click(function(){
  $('div').remove();
  UniqueKeyArr[0] = [];
  Horn.allHorns.sort( function ( a, b ) { return b.horns - a.horns; } );
  $('select').remove();
  $('#page1').remove();
  $('#page2').remove();
  Horn.loadHorns();
});

$('#home').click(function(){
  location.reload();
});