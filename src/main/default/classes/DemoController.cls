public class DemoController {
    @AuraEnabled
    public static List<User> getUsers() {
        return [select name, id from User LIMIT 10];
    }
    @AuraEnabled
    public static List<Mascot__c> getMascots() {
        return [SELECT Biography__c,Contact__c,Id,Name,Picture__c FROM Mascot__c];
    }
    @AuraEnabled
    public static Mascot__c getMascot(String name) {
        return [SELECT Biography__c,Contact__c,Id,Name,Picture__c FROM Mascot__c WHERE Id = :name];
    }
    @AuraEnabled
    public static List<ListView> getContactLists() {
        return [SELECT Name,SobjectType FROM ListView WHERE SobjectType = 'Contact' ORDER BY Name ASC NULLS FIRST];
    }
}