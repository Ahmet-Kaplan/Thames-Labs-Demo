import './fab-add.html';
import './fab.css';

Template.fabAdd.events({
  'click #fab': function(event) {
    event.preventDefault();
    const entity = Template.instance().data.entity;
    Modal.show(`insert${entity}Modal`, this);
  }
});
