({
	onPageRefUpdate : function(cmp, event) {
        var pageRef = cmp.get("v.pageRef");
        var newPageRefString = JSON.stringify(pageRef, null, 4);
		cmp.set('v.pageRefString', newPageRefString);
        cmp.find("navService").generateUrl(pageRef).then($A.getCallback(function(url){
            cmp.set("v.pageRefUrl", url);
        }))
	}
})