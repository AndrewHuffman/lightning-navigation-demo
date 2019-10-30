({
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
    updatePageRef: function(cmp, newAttributes, newState) {
        var pageRef = cmp.get("v.pageRef");
        pageRef.attributes = Object.assign(pageRef.attributes, newAttributes || {});
        pageRef.state 	   = Object.assign(pageRef.state, newState || {});
        cmp.set("v.pageRef", pageRef);
    },
    pageReferences: {
        mascots: {
            type: "standard__objectPage",
            attributes: {
                "objectApiName": "Mascot__c",
                "actionName": "home"
            },
            state: {}
        },
        contacts: {
            type: "standard__objectPage",
            attributes: {
                "objectApiName": "Contact",
                "actionName": "list"
            },
            state: {}
        },
        profile: {
            type: "standard__recordPage",
            attributes: {
                objectApiName: "User",
                recordId: "{$recordId}",
                actionName: "view"
            },
            state: {}
        },
        pageNotFound: {
            type: "standard__component",
            attributes: {
                componentName: "c__PageNotFound"
            },
            state: {}
        }
    }
})