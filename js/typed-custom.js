var humanize = Math.round((Math.random() * 100) + 20);
var shouldBeText = "";
var changeInto = "";
var inProgress = false;

function ChangeText(text){
    shouldBeText = text;
    if(inProgress == false){
        inProgress = true
        changeInto = shouldBeText;
        RemoveText(function(){FillText(FillDone, typedText)});
    }
};

function FillText(callback, divClass){
    divClass.removeData('typed');
    $('span.typed-cursor').hide();
    divClass.typed({
        typeSpeed: 80,
        backSpeed: 80,
        strings: [changeInto],
        callback: FillDone
    });
}

function FillDone(){
    inProgress = false;
    if(shouldBeText != changeInto){
        ChangeText(shouldBeText);
    }
}

function RemoveText(callback){    
    var word = typedText.html();
    var wordLength = word.length;
    var newWordLength = wordLength - 1;
    var newWord = word.slice(0, newWordLength);
    typedText.html(newWord);
    if(newWordLength === 0){
        callback();
    }else{
        setTimeout(function(){RemoveText(callback)},humanize);  
    }
}

$('.home-project-detail').on('mouseenter',function() {

    if($(this).hasClass('home-hundred-detail')) {
      typedText = $('.home-hundred-title');
    }
    if($(this).hasClass('home-booking-detail')) {
      typedText = $('.home-booking-title');
    }
    if($(this).hasClass('home-yanmar-detail')) {
      typedText = $('.home-yanmar-title');
    }
    if($(this).hasClass('home-doelbeleggen-detail')) {
      typedText = $('.home-doelbeleggen-title');
    }
    if($(this).hasClass('home-tyt-detail')) {
      typedText = $('.home-tyt-title');
    }

    ChangeText('View Project');

});

$('.home-project-detail').on('mouseleave',function() {

    if($(this).hasClass('home-hundred-detail')) {
      typedText = $('.home-hundred-title');
      ChangeText("100 day challenge");
    }

    if($(this).hasClass('home-booking-detail')) {
      typedText = $('.home-booking-title');
      ChangeText('Booking.com');
    }

    if($(this).hasClass('home-yanmar-detail')) {
      typedText = $('.home-yanmar-title');
      ChangeText('Yanmar Europe');
    }

    if($(this).hasClass('home-doelbeleggen-detail')) {
      typedText = $('.home-doelbeleggen-title');
      ChangeText('Doelbeleggen');
    }

    if($(this).hasClass('home-tyt-detail')) {
      typedText = $('.home-tyt-title');
      ChangeText('Track your Transport');
    }

});