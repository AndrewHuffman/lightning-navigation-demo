({
    init: function(cmp, event, helper) {
        var mascot = cmp.get("v.mascot");
        var pageRef = cmp.get("v.pageReference");
        var mascotId = pageRef && pageRef.state.c__mascotId
        if (mascotId) {
            var getMascot = cmp.get("c.getMascot");
            getMascot.setParams({
                name: mascotId
            });
            helper
            .doAction(getMascot)
            .then($A.getCallback(function(mascot){
                cmp.set("v.mascot", mascot);
                helper.update(cmp);
            }));
        } else if (mascot) {
            helper.update(cmp);
        }
    },
    onChange: function(cmp, event, helper) {
        helper.update(cmp);
    },
    onPageRefChange: function(cmp, event, helper) {
        var pageRef = event.getParam("value");
        var mascotId = pageRef && pageRef.state.c__mascotId;
        if (mascotId) {
            var getMascot = cmp.get("c.getMascot");
            getMascot.setParams({
                name: mascotId
            });
            helper.doAction(getMascot).then($A.getCallback(function(mascot) {
                cmp.set("v.mascot", mascot);
                helper.update(cmp);
            }));
        }
    },
    viewCard: function(cmp, event, helper) {
        var mascotId = cmp.get("v.mascot").Id;
        cmp
        .find("navService")
        .navigate({
            type: "standard__component",
            attributes: {
                componentName: "c__MascotCard"
            },
            state: {
                c__mascotId: mascotId
            }
        })
    },
    goHome: function(cmp, event, helper) {
        cmp
        .find("navService")
        .navigate({
            type: "standard__objectPage",
            attributes: {
                objectApiName: "Mascot__c",
                actionName: "home"
            }
        })
    }
})