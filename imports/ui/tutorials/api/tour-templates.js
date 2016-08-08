const TourTemplates = {
  defaultStep: "<div class='popover tour'><div class='arrow'></div><button class='btn btn-default btn-xs pull-right popover-close-button' data-role='end'><i class='fa fa-times' aria-hidden='true'></i></button><h3 class='popover-title tour-title'></h3><div class='popover-content'></div></div>",
  defaultStepWithTitle: function(title) {
    console.log(title);
    return `<div class='popover tour'><div class='arrow'></div><button class='btn btn-default btn-xs pull-right popover-close-button' data-role='end'><i class='fa fa-times' aria-hidden='true'></i></button><h3 class='tour-title'> ${title} </h3><div class='popover-content'></div></div>`
  },
  navStep: "<div class='popover tour' style='position:fixed'><div class='arrow'></div><button class='btn btn-default btn-xs pull-right popover-close-button' data-role='end'><i class='fa fa-times' aria-hidden='true'></i></button><h3 class='popover-title tour-title'></h3><div class='popover-content'></div></div>",
  finalStep: "<div class='popover tour' style='position:fixed'><div class='arrow'></div><button class='btn btn-default btn-xs pull-right popover-close-button' data-role='end'><i class='fa fa-times' aria-hidden='true'></i></button><h3 class='popover-title tour-title'></h3><div class='popover-content'></div><div class='popover-navigation'><button class='btn btn-success' data-role='end'>End tour</button></div>"
};

export { TourTemplates };