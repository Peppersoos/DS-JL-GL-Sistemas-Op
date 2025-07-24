$(document).ready(function () {
  $(".page").hide();
  $(".page:first").show();

  $(".navlink").click(function (e) {
    const id = $(this).attr("id");
    $(".page").hide();
    $(`.page.${id}`).show();
  });

  $("#evaluation-form").submit(function (e) {
    $(".push-up.eval_candidatos").css("display", "flex");
    $(this)[0].reset();
  });

  $(".push-up.eval_candidatos button").click(function (e) {
    $(".push-up.eval_candidatos").hide();
  });
});
