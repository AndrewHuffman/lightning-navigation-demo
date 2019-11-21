({
    onPageRefUpdate: function (cmp, event) {
        var pageRef = cmp.get("v.pageRef");
        var newPageRefString = JSON.stringify(pageRef, null, 4);
        cmp.set('v.pageRefString', newPageRefString);
        cmp.find("navService").generateUrl(pageRef).then($A.getCallback(function (url) {
            cmp.set("v.pageRefUrl", url);
        }))
    },

    updatePageRef: function (cmp, isAppRef) {
        var pageRef = cmp.get("v.pageRef");
        if (!isAppRef && pageRef.type === "standard__app") {
            pageRef = pageRef.attributes.pageRef;
        } else if (isAppRef) {
            pageRef = {
                type: "standard__app",
                attributes: {
                    appTarget: "standard__LightningSales",
                    pageRef: pageRef
                }
            }
        }

        cmp.set("v.pageRef", pageRef);
    }
})