({
    init: function(cmp, event, helper) {
		cmp.set("v.currentUser", $A.get("$SObjectType.CurrentUser"));
        cmp.set("v.pageReferences", helper.pageReferences);
        
		var getUsers			= cmp.get("c.getUsers");
        var getMascots 			= cmp.get("c.getMascots");
        var getContactLists = cmp.get("c.getContactLists");
        helper.doAction(getUsers).then($A.getCallback(function(users) {
            cmp.set("v.users", users);
        }))
        helper.doAction(getMascots).then($A.getCallback(function(mascots) {
            cmp.set("v.mascots", mascots.sort(function(a, b) {
                return a.Name > b.Name
            }))
        }));
        helper.doAction(getContactLists).then($A.getCallback(function(listViews) {
            cmp.set("v.contactFilters", listViews);
        }));
        helper.updatePageRef(cmp.find("contactBtn"), {}, {
            filterName: "00B9A0000014FriUAE"
        });
        helper.updatePageRef(cmp.find("mascotBtn"), {}, {
            c__view: "All"
        });
        helper.updatePageRef(cmp.find("profileBtn"), {
            recordId: cmp.get('v.currentUser').Id
        },{});
    },
    onFilterChange: function(cmp, event, helper) {
        var contactsBtn = cmp.find("contactBtn");
        var filterName = event.getSource().get("v.value").trim();
        helper.updatePageRef(contactsBtn, {}, {
            filterName: filterName
        });
    },
    onMascotChange: function(cmp, event, helper) {
        var mascotBtn = cmp.find("mascotBtn");
        var mascotToView = event.getSource().get("v.value").trim();
        helper.updatePageRef(mascotBtn, {}, {
            c__view: mascotToView
        });
    },
    onProfileChange: function(cmp, event, helper) {
        var profileBtn = cmp.find("profileBtn");
        var userToView = event.getSource().get("v.value");
        var profilePageRef = helper.pageReferences.profile;
        helper.updatePageRef(profileBtn, {
            recordId: userToView
        }, {})
    }
})