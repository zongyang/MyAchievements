Template.reviewList.helpers({
    count: function(){
        var homeworkId = this._id;
        return Homeworks.findOne(homeworkId).count;
    },
    title: function(){
        var homeworkId = this._id;
        return Homeworks.findOne(homeworkId).title;
    },
    groups: function(){
        var groups = new Array();
        var users = Meteor.users.find({'profile.root': 'student'}).fetch();
        var usersArr = [];
        for (var i = 0; i < users.length; i++){
            usersArr[i] = users[i].profile.group;
        };
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        };
        var uniUsers = usersArr.filter(onlyUnique);
        for (var j = 0 ; j < uniUsers.length; j++){
            var value = {
                number: uniUsers[j]
            };
            groups.push(value);
        };
        return groups;
    },
    
});
Template.groupList.helpers({
    members: function(){
        var group = this.number;
        return Meteor.users.find({'profile.group': group});
    },
    
});
Template.membersTbody.helpers({
   zip: function(){
        var userId = this._id;
        console.log(userId);
        var homeworks = Homeworks.find().fetch();
        var homeworkId = homeworks[0]._id;
        return  Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1},
        });
    }
});
