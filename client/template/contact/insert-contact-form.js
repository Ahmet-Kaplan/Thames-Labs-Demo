Template.insertContactModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey
  });
});

Template.insertContactModal.events({
  'click #close': function() {
    hopscotch.endTour(true);
  }
});

Template.insertContactModal.onRendered(function() {
  if (Meteor.user()) {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      var options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          }
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }

  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#insertContactForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", function(event, result) {
        var address = "";
        var strNumber = _.find(result.address_components, function(elt) {
          return elt.types[0] == "street_number";
        });

        if (typeof(strNumber) !== 'undefined') {
          strNumber = strNumber.long_name;
          address += strNumber + " ";
        }

        var route = _.find(result.address_components, function(elt) {
          return elt.types[0] == "route";
        });

        if (typeof(route) !== 'undefined') {
          route = route.long_name;
          address += route;
        }
        $("#formatted_address").val(address);
        $("#address_details").show();
        $("#map_wrapper").show();
        $("#map_canvas").height("400px");
        var map = new google.maps.Map(document.getElementById("map_canvas"), {
          zoom: 16,
          center: result.geometry.location,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
          map: map,
          position: result.geometry.location,
          draggable: true
        });
        google.maps.event.addListener(marker, "dragend", function(event) {
          $("input[name=lat]").val(marker.getPosition().lat());
          $("input[name=lng]").val(marker.getPosition().lng());
        });
      }).keypress(function(event) {
        if (event.which == 13) {
          $("#address_details").show();
        }
      });
    }
  });

});

Template.insertContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  showTitleField: function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  }
});

Template.insertContactModal.events({
  'change #companyId': function() {
    if ($('#companyId').val() != '') {
      $('#addressWrapper').hide();
    } else {
      $('#addressWrapper').show();
    }
  }
});

Template.insertCompanyContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return this.name;
  },
  showTitleField: function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  }
});

Template.insertCompanyContactModal.onRendered(function() {
  if (Meteor.user()) {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      var options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          }
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }
});