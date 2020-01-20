
$(document).ready(function(){
    //database
    // the right answer counter
    var trueAns=0,
    //the visitor name
        visitorName="";
    //moving between pages
$(".mover").click(function (e){
    e.preventDefault();
    // الأكد من ان المستخدم كتب اسموا
 if($($(this).attr("data-check")).text()==""){
  $(".visitor-name").addClass("red-placeholder");
 }
 else{
// اظهار و اخفاء الصفحات
      $($(this).attr("data-hide")).hide();
    $($(this).attr("data-show")).show();
    //عشان ميظهرش الارور
    $(this).attr("data-target","");
 }
});
// vistitor name
$("body").on("click",".p-name",function (e){
 e.preventDefault();
 $(this).replaceWith($('<span class="name"><input class="visitor-name inline name" value="'+$(this).text()+'"></span>'));
});
$(".visitor-name").focus(function(){
 $(this).attr("placeholder","");
 });
 $(".visitor-name").blur(function(){
  if($(this).val().length>=1){
     $(this).replaceWith($("<a class='inline visitor-name p-name'>"+$(this).val()+"</a>"));
     name=$(this).val();
     console.log();
  }
  else{
     $(this).attr("placeholder","type your name");
  }
});

//next quistion
$(".next,.to-result").click(function(){
 //cheking if the user choose one anwser or more or less
 if($($(this).attr("data-parent")+" .checked").length==1){
  //this is for the callback function
  var thisBtn=$(this);
    $(this).parent().parent().fadeOut(1000,function(){
     thisBtn.parent().parent().next().fadeIn();
    });
    //cheking if the user choose right or wrong answer
if($($(this).attr("data-parent")+" .checked").parent().hasClass("right-ans")){
     $($(this).attr("data-parent")+" .checked").parent().addClass("right-style");
     //if the user choose rigth answer the counter of right answers will increase one
     trueAns+=1;
     // changing the result page
          $(".result-number").text(trueAns);
     $(".wrong-number").text(12-trueAns);
     $(".actual-ratio").text(Math.round(trueAns/12*100)+"%");
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
//to result btn
$(".to-result").click(function (){
  if($($(this).attr("data-parent")+" .checked").length==1){
   //preventing the apperance of error message
    $(this).attr("data-target","");
    $(".the-quiz-page").hide();
    $(".result").show();
    //styling the result page depanding on the right answers counter
      if(trueAns>6){
      $(".perc").addClass("good-result");
     }
     else{
      $(".perc").addClass("bad-result");
     }
        }
    else{
        
    }
});
//friend name
$(".friend-name").text(visitorName);
//responsive issu
if($(window).width()<=400){
 $(".arrow-div i").attr("class","fas fa-arrows-alt-v");
}
});
