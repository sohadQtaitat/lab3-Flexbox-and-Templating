'use strict';
function Horn(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.horns = data.horns;
    this.description = data.description;
    this.keyword = data.keyword;
    Horn.all.push(this);
}
Horn.all = [];



Horn.prototype.render = function () {
    let eachHorn = $('<div></div>');
    eachHorn.addClass(this.keyword);
    let template = $('#photo-template').html();
    eachHorn.html(template);

    eachHorn.find('h2').text(this.title);
    eachHorn.find('img').attr('src', this.image_url);
    eachHorn.find('p').text(this.description);

    $('main').append(eachHorn);

}

function selectBox() {
    let select = $('select');
    let seen = {};
    Horn.all.forEach((horn) => {
        if (!seen[horn.keyword]) {

            let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
            select.append(option);
            seen[horn.keyword] = true;
        }

    });
}



$('select').on('change', function () {
    let selected = $(this).val();
    $('div').hide();
    $(`.${selected}`).fadeIn(800);
});




$.get('../data/page-1.json').then(data => {
    data.forEach(items => {
        let horn = new Horn(items);

        horn.render();

    });
    console.log(data);
})
    .then(() => {
        selectBox();
    });
