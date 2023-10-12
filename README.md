# Notes: a simple page to store your notes

<img src="page.png" >

## Description

"Notes" is a simple page where you can store, recall, update and delete notes. This is a simple project I made while on placement at DWP to learn some foundational skills in software engineering.

Techologies used within this project:

- [Express](https://expressjs.com/) : Web framework for node js
- [SuperTest](https://www.npmjs.com/package/supertest) : Used to HTTP testing
- [MongoDB](https://www.mongodb.com/) : A database used to store our data/notes

---

## Usage

### Posting or updating a note

At the top, first choose wether you want to post or patch a note.

- Posting: Adding a new note into our database
- Patching: Updating a note within our database based on a id

In the text box below, write down your note or what you want to updated to be. Press submit to then post or patch the note. Please look within the "log from server" box to see if note posting/patching was successful.

When posting, and Id is automatic assigned.

### Getting a note

In the "Find a note" section, use the choose the note you want to retrieve based on it's id. The box should aromatically update every time you change number.

### Deleting a note

You can first choose to delete a note by ID or to delete all notes

- by all: Delete all notes within our database. A pop up message will appear confirming you want to choose this option as this can't be undone.
- by id: Delete a note based on it's id

### Log from server box

This box displays messages from the server, it will display something every time an action has been taken. It's suggested that you often check this boxes to confirm an action has been taken or an error message on why it has not.
