# Navigation APIs with Lightning Components

## Pre-requisites

You'll need to have a Salesforce org setup to work with SFDX: https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm

## Instructions

### Setup VSCode

1. Install VSCode: https://code.visualstudio.com/
1. Setup SFDX: https://developer.salesforce.com/tools/sfdxcli
1. Install the "Salesforce Extension Pack": https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode
1. Once installed, ensure you can connect to your org using "SFDX: Authorize an Org"

### Setup with this project

1. Clone this project: `git clone git@github.com:AndrewHuffman/lightning-navigation-demo.git`
1. Open this project using vscode
1. From the Command Pallet, open "SFDX: Deploy This Source to Org"
1. At this point, your org should be updated to contain:
    - CustomObject: "Mascot__c"
    - Contact Updated:
        - with Mascot__c Lookup
        - Custom ListViews for "Mascots" & "Not Mascots"
    - ApexController: DemoController.cls
    - AuraComponents:
        - Launcher — The Launch Point Page
        - LauncherButton — The Demo buttons on Launch Point page
        - MascotList — This "Mascots Tab" list override
        - MascotCard — The code for each Mascot
### Update your Org

1. (Optional) Create a new App specifically for Mascots.
1. Override "Mascot Tab":
    - Setup > Object Manager > Mascot > Buttons, Links, & Actions > Mascots Tab > Edit
    - For "Lightning Experience Override", update it to use "Lightning Component: c:MascotList"
1. Update Tabs:
    - Setup > User Interface > Tabs
    - Ensure Custom Object Tab exists for "Mascots", if not click "New"
        - Select Object: Mascots__c, give it a tab style
        - Complete Wizard to save
    - Create "Launch Point" Lightning Component Tab
        - From Tabs screen, click "New" by "Lightning Component Tabs"
        - Lightning Component: c:Launcher

### Create Mascots
SFDX can only deploy metadata, but you'll need to create the Mascot records manually.

For each mascot you'd like to add:

1. Update the Mascot's Image to Files.
    - Once uploaded, right click on the image and open in new tab. 
    - You'll notice the URL looks something like: documentforce.com/sfc/..../reditionDownload?...
    - In the query params, you'll notice "versionId".
    - Copy this value (e.g., 0689A0000000BiO). This will be used when you create the Mascot
1. Create the Mascot
    - Go to the Mascots Tab
    - Click "New"
    - Give the Mascot a Name and Bio
    - In the "Picture Id", provide the versionId you copied when you uploaded the image.