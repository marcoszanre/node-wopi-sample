# node-wopi-sample
A sample WOPI host in nodejs and express.

### How to setup this sample:
1. Deploy Office Online Server
2. Install nodejs (can be in the same machine)
3. Git clone this repo to a desired folder
4. From PowerShell, run npm install
5. Change your directory to the cloned repository and run "npm index.js" (now the server will start and listen on port 8080)

### How to test this sample
This sample already includes a folder (./files) with a docx file (test.docx) that can be used for testing viewing and editing capabilities.

After making sure that Office Online Server is running, take note of the desired urlsrc in the discovery page (**http://[office online server ip addresss or hostname]/hosting/discovery**), like the following docx for viewing:

http://wopi.contoso.com/wv/wordviewerframe.aspx?

Take note also of the encoded URL of the default test.docx file, which is displayed in PowerShell when you initialize this code:

**Default test.docx url**: 
http://localhost:8080/wopi/files/test.docx

**Encoded url**:
http%3A%2F%2Flocalhost%3A8080%2Fwopi%2Ffiles%2Ftest.docx

With that, all you need to do is combine both, according to the wopi documentation, to display your document in the browser

**Final view URL:**
http://wopi.contoso.com/wv/wordviewerframe.aspx?WOPISrc=http%3A%2F%2Flocalhost%3A8080%2Fwopi%2Ffiles%2Ftest.docx&access_token=token

If you click on edit in browser, the url will change to the edit mode, and if you click on *view -> reading view*, your changes will be updated in the file (if your document is cached in the browser, you can open it from the explorer view).

### To Do
1. Deploy the validator and make sure that the required endpoint are properly configured
2. Implement the user and token validator functions
3. Implement a sample host page, so that urls aren't displayed to users

**References**
- [WOPI documentation](https://wopi.readthedocs.io/en/latest/)
- [WOPI validator](https://wopi.readthedocs.io/en/latest/build_test_ship/validator.html#validator)
