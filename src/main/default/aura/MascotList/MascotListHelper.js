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
    updatePageState: function(cmp, newState) {
        var currentPageRef = cmp.get("v.pageReference");
        var newPageRef = {
            type: currentPageRef.type,
            attributes: currentPageRef.attributes,
            state: Object.assign({}, currentPageRef.state, newState)
        };
        cmp.find("navService").navigate(newPageRef, true);
    },
    redirect: function(cmp, view) {
        var redirectIn = cmp.get("v.redirectIn");
        var timeToRedirect = redirectIn;
        cmp.set("v.isRedirect", true);
        var interval = setInterval($A.getCallback(function() {
            cmp.set("v.redirectIn", --timeToRedirect);
            if (timeToRedirect === 0) {
                clearInterval(interval);
                cmp.set("v.redirectIn", redirectIn);
                cmp.set("v.isRedirect", false);
                cmp.find("navService").navigate({
                    type: "standard__component",
                    attributes: {
                        componentName: "c__MascotCard"
                    },
                    state: {
                        c__mascotId: view
                    }
                }, true);
            }
        }), 1000);
    },
    sort: function(cmp, direction) {
        var mascots = cmp.get("v.mascots");
        if (direction === "asc") {
            mascots = mascots.sort(function(a, b) {
                return a.Name < b.Name ? -1 : 1;
            });
        } else if (direction === "dec") {
            mascots = mascots.sort(function(a, b) {
                return a.Name > b.Name ? -1 : 1;
            });            
        }
        cmp.set("v.mascots", mascots);
		var options = Array.prototype.slice.call(cmp.find("sortSelect").getElements()[0].children);
        options.forEach(function(opt) {
            if (opt.value !== direction) {
                opt.selected = false;
            } else {
                opt.selected = true;
            }
        });
    }
})