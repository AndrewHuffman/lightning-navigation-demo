({
    init: function (cmp, event, helper) {
        helper.onPageRefUpdate(cmp);
    },
    navigate: function (cmp, event, helper) {
        var pageRef = cmp.get("v.pageRef");
        cmp.find("navService").navigate(pageRef);
    },
    onPageRefUpdate: function (cmp, event, helper) {
        helper.onPageRefUpdate(cmp, event);
    },
    onShowAppRefChanged: function (cmp, event, helper) {
        var showAppRef = cmp.get("v.showAppRef");
        helper.updatePageRef(cmp, showAppRef);
    }
})