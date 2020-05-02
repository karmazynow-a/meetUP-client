INSERT INTO person (fname, lname, email, password) VALUES 
    ('fname1', 'lname1', 'user1@mail.com', 'dummypass'),
    ('fname2', 'lname2', 'user2@mail.com', 'dummypass'),
    ('fname3', 'lname3', 'user3@mail.com', 'dummypass');


INSERT INTO event (name, key, author_id, date) VALUES 
    ('event 1', 'key1', 1, 'dummydate'),
    ('event 2', 'key2', 1, 'dummydate'),
    ('event 3', 'key3', 2, 'dummydate');


INSERT INTO participation (person_id, event_id) VALUES 
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 3),
    (3, 1);

INSERT INTO comment (author_id, event_id, date, content) VALUES
    (1, 1, 'dummydate', 'comment1'),
    (1, 1, 'dummydate', 'comment2'),
    (2, 1, 'dummydate', 'comment3'),
    (1, 2, 'dummydate', 'comment4'),
    (2, 1, 'dummydate', 'comment5'),
    (3, 1, 'dummydate', 'comment6'),
    (2, 2, 'dummydate', 'comment7'),
    (1, 1, 'dummydate', 'comment8');
