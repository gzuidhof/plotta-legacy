Template.jobHeader.helpers({

  'linkForNode': function() {
      if (this.node) {
        return Constants.COMA_LINKS[this.node];
      }
      return '';
  }

});
