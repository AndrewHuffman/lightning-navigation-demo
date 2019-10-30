({
    doSort: function(cmp, event, helper) {
        helper.sort(cmp, cmp.get("v.sortDirection"));
    },
    onPageRefUpdate: function(cmp, event, helper) {
        var pageRef = event.getParam("value");
        if (pageRef.state.c__direction) {
            cmp.set("v.sortDirection", pageRef.state.c__direction);
        }
        if (pageRef.state.c__view) {
            if (pageRef.state.c__view.toUpperCase() === "ALL") {
                cmp.set("v.isRedirect", false);
            } else {
                cmp.set("v.isRedirect", true);
            }
        }
    },
    onSortChange: function(cmp, event, helper) {
        var direction = event.currentTarget.value;
        if (direction) {
            helper.updatePageState(cmp, {
                c__direction: direction
	        });
        }
    },
    gotoNew: function(cmp, event, helper) {
        var pageRef = cmp.get("v.pageReference");
        var newPageRef = {
            type: pageRef.type,
            attributes: Object.assign({}, pageRef.attributes, {
                actionName: "new"
            }),
            state: pageRef.state
        };
        cmp.find("navService").navigate(newPageRef);
    },
    gotoList: function(cmp, event, helper) {
        var pageRef = cmp.get("v.pageReference");
        var newPageRef = {
            type: pageRef.type,
            attributes: Object.assign({}, pageRef.attributes, {
                actionName: "list"
            }),
            state: pageRef.state
        };
        cmp.find("navService").navigate(newPageRef);
    },
	init : function(cmp, event, helper) {
		var getMascots= cmp.get("c.getMascots");
        var pageRef = cmp.get("v.pageReference");
        if (pageRef.state.c__viewMode) {
            helper.updateViewMode(cmp, pageRef.state.c__viewMode)
        }
        helper.doAction(getMascots).then($A.getCallback(function(mascots){
            cmp.set("v.mascots", mascots);
            if (pageRef.state.c__view && pageRef.state.c__view.toUpperCase() !== "ALL") {
                cmp.set("v.isRedirect", true);
                helper.redirect(cmp, pageRef.state.c__view);
            } else {
                cmp.set("v.isRedirect", false);
            }
            if (pageRef.state.c__direction) {
                helper.sort(cmp, pageRef.state.c__direction);
            }
        }));
	},
})