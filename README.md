# Keep Paws Posted

Welcome to Keep Paws Posted!

From medical information, dietary needs, exercise needs, and socialization, there is a lot for a pet parent to keep track of.
Keep Paws Posted is the solution: a centralized platform to keep all of a pet's crucial information safe and organized.

Here are some of the things you can do:

 - make profiles for each of your pets
 - store sentimental information
 - keep track of pets’ health and diet/nutrition
 - receive suggestions in case of dips in nutrition/health

# Try it out!

Clone the repository:
```
git clone https://github.com/kellyye-cal/cs160-paws/
```
Make sure you have Node installed. In the correct directory, run
```
node App.js
 ```
 
# Notes for Display

This app is designed for smartphones, and the major testing device is an iPhone 13 Pro. Some of the implementations show the best on this device, and some of those may shown in wrong proportion on other smartphones or on a desktop. 

# Implemented functions

This app has a profile page for the pet and three sections that manage different aspects of the pet. The user can navigate between the profile and the other sections by tapping on the navbar at the bottom of the screen. The selected navbar item will be highlighted with a colored image instead of one in white.

# Using this app: a complete walkthrough

## Loading screen

The user will first see a loading screen with the app's logo, the app's name, and a loading mark before opening the app (website). This page will stay for 2 seconds and then it will automatically jump to the profile page. The user can also tap on the app's name on the upper navbar to be directed to this loading page, but this is just a place holder as the user should be able to see this loading screen in the place where data needs to be loaded.

## Profile

This is a page where the user can view the picture, name, information, and records of the pet. The first part "Profile" shows the pet's name, type, gender, and age. The second part "About Me" has two subparts for the user to view and edit. When a data item is missing its value, the UI will show a gray "- No data -"; otherwise, it will display the corresponding value there in black.

When the user taps on the "Edit" button, a new menu will drop down below the corresponding part. For example, if the user taps on the "Edit" button next to "General Info", an "Info Change" menu will drop down below this part. The user can then select the item they want to edit from the "Item" dropdown menu. Then, the saved value will shown in the "Info" textbox. if there is no saved value for an item, there will be no value filled for the textbox.

When the user finishes editing the info, they can then tap on the check mark to confirm their change. If the user trys to enter an empty value, a new prompt in red background will slide down and warn that this will delete the value of this item. The user can choose to cancel and edit more or to continue to delete the data.

## Moments

This is a page where the user can view moments of the pet and add more posts. A moment is a post with a picutre, a title (name), a date, and some descriptions. The first part "Add Moment" allows the user to add a new moment to the list. The user can fill in all sections and then tap on the "Add Moment" button to add a new moment. If some of the sections are not finished, the app will alert the user with "Do not leave blanks before submitting!" or "Please select an image before submitting" and then adds nothing to the page. If a moment is added, it will appear at the end of the "Moments" list.

For the second part "Moments", the user can edit or delete any moments. They can first tap on the "Edit" button on the right of the moment card and a "Moment Change" menu will drop down. The saved item values will appear in the textboxs, and the user will again need to finish all sections to edit the moment.

The user can also delete a moment by entering the "Moment Change" menu after tapping on the "Edit" button. There is a trash can button that deletes the post. After tapping the delete button, there will be a warning prompt in red background dropping down that reminds the user to confrim deletion. If the user deletes all moments, the text "There is no moment." will show in the "Moments" section.

 
# Collaborators
 
- Joey Hou
- Lucy Yang
- Kelly Ye
- Andrew Zhang
- Anna Zhao

Created for CS 160 (User Interface Design) at UC Berkeley, Spring 2023
