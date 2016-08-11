import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./tag-selectize.js');

  describe('tag selectize', function() {
    it('renders correctly', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "CanEditCompanies"};

      withRenderedTemplate('tagSelectize', data, (el) => {
        //Check selectize has been loaded correctly
        chai.assert.include($(el).html(), '<div class="selectize-control tag-input multi">');
        chai.assert.equal($(el).find(".tag-input.selectized").css('display'), 'none');
        //Check tags are shown inside the selectize box
        chai.assert.include($(el).html(), '<div data-value="tag1"><span class="name">tag1</span></div>');
        chai.assert.include($(el).html(), '<div data-value="tag2"><span class="name">tag2</span></div>');
      });
    });


    it('allows tags to be added', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "CanEditCompanies"};

      //Roles.userIsInRole = () => true;
      //Meteor.userId = () => "userId";

      withRenderedTemplate('tagSelectize', data, (el) => {
        $(el).find(".selectize-input > input").val("newTag");
        $(el).find(".selectize-input > input").click();

        //Check tags are shown inside the selectize box
        chai.assert.include($(el).find('.selectize-control').html(), 'Add <b>newTag</b>...');
      }); 
    });
  });
}

/*
<select class="tag-input selectized" name="tags[]" multiple="multiple" tabindex="-1" style="display: none;">
  <option value="tag1" selected="selected">tag1</option>
  <option value="tag2" selected="selected">tag2</option>
</select>
<div class="selectize-control tag-input multi">
  <div class="selectize-input items not-full has-options has-items locked">
    <div data-value="tag1"><span class="name">tag1</span></div>
    <div data-value="tag2"><span class="name">tag2</span></div>
    <input type="text" autocomplete="off" tabindex="" style="width: 4px;">
  </div>
  <div class="selectize-dropdown multi tag-input" style="display: none; width: 400px; top: 34px; left: 0px;">
    <div class="selectize-dropdown-content">
    </div>
  </div>
</div> */