({
    init: function(cmp, event, helper) {
        helper.onPageRefUpdate(cmp);
    },
	navigate : function(cmp, event, helper) {
        var pageRef = cmp.get("v.pageRef");
        cmp.find("navService").navigate(pageRef);
	},
    onPageRefUpdate: function(cmp, event, helper) {
        helper.onPageRefUpdate(cmp, event);
    }
})