import './fab-edit.html';

Template.fabEdit.events({
  'click #fab': function(event) {
    event.preventDefault();
    const entity = Template.instance().data.entity,
          record = Template.instance().data.record;
    Modal.show(`update${entity}Modal`, record);
  }
});
