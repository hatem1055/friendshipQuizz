 //quistion order
 var quistionOrder=1,
 //answers
 answers=[];
$(document).ready(function(){
 //start the quiz codes
//next quistion
$("body").on("click",".next,.to-result",function(){
 //cheking if the user choose one anwser or more or less
 if($($(this).attr("data-parent")+" .checked").length==1){
  //this is for the callback function
  var thisBtn=$(this);
    $(this).parent().parent().parent().fadeOut(1000,function(){
     thisBtn.parent().parent().parent().next().fadeIn();
    });
    //cheking if the user choose right or wrong answer
if($($(this).attr("data-parent")+" .checked").parent().hasClass("right-ans")){
     $($(this).attr("data-parent")+" .checked").parent().addClass("right-style");
     $(".friend-name").text($(".visitor-name").text());
    }
        else if($($(this).attr("data-parent")+" .checked").parent().hasClass("wrong-ans")){
     $($(this).attr("data-parent")+" .checked").parent().addClass("wrong-style");
     $($(this).attr("data-parent")+" .right-ans").addClass("right-style");
    }
    //preventing the apperance of error message
    $(this).attr("data-target","");
    }
    else{
        
    }
});
//end the quiz codes
 //removing and returning of placeholder
 $("input").focus(function(){
  placeholder=$(this).attr("placeholder");
  $(this).attr("placeholder","");
  $(this).blur(function (){
   $(this).attr("placeholder",placeholder);
  });
 });
$(".log-in-mover").click(function (e){
 e.preventDefault();
 if($(".admin-name").val()==""||$(".admin-email").val()==""){
  $(".admin-info input[value='']").addClass("red-placeholder");
 }
 else{
  $(".log-in").fadeOut();
  $(".quiz-maker").fadeIn();
 }
});
//changing the icon according to is correct or not and adding the class is correct to the correct answer
$(".is-correct").click(function () {
  $(this).toggleClass("no");
  $(this).toggleClass("yes");
 $(this).children().toggleClass("fa-times");
 $(this).children().toggleClass("fa-check");
});
//putting the quistion order
$(".quistion-order").text(quistionOrder);
//add quistion functions
$(".add-quistion").click(function (){
 //pushing the answers to the answeres array
 $(".answer-input").each(function (){
  if($(this).val().length>=1){
    answers.push($(this).val());
  }
 });
 //cheking if the quistion is more than 3 charactars
 if($(".the-quistion").val().length<=3){
  $(".warning-message").text("your quistion should be more than 3 charactars");
    //returning the warning
  $(this).attr("data-target","#the-quistion");
 }
 //cheking if the user write enough answeres
 else if(answers.length<4){
  $(".warning-message").text("please write four answers");
  answers=[];
  console.log(answers);
  //returning the warning
  $(this).attr("data-target","#the-quistion");
 }
 //cheking if the user choose one quistion to be right
 else if($(".yes").length!=1){
  $(".warning-message").text("please choose one answere to be right");
    //returning the warning
  $(this).attr("data-target","#the-quistion");
 }
 // if every thing is ok
 else{
    //apending the quistion to the quiz
    //vars
  var theQuistion=$(".the-quistion").val(),
      ans1=$(".answer1-input").val(),
      ans2=$(".answer2-input").val(),
      ans3=$(".answer3-input").val(),
      ans4=$(".answer4-input").val(),
      theCorrectAns=$(".yes").siblings().val();
      //the appending
      //apend the quistion div to the quistions
      $('<div class="quistion'+quistionOrder+' quistion"></div>').appendTo(".quistions");
     //apend the quistion to the quistion div
      $('<h2>'+theQuistion+'</h2>').appendTo('.quistion'+quistionOrder);
      //apending answers list
      $('<ul class="answers answer'+quistionOrder+'"></ul>').appendTo('.quistion'+quistionOrder);
      //appending the answer to the list
      $('<li class="wrong-ans an-answer"><input type="checkbox"><label>'+ans1+'</label></li>').appendTo('.answer'+quistionOrder);
      $('<li class="wrong-ans an-answer"><input type="checkbox"><label>'+ans2+'</label></li>').appendTo('.answer'+quistionOrder);
      $('<li class="wrong-ans an-answer"><input type="checkbox"><label>'+ans3+'</label></li>').appendTo('.answer'+quistionOrder);
      $('<li class="wrong-ans an-answer"><input type="checkbox"><label>'+ans4+'</label></li>').appendTo('.answer'+quistionOrder);
      $("<li class='button-li'></li>").appendTo('.answer'+quistionOrder);
      
      //making the icheck plugin work
   $('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%' // optional
  });
//giving the right answer right answer's class
$(".answer"+quistionOrder+" .an-answer label:contains("+theCorrectAns+")").parent().removeClass("wrong-ans");
$(".answer"+quistionOrder+" .an-answer label:contains("+theCorrectAns+")").parent().addClass("right-ans");
//apending the moving button
$('<button class="btn btn-primary next  mover" data-parent=".answer'+quistionOrder+'"  data-toggle="modal" data-target="#exampleModal">next</button>').appendTo('.answer'+quistionOrder+' .button-li');
//increase the quistion order
  quistionOrder+=1;
  //clearing the answers and quistion
  $(".clear").val("");
  //updating the quistion order
  $(".quistion-order").text(quistionOrder);
  //previntig the apperance of error message
  $(this).attr("data-target","");
  //removing the yes class from the chosen answer
  $(".is-correct .fa-check").addClass("fa-times");
   $(".is-correct .fa-check").removeClass("fa-check");
  $(".yes").addClass("no");
  $(".yes").removeClass("yes");
  //scrolling to the quistion input offset
  $("body").animate({
   scrollTop:$(".the-quistion").offset().top-100
  },500);
  //clearing the answers array
  answers=[];
 }
});
$(".see-quiz").click(function (){
 //checking if the user make more than 3 quistions
if($(".quistion").length<3){
  $(".warning-message").text("please make at least 3 quistions");
}
else{
 quistionOrder=quistionOrder-1;
 $(this).attr("data-target","");
 $(".quiz-maker").hide();
 $(".the-quiz-page").show();
 //turning the moving button to copy link element
 $('.answer'+quistionOrder.toString()+' .mover').removeClass("next");
 $('.answer'+quistionOrder.toString()+' .mover').addClass("copy-link-button");
 $('.answer'+quistionOrder.toString()+' .mover').removeClass("btn-primary");
 $('.answer'+quistionOrder.toString()+' .mover').addClass("btn-secondary");
 $('.answer'+quistionOrder.toString()+' .mover').attr("data-target","");
 $('.answer'+quistionOrder.toString()+' .mover').text("copy quiz link");
 $("<i class='fas fa-copy right'></i>").appendTo('.answer'+quistionOrder.toString()+' .mover');
 //set the admin name
$(".name").text($(".admin-name").val());
}
});
});
