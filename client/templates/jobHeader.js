Template.jobHeader.helpers({

  'linkForNode': function() {
      if (this.node) {
        return Constants.COMA_LEAF_IDS[this.node];
      }
      return '';
  }

});
