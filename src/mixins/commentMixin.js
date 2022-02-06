export default {
//   created: function () {
//     this.hello()
//   },
  methods: {
    openReplyArea: function () {
      this.open_reply = !this.open_reply;

    },
    openCommentsAll() {
      this.show_one_comment = !this.show_one_comment
    },
    showComments(param) {
      if (param && param == 'child') {
        var params = {
          filters: {
            commentID: this.comments._id
          }
        }
        this.$store.dispatch('getCommentsByID', params).then((res) => {
          this.child_comments = res.child_comments.childComments
        }).catch( e => {
          console.log(e)
        })
      }

      this.show_only_title = !this.show_only_title
      this.open_reply = !this.open_reply;
    },
    ISODateTimePrettier(iso_date) {
      var date = iso_date.split('T')[0];
      var time = iso_date.split('T')[1].substr(0, 5);
      return date + ' - ' + time
    }
  }
}