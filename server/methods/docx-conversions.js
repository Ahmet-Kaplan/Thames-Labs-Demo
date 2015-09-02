Meteor.methods({

  remainingConversions: function(count) {
    ServerSession.set('DocxToPdfRemaining', count);

    if (count == 100 || count == 50 || count == 25 || count < 15) {
      var txt = 'Running out of doc to pdf conversions. We have ' + count + ' left';
      Email.send({
        to: 'jason.mashinchi@cambridgesoftware.co.uk',
        from: 'admin@realtimecrm.co.uk',
        subject: 'Running out of doc to pdf conversions...',
        text: txt
      });
    }
  }

});
