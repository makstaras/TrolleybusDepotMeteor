Template.tr.events({
        'submit #trolForm': function(e) {
            e.preventDefault();
            var o1;
            var o2;
            var name = $('#trolName').val();
            var kind = $('#trolKind').val();
            var mark = $('#trolMark').val();
            if(kind!="Одновагонний" || kind!="Двовагонний"){
                $('#trolKind').val("Неправильний тип");
                
            }
            if(mark!="задовільний" || mark!="незадовільний"){
                $('#trolMark').val("Неправильний стан");
                
            }
            if (name.length && kind.length && mark.length && (o1 != "1" || o2 != "1")) {
                Meteor.call('submitTrol', name, kind, mark)
            }
            
            
        }
    })

    Template.listtrol.trols = function() {
        return Trol.find();
    }
  Template.work.trols = function() {
        return Trol.find({mark: "задовільний"});
    }
   
    Template.listtrol.events({
        'click .deleteTrol': function(evt, tmpl) {
            Trol.remove(this._id);
        }

    });