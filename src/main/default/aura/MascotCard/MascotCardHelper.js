({
    update: function(cmp) {
        var mascot = cmp.get("v.mascot");
        var pageRef = cmp.get("v.pageReference")
        if (pageRef && pageRef.type === "standard__component" && 
            	pageRef.attributes.componentName === "c__MascotCard") {
            cmp.set("v.viewedDirectly", true);
            $A.util.addClass(cmp.getElement(), "viewed-directly");
        }
        if (!mascot) {
            return;
        }
        this.getMascotUrl(cmp, mascot, "view")
            .then($A.getCallback(function(url){
                cmp.set("v.mascotUrl", url);
            }))
            .catch($A.getCallback(function(error) {
                alert("Error generating URL");
            }))
        this.getMascotUrl(cmp, mascot, "edit")
            .then($A.getCallback(function(url){
                cmp.set("v.mascotEditUrl", url);
            }))
            .catch($A.getCallback(function(error) {
                alert("Error generating edit URL");
            }))
    },
	getMascotUrl : function(cmp, mascot, action) {
        action = action || "view";
        return cmp.find("navService").generateUrl({
            type: "standard__recordPage",
            attributes: {
                objectApiName: "Mascot__c",
                recordId: mascot.Id,
                actionName: action
            },
            state: {}
        })
	},
    doAction: function(action) {
        var actionPromise = new Promise($A.getCallback(function(resolve, reject) {
            action.setCallback(this, $A.getCallback(function(response){
                var state = response.getState();
                var value = response.getReturnValue();
                console.log("Response:", value);
                if(state == "SUCCESS"){
                    resolve(value);
                } else {
                    reject(new Error(value));
                }
            }))
        }));
        $A.enqueueAction(action);
        return actionPromise;
    },
})