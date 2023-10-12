# Notes: a simple page to store your notes

<img src="page.png" >

## Description

"Notes" is a simple page where you can store, recall, update and delete notes. This is a simple project I made while on placement at DWP to learn some foundational skills in software engineering.

Technologies used within this project:

- [Express](https://expressjs.com/) : Web framework for node js
- [SuperTest](https://www.npmjs.com/package/supertest) : Used to HTTP testing
- [MongoDB](https://www.mongodb.com/) : A database used to store our data/notes

---

## Usage

### _Posting or updating a note_

At the top, first choose wether you want to POST or PATCH a note.

- _Posting_: Adding a new note into our database
- _Patching_: Updating a note within our database based on a id

In the text box below, write down your note or what you want a note to be updated to be. Press submit to then this will send a POST or PATCH request Please look within the "log from server" box to see if note posting/patching was successful.
If the textbox is empty then a note won't be posted/patched even when hitting submit. A message in the "server long" box should display this error.

> [!NOTE]
> When posting, an Id and date is automatic assigned. The Id will be randomly generated based on (max ID in database) + 1. This can mean that come some id's won't be assigned to a note. For example, if there are 3 notes in our database (0,1,2) if we delete note 1 and then create a new note, the new note will be assigned a ID of 3 so we we will have notes with ID (0,2,3).

### _Finding a note_

In the "Find a note" section, use the choose the note you want to retrieve based on it's id. The box should automatically update every time you change number.

### _Deleting a note_

You can first choose to delete a note by ID or to delete all notes

- by all: Delete all notes within our database. A pop up message will appear confirming you want to choose this option as this can't be undone.
- by id: Delete a note based on it's id

### _Log from server box_

This box displays messages from the server, it will display something every time an action has been taken. It's suggested that you often check this boxes to confirm an action has been taken or an error message on why it has not.
