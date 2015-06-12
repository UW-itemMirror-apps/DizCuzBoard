# DizCuzBoard
Team Collaboration Tool By Sissi and Tex

For the site, please click: <a href="https://webhost.ischool.uw.edu/~sunteng/bcmderFireMirror/app/"> DizCuzBoard</a>.
Please click allow insecure connection to continue to the site.


# Readme

1.What is it supposed to do? Why is this useful? For whom?
- Collaboard is meant to be a vitual postit board for team discussions.
- It facilitates discussion for students.

2.Does it work?

Priority I features mostly functional
- Add note: click on the green plus button on the lower left side of the screen, next to the user name
- delete note: place mouse over the note you wanted to delete, and click on the delete button
- edit note: place mouse over the note you wanted to edit, and click on the edit button
- move note:  click the note and drag it to where you want to place it
- automatic save: all actions save automatically, the bottom right progress bar show indicates if the app is saving 

Priority II feature mostly functional, except for resizing issues and iframe stealing click event 
- add resources to note: the resource input box is where you can input a piece of html code to include videos, html links, images and iframe widgets

Priority III feature partially functional, FOUC issues not dealt with, loading requires a bit of time, out of sync problems and sometimes changes revert back 
- collaboration: enter where the folder you shared and start collaborating



3.Is the user experience (UX) good? Can users figure out how things work and what to do without special training or the need to see a lot of documentation?
- Most things are done according to conventions, like drag and drop
- Notes moves to front when mouse is over
- Delete requires confirmation
- Edit and Delete button auto hides to give a clean view
- Clean layout and cool rippling effects from angular-material library




4.As appropriate, does it provide the functionality of available “horizontal” services? i.e., as appropriate (depending upon your app and the features it's meant to provide) does it support x/y positioning? ordering? some ability to find and ave relevant material per folder
- uses the same X-Y coordinate horizontal service as our team project infinitysort.

5.How well does it scale? (e.g., through use of Dropbox folders to organize information)?
- Use dropbox folders and shared folders.

6.Does it make good use of metadata?
- Uses meta data for positioning, title, content, and resource.

7.Can people working from different devices and OS platforms use the app collaboratively? (e.g. leveraging support for sharing and syncing of Dropbox folders).
- Collaboration is possible over PC in most platforms(windows, OSX, Linux) and comtemporary internet browsers( chrome, firebox, etc)
- Mobile platform can only view.

8.Can users mix & match your app with others to work on the same information?
- Totally possible if the other app uses our namespace 'DizCusBoard'
- They can choose to decide what to do with the attributes like title, content, resource and xy positions.

9.Does your app persist state so that if A. the user dismisses the current  browser window in which which the app is running and then B. later goes back to your app (iany browser window) they can get back to their information in the same state as they last saw it (same structure, same content, same layout and appearance)?
- Fully saves the state if the autosave is complete before the users closes the window 
